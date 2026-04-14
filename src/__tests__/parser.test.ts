import { describe, test, expect, beforeEach } from "bun:test";
import { evaluateTex } from "../tex-parser";
import math from "../tex-parser/customMath";

const num = (x: unknown) => Number(x);

beforeEach(() => {
  (math as any).setAngleMode("rad");
});

// ─── Arithmetic ──────────────────────────────────────────────────────────────

describe("arithmetic", () => {
  test("addition", () => {
    expect(num(evaluateTex("2+3").evaluated)).toBe(5);
  });

  test("subtraction", () => {
    expect(num(evaluateTex("10-4").evaluated)).toBe(6);
  });

  test("multiplication", () => {
    expect(num(evaluateTex("3*4").evaluated)).toBe(12);
  });

  test("implicit multiplication", () => {
    expect(num(evaluateTex("2\\pi").evaluated)).toBeCloseTo(2 * Math.PI, 10);
  });

  test("division", () => {
    expect(num(evaluateTex("10/4").evaluated)).toBeCloseTo(2.5, 10);
  });

  test("fraction", () => {
    expect(num(evaluateTex("\\frac{1}{2}").evaluated)).toBeCloseTo(0.5, 10);
  });

  test("power", () => {
    expect(num(evaluateTex("2^{10}").evaluated)).toBe(1024);
  });

  test("unary negation", () => {
    expect(num(evaluateTex("-5").evaluated)).toBe(-5);
  });

  test("nested expression", () => {
    expect(num(evaluateTex("(2+3)*4").evaluated)).toBe(20);
  });
});

// ─── Constants ───────────────────────────────────────────────────────────────

describe("constants", () => {
  test("pi", () => {
    expect(num(evaluateTex("\\pi").evaluated)).toBeCloseTo(Math.PI, 10);
  });

  test("e", () => {
    expect(num(evaluateTex("e").evaluated)).toBeCloseTo(Math.E, 10);
  });
});

// ─── sqrt / abs ──────────────────────────────────────────────────────────────

describe("sqrt and abs", () => {
  test("sqrt(9) = 3", () => {
    expect(num(evaluateTex("\\sqrt{9}").evaluated)).toBeCloseTo(3, 10);
  });

  test("sqrt(2) ≈ 1.4142", () => {
    expect(num(evaluateTex("\\sqrt{2}").evaluated)).toBeCloseTo(Math.SQRT2, 10);
  });

  test("\\left|3\\right| = 3", () => {
    expect(num(evaluateTex("\\left|3\\right|").evaluated)).toBe(3);
  });

  test("\\left|0-5\\right| = 5", () => {
    expect(num(evaluateTex("\\left|0-5\\right|").evaluated)).toBe(5);
  });
});

// ─── Trig functions ──────────────────────────────────────────────────────────

describe("trig (rad mode)", () => {
  test("sin(0) = 0", () => {
    expect(num(evaluateTex("\\sin(0)").evaluated)).toBeCloseTo(0, 10);
  });

  test("cos(0) = 1", () => {
    expect(num(evaluateTex("\\cos(0)").evaluated)).toBeCloseTo(1, 10);
  });

  test("tan(\\pi/4) = 1", () => {
    expect(num(evaluateTex("\\tan(\\frac{\\pi}{4})").evaluated)).toBeCloseTo(1, 10);
  });

  test("sin(\\pi) ≈ 0", () => {
    expect(num(evaluateTex("\\sin(\\pi)").evaluated)).toBeCloseTo(0, 10);
  });
});

// ─── Logarithms ──────────────────────────────────────────────────────────────

describe("logarithms", () => {
  test("ln(e) = 1", () => {
    expect(num(evaluateTex("\\ln(e)").evaluated)).toBeCloseTo(1, 10);
  });

  test("log10(100) = 2", () => {
    expect(num(evaluateTex("\\log(100)").evaluated)).toBeCloseTo(2, 10);
  });

  test("log base 2 of 8 = 3", () => {
    expect(num(evaluateTex("\\log_2(8)").evaluated)).toBeCloseTo(3, 10);
  });
});

// ─── Variables and assignment ─────────────────────────────────────────────────

describe("variables", () => {
  test("variable from scope", () => {
    const scope = { x: math.bignumber(5) };
    expect(num(evaluateTex("x * 2", scope).evaluated)).toBe(10);
  });

  test("assignment returns value", () => {
    const scope: Record<string, unknown> = {};
    const { evaluated } = evaluateTex("x = 7", scope);
    expect(num(evaluated)).toBe(7);
    expect(num(scope.x)).toBe(7);
  });

  test("multi-variable expression", () => {
    const scope = { a: math.bignumber(3), b: math.bignumber(4) };
    expect(num(evaluateTex("a^2+b^2", scope).evaluated)).toBe(25);
  });
});

// ─── Custom functions via operatorname ───────────────────────────────────────

describe("custom functions", () => {
  test("angle(3+4i) via parser", () => {
    const result = evaluateTex("\\operatorname{angle}(3+4i)").evaluated;
    expect(num(result)).toBeCloseTo(Math.atan2(4, 3), 5);
  });

  test("mag(3+4i) via parser = 5", () => {
    const result = evaluateTex("\\operatorname{mag}(3+4i)").evaluated;
    expect(num(result)).toBeCloseTo(5, 5);
  });

  test("arcsin via parser", () => {
    const result = evaluateTex("\\arcsin(0.5)").evaluated;
    expect(num(result)).toBeCloseTo(Math.PI / 6, 5);
  });

  test("arccos via parser", () => {
    const result = evaluateTex("\\arccos(0.5)").evaluated;
    expect(num(result)).toBeCloseTo(Math.PI / 3, 5);
  });

  test("arctan via parser", () => {
    const result = evaluateTex("\\arctan(1)").evaluated;
    expect(num(result)).toBeCloseTo(Math.PI / 4, 5);
  });
});

// ─── Matrices ────────────────────────────────────────────────────────────────

describe("matrix operations", () => {
  test("matrix determinant", () => {
    const result = evaluateTex(
      "\\det\\begin{bmatrix}1&2\\\\3&4\\end{bmatrix}",
    ).evaluated;
    expect(num(result)).toBeCloseTo(-2, 10);
  });

  test("matrix addition", () => {
    const result = evaluateTex(
      "\\begin{bmatrix}1&2\\\\3&4\\end{bmatrix}+\\begin{bmatrix}1&0\\\\0&1\\end{bmatrix}",
    ).evaluated;
    const arr = (result as any).toArray();
    expect(num(arr[0][0])).toBe(2);
    expect(num(arr[1][1])).toBe(5);
  });
});

// ─── Scalar variable followed by parentheses (implicit multiplication) ────────

describe("scalar variable followed by parentheses", () => {
  test("P(a+2) treated as P*(a+2) when P is a scalar", () => {
    const scope = { P: math.bignumber(3), a: math.bignumber(2) };
    // P=3, a=2 → P*(a+2) = 3*4 = 12
    expect(num(evaluateTex("P\\left(a+2\\right)", scope).evaluated)).toBe(12);
  });

  test("P(a+2) with bare parens treated as P*(a+2)", () => {
    const scope = { P: math.bignumber(2), a: math.bignumber(5) };
    // P=2, a=5 → P*(a+2) = 2*7 = 14
    expect(num(evaluateTex("P(a+2)", scope).evaluated)).toBe(14);
  });

  test("user-defined functions still work normally", () => {
    const scope: Record<string, unknown> = {};
    evaluateTex("f\\left(x\\right)=x^{2}", scope);
    // f is now a function in scope; f(3) should be 9
    expect(num(evaluateTex("f\\left(3\\right)", scope).evaluated)).toBe(9);
  });

  test("scalar variable followed by single-value paren", () => {
    const scope = { k: math.bignumber(4) };
    // k=4 → k*(3) = 12
    expect(num(evaluateTex("k\\left(3\\right)", scope).evaluated)).toBe(12);
  });
});

// ─── Greek letters ───────────────────────────────────────────────────────────

describe("Greek letters", () => {
  test("\\mu used as variable", () => {
    const scope = { "\\mu": math.bignumber(3) };
    expect(num(evaluateTex("\\mu", scope).evaluated)).toBe(3);
  });

  test("\\mu in expression", () => {
    const scope = { "\\mu": math.bignumber(4) };
    expect(num(evaluateTex("2\\mu", scope).evaluated)).toBe(8);
  });

  test("\\alpha used as variable", () => {
    const scope = { "\\alpha": math.bignumber(5) };
    expect(num(evaluateTex("\\alpha", scope).evaluated)).toBe(5);
  });

  test("\\lambda used as variable", () => {
    const scope = { "\\lambda": math.bignumber(2) };
    expect(num(evaluateTex("\\lambda+1", scope).evaluated)).toBe(3);
  });

  test("\\omega used as variable", () => {
    const scope = { "\\omega": math.bignumber(7) };
    expect(num(evaluateTex("\\omega^{2}", scope).evaluated)).toBe(49);
  });

  test("\\nu used as variable", () => {
    const scope = { "\\nu": math.bignumber(6) };
    expect(num(evaluateTex("\\nu", scope).evaluated)).toBe(6);
  });

  test("\\xi used as variable", () => {
    const scope = { "\\xi": math.bignumber(9) };
    expect(num(evaluateTex("\\xi", scope).evaluated)).toBe(9);
  });
});

// ─── Error handling ──────────────────────────────────────────────────────────

describe("error handling", () => {
  test("throws on malformed expression", () => {
    expect(() => evaluateTex("\\frac{1}")).toThrow();
  });

  test("throws on unknown command", () => {
    expect(() => evaluateTex("\\unknown{x}")).toThrow();
  });
});
