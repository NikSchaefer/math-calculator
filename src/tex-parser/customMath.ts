/* eslint-disable @typescript-eslint/no-explicit-any */
import { create, all, MathJsInstance, sort } from "mathjs";
// import mathjsSimpleIntegral from "mathjs-simple-integral";

// use BigNumber to reduce floating-point rounding errors
const math = create(all, {
  number: "BigNumber",
  precision: 64,
}) as MathJsInstance;

// Configuration for angle mode
const config = {
  angles: "rad", // 'rad' or 'deg'
};

// Create angle-aware trig functions
const replacements: Record<string, any> = {};
const trigFunctions = ["sin", "cos", "tan", "sec", "cot", "csc"];

trigFunctions.forEach((name) => {
  const originalFn = math[name as keyof MathJsInstance];

  const fnNumber = (x: any) => {
    // Convert degrees to radians if in deg mode
    return config.angles === "deg"
      ? originalFn(math.multiply(x, math.divide(math.pi, 180)))
      : originalFn(x);
  };

  replacements[name] = math.typed(name, {
    "number | BigNumber": fnNumber,
    "Array | Matrix": (x: any) => math.map(x, fnNumber),
  });
});

// Import the replacements second
math.import(replacements, { override: true });

// Build a degree-aware typed inverse-trig function.
// transform (optional): called with the BigNumber input before passing to fn.
// Used by arccot/arccsc/arcsec to compute 1/x without plain-JS float division,
// which would produce >15 significant digits and break BigNumber arithmetic.
function arcTrigTyped(name: string, fn: any, transform?: (x: any) => any) {
  const compute = (x: any) => {
    const bx = math.bignumber(x);
    const input = transform ? transform(bx) : bx;
    const result = fn(input);
    return config.angles === "deg"
      ? math.multiply(result, math.divide(180, math.pi))
      : result;
  };

  return math.typed(name, {
    "number | BigNumber": (x: any) => compute(x),
    "Array | Matrix": (x: any) => math.map(x, (xi: any) => compute(xi)),
  });
}

// Reciprocal via BigNumber division (1/x) — avoids >15 sig-digit plain floats.
const reciprocal = (x: any) => math.divide(math.bignumber(1), x);

// Pre-built at module init so math.typed() is not reconstructed on every call.
const _arcsin = arcTrigTyped("arcsin", math.asin);
const _arccos = arcTrigTyped("arccos", math.acos);
const _arctan = arcTrigTyped("arctan", math.atan);
const _arccot = arcTrigTyped("arccot", math.atan, reciprocal);
const _arccsc = arcTrigTyped("arccsc", math.asin, reciprocal);
const _arcsec = arcTrigTyped("arcsec", math.acos, reciprocal);

// Additional functions to be passed to the scope of math.evaluate(scope)
// (not defined in mathjs)
const mathImport = {
  lastFn: "",
  lastArgs: [],
  eigenvalues: (matrix: any) => math.eigs(matrix).values,
  // @ts-expect-error not sure yet lol
  eigenvectors: (matrix: any) => math.eigs(matrix).vectors,
  comp: (a: any, b: any) => math.divide(math.dot(a, b), math.norm(a)), // component of b along a
  proj: (a: any, b: any) =>
    math.multiply(
      math.divide(a, math.norm(a)),
      math.divide(math.dot(a, b), math.norm(a)),
    ), // projection of b along a
  setAngleMode: (mode: "rad" | "deg") => {
    config.angles = mode;
  },
  getAngleMode: () => config.angles,
  sort: (...args: any[]) => {
    if (args.length === 1 && "toArray" in args[0]) {
      const array = args[0].toArray().flat();
      return sort(array, "asc");
    } else {
      return sort(args, "asc");
    }
  },
  len: (...args: any[]) => {
    if (args.length === 1 && "toArray" in args[0]) {
      return args[0].toArray().flat().length;
    } else {
      return args.length;
    }
  },
  // int: (f: any, a: any, b: any) => mathjsSimpleIntegral(f, a, b),
  total: (...args: any[]) => {
    if (args.length === 1 && "toArray" in args[0]) {
      return args[0]
        .toArray()
        .flat()
        .reduce((a: any, b: any) => a + b, 0);
    } else {
      return args.reduce((a: any, b: any) => a + b, 0);
    }
  },
  rand: (n: number, m: number) => {
    return math.random(n, m);
  },
  randi: (n: number, m: number) => {
    return math.randomInt(n, m);
  },
  nCr: (n: number, r: number) => {
    return math.combinations(n, r);
  },
  nPr: (n: number, r: number) => {
    return math.permutations(n, r);
  },
  // Calculate the magnitude of a vector or complex number
  mag: (...args: any[]) => {
    // Use BigNumber arithmetic throughout to avoid plain-JS floats with >15
    // significant digits, which break subsequent BigNumber expressions.
    const sq = (x: any) => math.pow(math.bignumber(x), 2);
    if (args.length === 1 && "re" in args[0] && "im" in args[0]) {
      // Handle complex number input: |z| = sqrt(re² + im²)
      return math.sqrt(math.add(sq(args[0].re), sq(args[0].im)) as any);
    } else if (args.length === 1 && "toArray" in args[0]) {
      // Handle matrix input
      const matrix = args[0];
      return math.sqrt(
        matrix
          .toArray()
          .flat()
          .reduce((a: any, b: any) => math.add(a, sq(b)), math.bignumber(0)),
      );
    } else {
      // Handle multiple number inputs
      return math.sqrt(
        args.reduce((a: any, b: any) => math.add(a, sq(b)), math.bignumber(0)),
      );
    }
  },
  // Return the angle (argument) of a complex number, respecting angle mode
  angle: (z: any) => {
    // math.arg() on a Complex returns a plain JS number with 16 sig-digits,
    // which exceeds mathjs's 15-digit BigNumber conversion limit and breaks any
    // further BigNumber arithmetic. For complex inputs, use atan2 directly so
    // the result is a full-precision BigNumber from the start.
    const radians =
      z && typeof z === "object" && "re" in z && "im" in z
        ? math.atan2(math.bignumber(z.im), math.bignumber(z.re))
        : math.arg(z);
    return config.angles === "deg"
      ? math.multiply(radians, math.divide(180, math.pi))
      : radians;
  },
  // Return the real part of a complex number (or the number itself if real)
  real: (z: any) => math.re(z),
  // Return the imaginary part of a complex number (0 if real)
  imag: (z: any) => math.im(z),
  arcsin: _arcsin,
  arccos: _arccos,
  arctan: _arctan,
  arccot: _arccot,
  arccsc: _arccsc,
  arcsec: _arcsec,
  // 0-based array/matrix element access: get(arr, index)
  get: (arr: any, index: any) => {
    const i = Number(index);
    const flat = "toArray" in arr ? (arr.toArray() as any[]).flat(1) : (arr as any[]);
    if (i < 0 || i >= flat.length) {
      throw new RangeError(`Index ${i} out of bounds for array of length ${flat.length}`);
    }
    return flat[i];
  },
};

math.import(mathImport, {
  override: true,
});

export default math;
