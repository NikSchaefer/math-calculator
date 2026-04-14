import { describe, test, expect, beforeEach } from "bun:test";
import math from "../tex-parser/customMath";

// Helper: convert BigNumber/number to a plain JS number for approximate comparisons
const num = (x: unknown) => Number(x);

const angleMode = {
  rad: () => (math as any).setAngleMode("rad"),
  deg: () => (math as any).setAngleMode("deg"),
};

beforeEach(() => {
  angleMode.rad();
});

// ─── angle() ────────────────────────────────────────────────────────────────

describe("angle()", () => {
  test("returns BigNumber for complex input in rad mode", () => {
    const result = (math as any).angle(math.complex(3, 4));
    expect((math as any).isBigNumber(result)).toBe(true);
  });

  test("angle(3+4i) rad ≈ atan2(4,3)", () => {
    const result = (math as any).angle(math.complex(3, 4));
    expect(num(result)).toBeCloseTo(Math.atan2(4, 3), 10);
  });

  test("angle(3+4i) deg ≈ 53.13°", () => {
    angleMode.deg();
    const result = (math as any).angle(math.complex(3, 4));
    expect(num(result)).toBeCloseTo(53.1301, 3);
  });

  test("angle(-1) rad = π", () => {
    const result = (math as any).angle(math.bignumber(-1));
    expect(num(result)).toBeCloseTo(Math.PI, 10);
  });

  test("angle(-1) deg = 180", () => {
    angleMode.deg();
    const result = (math as any).angle(math.bignumber(-1));
    expect(num(result)).toBeCloseTo(180, 10);
  });

  test("angle(1) = 0", () => {
    const result = (math as any).angle(math.bignumber(1));
    expect(num(result)).toBe(0);
  });

  test("angle(i) rad = π/2", () => {
    const result = (math as any).angle(math.complex(0, 1));
    expect(num(result)).toBeCloseTo(Math.PI / 2, 10);
  });

  test("angle(i) deg = 90", () => {
    angleMode.deg();
    const result = (math as any).angle(math.complex(0, 1));
    expect(num(result)).toBeCloseTo(90, 10);
  });

  test("result can be used in further BigNumber arithmetic (regression)", () => {
    const a = (math as any).angle(math.complex(3, 4));
    expect(() => math.multiply(a, 2)).not.toThrow();
    expect(num(math.multiply(a, 2))).toBeCloseTo(2 * Math.atan2(4, 3), 10);
  });
});

// ─── mag() ──────────────────────────────────────────────────────────────────

describe("mag()", () => {
  test("mag of complex number returns BigNumber", () => {
    const result = (math as any).mag(math.complex(3, 4));
    expect((math as any).isBigNumber(result)).toBe(true);
  });

  test("mag(3+4i) = 5", () => {
    expect(num((math as any).mag(math.complex(3, 4)))).toBeCloseTo(5, 10);
  });

  test("mag(3, 4) = 5", () => {
    expect(num((math as any).mag(3, 4))).toBeCloseTo(5, 10);
  });

  test("mag([3, 4]) = 5", () => {
    expect(num((math as any).mag(math.matrix([3, 4])))).toBeCloseTo(5, 10);
  });

  test("mag(1, 1) = sqrt(2)", () => {
    expect(num((math as any).mag(1, 1))).toBeCloseTo(Math.SQRT2, 10);
  });

  test("result can be used in further BigNumber arithmetic (regression)", () => {
    const m = (math as any).mag(math.complex(3, 4));
    expect(() => math.multiply(m, 3)).not.toThrow();
    expect(num(math.multiply(m, 3))).toBeCloseTo(15, 10);
  });

  test("mag of decimal-valued vector doesn't throw (regression: >15 sig digits)", () => {
    const m = (math as any).mag(math.matrix([3, 5.5]));
    expect(() => math.multiply(m, 3)).not.toThrow();
  });
});

// ─── arcsin / arccos / arctan ────────────────────────────────────────────────

describe("arcsin()", () => {
  test("arcsin(0.5) rad = π/6", () => {
    expect(num((math as any).arcsin(0.5))).toBeCloseTo(Math.PI / 6, 10);
  });

  test("arcsin(0.5) deg = 30", () => {
    angleMode.deg();
    expect(num((math as any).arcsin(0.5))).toBeCloseTo(30, 10);
  });

  test("arcsin(1) rad = π/2", () => {
    expect(num((math as any).arcsin(1))).toBeCloseTo(Math.PI / 2, 10);
  });

  test("result is BigNumber", () => {
    expect((math as any).isBigNumber((math as any).arcsin(0.5))).toBe(true);
  });

  test("result can be used in further arithmetic", () => {
    const r = (math as any).arcsin(0.5);
    expect(() => math.multiply(r, 2)).not.toThrow();
  });
});

describe("arccos()", () => {
  test("arccos(0.5) rad = π/3", () => {
    expect(num((math as any).arccos(0.5))).toBeCloseTo(Math.PI / 3, 10);
  });

  test("arccos(0.5) deg = 60", () => {
    angleMode.deg();
    expect(num((math as any).arccos(0.5))).toBeCloseTo(60, 10);
  });

  test("arccos(1) = 0", () => {
    expect(num((math as any).arccos(1))).toBeCloseTo(0, 10);
  });
});

describe("arctan()", () => {
  test("arctan(1) rad = π/4", () => {
    expect(num((math as any).arctan(1))).toBeCloseTo(Math.PI / 4, 10);
  });

  test("arctan(1) deg = 45", () => {
    angleMode.deg();
    expect(num((math as any).arctan(1))).toBeCloseTo(45, 10);
  });
});

// ─── arccot / arccsc / arcsec ────────────────────────────────────────────────

describe("arccot()", () => {
  test("arccot(1) rad = π/4", () => {
    expect(num((math as any).arccot(1))).toBeCloseTo(Math.PI / 4, 10);
  });

  test("arccot(1) deg = 45", () => {
    angleMode.deg();
    expect(num((math as any).arccot(1))).toBeCloseTo(45, 10);
  });

  test("arccot(sqrt(3)) rad = π/6", () => {
    expect(num((math as any).arccot(Math.sqrt(3)))).toBeCloseTo(Math.PI / 6, 10);
  });

  test("result is BigNumber", () => {
    expect((math as any).isBigNumber((math as any).arccot(1))).toBe(true);
  });

  test("result can be used in further arithmetic (regression: 1/x was plain JS)", () => {
    const r = (math as any).arccot(3);
    expect(() => math.multiply(r, 2)).not.toThrow();
  });
});

describe("arccsc()", () => {
  test("arccsc(2) rad = π/6", () => {
    expect(num((math as any).arccsc(2))).toBeCloseTo(Math.PI / 6, 10);
  });

  test("arccsc(2) deg = 30", () => {
    angleMode.deg();
    expect(num((math as any).arccsc(2))).toBeCloseTo(30, 10);
  });

  test("result can be used in further arithmetic (regression)", () => {
    const r = (math as any).arccsc(2);
    expect(() => math.multiply(r, 4)).not.toThrow();
  });
});

describe("arcsec()", () => {
  test("arcsec(2) rad = π/3", () => {
    expect(num((math as any).arcsec(2))).toBeCloseTo(Math.PI / 3, 10);
  });

  test("arcsec(2) deg = 60", () => {
    angleMode.deg();
    expect(num((math as any).arcsec(2))).toBeCloseTo(60, 10);
  });

  test("result can be used in further arithmetic (regression)", () => {
    const r = (math as any).arcsec(2);
    expect(() => math.multiply(r, 3)).not.toThrow();
  });
});

// ─── forward trig (degree-awareness sanity checks) ───────────────────────────

describe("sin / cos / tan (degree mode)", () => {
  test("sin(90°) = 1", () => {
    angleMode.deg();
    expect(num(math.sin(math.bignumber(90)))).toBeCloseTo(1, 10);
  });

  test("cos(60°) = 0.5", () => {
    angleMode.deg();
    expect(num(math.cos(math.bignumber(60)))).toBeCloseTo(0.5, 10);
  });

  test("tan(45°) = 1", () => {
    angleMode.deg();
    expect(num(math.tan(math.bignumber(45)))).toBeCloseTo(1, 10);
  });

  test("sin(π) rad ≈ 0", () => {
    expect(num(math.sin(math.pi))).toBeCloseTo(0, 10);
  });
});
