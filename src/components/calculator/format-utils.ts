import { MAX_ARRAY_LENGTH } from "@/config";
import { ComplexNumber, EvalType } from "@/types";
import { Matrix } from "mathjs";

const PRECISION = 4;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTypeOfResult(evaluated: any): EvalType {
  if (Array.isArray(evaluated)) {
    return "array";
  }

  if (typeof evaluated === "object" && "im" in evaluated && "re" in evaluated) {
    return "complex";
  }

  if (typeof evaluated === "object" && "_data" in evaluated) {
    return "matrix";
  }

  return "number";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatResult(evaluated: any): string {
  const type = getTypeOfResult(evaluated);
  switch (type) {
    case "complex":
      return formatComplexNumber(evaluated);
    case "matrix":
      return formatMatrixResult(evaluated);
    case "array":
      return formatArrayResult(evaluated);
    case "number":
      return formatNumberResult(evaluated);
    default:
      return evaluated.toString();
  }
}

function roundWithDynamicTolerance(
  value: number,
  scale = 1,
  relativeTolerance = 1e-35,
) {
  // Calculate the absolute tolerance based on the scale
  const absoluteTolerance = relativeTolerance * scale;

  // Round to zero if the value is within the absolute tolerance
  if (Math.abs(value) < absoluteTolerance) {
    return 0;
  }
  // Otherwise, return the original value
  return value;
}

export function computeNumberResult(num: number): number {
  return roundWithDynamicTolerance(num);
}

export function formatNumberResult(num: number): string {
  const computed = computeNumberResult(num);
  if (computed === 0) return "0";

  // For very small or large numbers, use scientific notation
  if (Math.abs(computed) < 1e-8 || Math.abs(computed) > 1e8) {
    const length = Math.min(computed.toString().length, PRECISION);
    if (length === PRECISION) {
      return Number(computed.toPrecision(length)).toExponential();
    }
    // Limit scientific notation to 8 significant digits
    return Number(computed.toFixed(length)).toExponential();
  }

  // Limit to 8 decimal places
  const str = computed.toString();
  const trimmed = str.replace(/(\d+\.\d{4})\d*/, "$1");
  return trimmed;
}

export function computeComplexNumberResult(num: ComplexNumber): ComplexNumber {
  const re = computeNumberResult(num.re);
  const im = computeNumberResult(num.im);
  return { re, im };
}

export function formatComplexNumber({ re, im }: ComplexNumber): string {
  // Format real and imaginary parts
  const computed = computeComplexNumberResult({ re, im });

  const formattedRe = formatNumberResult(computed.re);
  const formattedIm = formatNumberResult(computed.im);

  // If both parts are "0", return just "0"
  if (computed.re === 0 && computed.im === 0) return "0";
  // If imaginary part is "0", return just real part
  if (computed.im === 0) return formattedRe.toString();
  // If real part is "0", return just imaginary part with i
  if (computed.re === 0) return `${formattedIm}i`;

  // Otherwise return full complex number
  const imSign = im >= 0 ? "+" : "";
  return `${formattedRe}${imSign}${formattedIm}i`;
}

export function formatMatrixResult(matrix: Matrix): string {
  const array = matrix.toArray();
  if (array.length > MAX_ARRAY_LENGTH) {
    return `[${array.slice(0, MAX_ARRAY_LENGTH).toString()}, ...]`;
  }
  return `[${array.toString()}]`;
}

export function computeMatrixResult(matrix: Matrix): Array<unknown> {
  return matrix.toArray();
}

export function formatArrayResult(array: Array<unknown>): string {
  if (array.length > MAX_ARRAY_LENGTH) {
    return `[${array.slice(0, MAX_ARRAY_LENGTH).toString()}, ...]`;
  }
  return `[${array.toString()}]`;
}

export function computeArrayResult(array: Array<unknown>): Array<unknown> {
  return array;
}
