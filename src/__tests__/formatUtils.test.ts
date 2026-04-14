import { describe, test, expect } from "bun:test";
import { create, all } from "mathjs";
import {
  getTypeOfResult,
  formatNumberResult,
  computeNumberResult,
  formatComplexNumber,
  computeComplexNumberResult,
} from "../components/calculator/format-utils";

// Use the same BigNumber config as the app
const math = create(all, { number: "BigNumber", precision: 64 });

// ─── getTypeOfResult ─────────────────────────────────────────────────────────

describe("getTypeOfResult", () => {
  test("plain number → 'number'", () => {
    expect(getTypeOfResult(3.14)).toBe("number");
  });

  test("zero → 'number'", () => {
    expect(getTypeOfResult(0)).toBe("number");
  });

  test("BigNumber → 'number'", () => {
    expect(getTypeOfResult(math.bignumber(3.14))).toBe("number");
  });

  test("BigNumber(0) → 'number'", () => {
    expect(getTypeOfResult(math.bignumber(0))).toBe("number");
  });

  test("complex object → 'complex'", () => {
    expect(getTypeOfResult({ re: 1, im: 2 })).toBe("complex");
  });

  test("mathjs complex → 'complex'", () => {
    expect(getTypeOfResult(math.complex(1, 2))).toBe("complex");
  });

  test("Matrix → 'matrix'", () => {
    expect(getTypeOfResult(math.matrix([1, 2, 3]))).toBe("matrix");
  });

  test("plain array → 'array'", () => {
    expect(getTypeOfResult([1, 2, 3])).toBe("array");
  });

  test("function → 'function'", () => {
    expect(getTypeOfResult(() => {})).toBe("function");
  });
});

// ─── computeNumberResult ─────────────────────────────────────────────────────

describe("computeNumberResult", () => {
  test("rounds subnormal values to zero", () => {
    expect(computeNumberResult(1e-40)).toBe(0);
  });

  test("preserves normal values", () => {
    expect(computeNumberResult(3.14)).toBeCloseTo(3.14, 10);
  });

  test("preserves zero", () => {
    expect(computeNumberResult(0)).toBe(0);
  });

  test("preserves negative values", () => {
    expect(computeNumberResult(-7.5)).toBeCloseTo(-7.5, 10);
  });
});

// ─── formatNumberResult ──────────────────────────────────────────────────────

describe("formatNumberResult", () => {
  test("zero → '0'", () => {
    expect(formatNumberResult(0)).toBe("0");
  });

  test("subnormal rounds to '0'", () => {
    expect(formatNumberResult(1e-40)).toBe("0");
  });

  test("trims to 4 decimal places", () => {
    expect(formatNumberResult(3.141592653)).toBe("3.1415");
  });

  test("integer stays as integer", () => {
    expect(formatNumberResult(42)).toBe("42");
  });

  test("negative value", () => {
    expect(formatNumberResult(-2.5)).toBe("-2.5");
  });

  test("very small number → scientific notation", () => {
    const result = formatNumberResult(1.23e-10);
    expect(result).toMatch(/e/i);
  });

  test("very large number → scientific notation", () => {
    const result = formatNumberResult(1.23e12);
    expect(result).toMatch(/e/i);
  });

  test("BigNumber(π) trims to 4 decimal places", () => {
    expect(formatNumberResult(math.bignumber(Math.PI) as any)).toBe("3.1415");
  });

  test("BigNumber(0) → '0'", () => {
    expect(formatNumberResult(math.bignumber(0) as any)).toBe("0");
  });
});

// ─── formatComplexNumber ─────────────────────────────────────────────────────

describe("formatComplexNumber", () => {
  test("zero → '0'", () => {
    expect(formatComplexNumber({ re: 0, im: 0 })).toBe("0");
  });

  test("pure imaginary → 'Ni'", () => {
    expect(formatComplexNumber({ re: 0, im: 1 })).toBe("1i");
  });

  test("pure real → number string", () => {
    expect(formatComplexNumber({ re: 3, im: 0 })).toBe("3");
  });

  test("3+4i", () => {
    expect(formatComplexNumber({ re: 3, im: 4 })).toBe("3+4i");
  });

  test("3-4i (negative imaginary)", () => {
    expect(formatComplexNumber({ re: 3, im: -4 })).toBe("3-4i");
  });

  test("-1+0i → '-1'", () => {
    expect(formatComplexNumber({ re: -1, im: 0 })).toBe("-1");
  });
});

// ─── computeComplexNumberResult ──────────────────────────────────────────────

describe("computeComplexNumberResult", () => {
  test("rounds near-zero imaginary part to zero", () => {
    const result = computeComplexNumberResult({ re: 1, im: 1e-40 });
    expect(result.im).toBe(0);
    expect(result.re).toBeCloseTo(1, 10);
  });

  test("preserves non-zero parts", () => {
    const result = computeComplexNumberResult({ re: 3, im: 4 });
    expect(result.re).toBeCloseTo(3, 10);
    expect(result.im).toBeCloseTo(4, 10);
  });
});
