/* eslint-disable @typescript-eslint/no-explicit-any */
import math from "./customMath";

const MAX_SUMMATION_ITERATIONS = 10_000;

// mathjs _compile functions receive a Map-based scope, not a plain object.
// These helpers ensure we always work with the right type.
function toMap(scope: Record<string, any> | Map<string, any>): Map<string, any> {
  return scope instanceof Map ? scope : new Map(Object.entries(scope));
}

function extendScope(
  scope: Map<string, any> | Record<string, any>,
  key: string,
  value: any,
): Map<string, any> {
  const m = toMap(scope);
  const next = new Map(m);
  next.set(key, value);
  return next;
}

// ---------------------------------------------------------------------------
// mathjs Node compatibility
//
// mathjs validates `instanceof Node` (not just `isNode === true`) when nodes
// are used as children of OperatorNode / FunctionNode.  We fix this at
// module-load time by rewiring the prototype chain of our custom classes so
// that instances pass the instanceof check, then implement `_compile` so the
// full mathjs compilation pipeline works correctly.
// ---------------------------------------------------------------------------

// Obtain the mathjs Node base class from a parsed constant node.
const _sampleNode = (math as any).parse("0");
const _NodePrototype: object = Object.getPrototypeOf(
  Object.getPrototypeOf(_sampleNode),
);

/**
 * Wire `cls` into the mathjs Node hierarchy so that:
 *   - `instance instanceof Node` → true  (passes OperatorNode arg validation)
 *   - `instance.isNode` → true            (the getter lives on NodePrototype)
 */
function registerAsNode(cls: new (...args: any[]) => any): void {
  Object.setPrototypeOf(cls.prototype, _NodePrototype);
}

// ---------------------------------------------------------------------------
// SummationNode  ∑_{var=start}^{end} body
// ---------------------------------------------------------------------------

export class SummationNode {
  type = "SummationNode";
  varName: string;
  startNode: any;
  endNode: any;
  bodyNode: any;

  constructor(
    varName: string,
    startNode: any,
    endNode: any,
    bodyNode: any,
  ) {
    this.varName = varName;
    this.startNode = startNode;
    this.endNode = endNode;
    this.bodyNode = bodyNode;
  }

  /**
   * Called by mathjs when compiling a parent node that contains this one.
   * Returns a closure `(scope, args, context) => result` — the same contract
   * as every other mathjs node's `_compile` return value.
   */
  _compile(mathArg: any, argNames: any): (scope: any, args: any, ctx: any) => any {
    const varName = this.varName;
    const compiledStart = this.startNode._compile(mathArg, argNames);
    const compiledEnd = this.endNode._compile(mathArg, argNames);
    const compiledBody = this.bodyNode._compile(mathArg, argNames);

    return (scope: any, args: any, ctx: any) => {
      const start = Math.round(Number(compiledStart(scope, args, ctx)));
      const end = Math.round(Number(compiledEnd(scope, args, ctx)));

      if (end - start > MAX_SUMMATION_ITERATIONS) {
        throw new Error(
          `Summation range too large (max ${MAX_SUMMATION_ITERATIONS.toLocaleString()} iterations)`,
        );
      }

      let result: any = math.bignumber(0);
      for (let i = start; i <= end; i++) {
        const localScope = extendScope(scope, varName, math.bignumber(i));
        result = math.add(result, compiledBody(localScope, args, ctx));
      }
      return result;
    };
  }

  /** Direct evaluation (used when this node is the root of an expression). */
  evaluate(scope: Record<string, any> = {}): any {
    return this._compile(math, new Set())(toMap(scope), null, null);
  }

  // Minimal traversal stubs required by some mathjs utilities.
  forEach(_cb: any): void {}
  map(_cb: any): this { return this; }
  clone(): this { return Object.assign(Object.create(Object.getPrototypeOf(this)), this); }
  toString(): string { return `[SummationNode ${this.varName}]`; }
  toTex(): string { return `\\sum_{${this.varName}}`; }
}

registerAsNode(SummationNode);

// ---------------------------------------------------------------------------
// IntegralNode  ∫_{lower}^{upper} body d{var}
// ---------------------------------------------------------------------------

export class IntegralNode {
  type = "IntegralNode";
  varName: string;
  lowerNode: any;
  upperNode: any;
  bodyNode: any;

  constructor(
    varName: string,
    lowerNode: any,
    upperNode: any,
    bodyNode: any,
  ) {
    this.varName = varName;
    this.lowerNode = lowerNode;
    this.upperNode = upperNode;
    this.bodyNode = bodyNode;
  }

  /**
   * Composite Simpson's 1/3 rule (1000 subintervals).
   * Compiled children are evaluated at each quadrature point.
   */
  _compile(mathArg: any, argNames: any): (scope: any, args: any, ctx: any) => any {
    const varName = this.varName;
    const compiledLower = this.lowerNode._compile(mathArg, argNames);
    const compiledUpper = this.upperNode._compile(mathArg, argNames);
    const compiledBody = this.bodyNode._compile(mathArg, argNames);

    return (scope: any, args: any, ctx: any) => {
      const a = Number(compiledLower(scope, args, ctx));
      const b = Number(compiledUpper(scope, args, ctx));

      const n = 1000; // must be even
      const h = (b - a) / n;

      const f = (x: number): number => {
        const localScope = extendScope(scope, varName, math.bignumber(x));
        return Number(compiledBody(localScope, args, ctx));
      };

      let sum = f(a) + f(b);
      for (let i = 1; i < n; i++) {
        sum += (i % 2 === 0 ? 2 : 4) * f(a + i * h);
      }

      return math.bignumber((h / 3) * sum);
    };
  }

  /** Direct evaluation (used when this node is the root of an expression). */
  evaluate(scope: Record<string, any> = {}): any {
    return this._compile(math, new Set())(toMap(scope), null, null);
  }

  forEach(_cb: any): void {}
  map(_cb: any): this { return this; }
  clone(): this { return Object.assign(Object.create(Object.getPrototypeOf(this)), this); }
  toString(): string { return `[IntegralNode d${this.varName}]`; }
  toTex(): string { return `\\int`; }
}

registerAsNode(IntegralNode);

// ---------------------------------------------------------------------------
// DerivativeNode  d^n/dX^n body
// Computes an nth-order symbolic derivative using mathjs's derivative()
// function, then evaluates the result against the provided scope.
// ---------------------------------------------------------------------------

export class DerivativeNode {
  type = "DerivativeNode";
  varName: string;
  bodyNode: any;
  order: number;

  constructor(varName: string, bodyNode: any, order = 1) {
    this.varName = varName;
    this.bodyNode = bodyNode;
    this.order = order;
  }

  /**
   * Symbolically differentiate `bodyNode` w.r.t. `varName` `order` times,
   * then compile and evaluate the resulting node against the runtime scope.
   */
  _compile(mathArg: any, argNames: any): (scope: any, args: any, ctx: any) => any {
    const { varName, bodyNode, order } = this;

    return (scope: any, args: any, ctx: any) => {
      let node = bodyNode;
      for (let i = 0; i < order; i++) {
        node = math.derivative(node, varName);
      }
      return node._compile(mathArg, argNames)(scope, args, ctx);
    };
  }

  /** Direct evaluation (used when this node is the root of an expression). */
  evaluate(scope: Record<string, any> = {}): any {
    return this._compile(math, new Set())(toMap(scope), null, null);
  }

  forEach(_cb: any): void {}
  map(_cb: any): this { return Object.assign(Object.create(Object.getPrototypeOf(this)), this); }
  clone(): this { return Object.assign(Object.create(Object.getPrototypeOf(this)), this); }
  toString(): string { return `[DerivativeNode d^${this.order}/d${this.varName}^${this.order}]`; }
  toTex(): string {
    return this.order === 1
      ? `\\frac{d}{d${this.varName}}`
      : `\\frac{d^{${this.order}}}{d${this.varName}^{${this.order}}}`;
  }
}

registerAsNode(DerivativeNode);
