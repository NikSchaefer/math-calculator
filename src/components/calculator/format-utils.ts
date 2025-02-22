import { ComplexNumber } from "@/types";

export function computeNumberResult(num: number): number {
    // Check for numbers very close to common values
    const commonValues = [0, 0.5, 1, -0.5, -1];
    for (const value of commonValues) {
        if (Math.abs(num - value) < 1e-12) {
            return value;
        }
    }

    // Increase threshold for "zero" to 1e-12
    if (Math.abs(num) < 1e-12) return 0;

    return num;
}

export function formatNumberResult(num: number): string {
    const computed = computeNumberResult(num);

    if (computed === 0) return "0";

    // For very small or large numbers, use scientific notation
    if (Math.abs(computed) < 0.0001 || Math.abs(computed) > 10000) {
        return Number(computed).toExponential(4);
    }

    // Round numbers with more than 8 decimal places
    if (num % 1 !== 0) {
        // Check if it's a decimal number
        const decimalPlaces = num.toString().split(".")[1]?.length || 0;
        if (decimalPlaces > 8) {
            return Number(num.toFixed(8)).toString();
        }
    }

    // Round numbers with more than 8 decimal places
    const str = num.toString();
    if (str.length > 10) {
        return Number(num).toPrecision(8);
    }
    return str;
}

export function computeComplexNumberResult(num: ComplexNumber): ComplexNumber {
    const re = computeNumberResult(num.re);
    const im = computeNumberResult(num.im);
    return { re, im };
}

export function formatComplexNumber({ re, im }: ComplexNumber): string {
    // Format real and imaginary parts
    const computed = computeComplexNumberResult({ re, im });

    // If both parts are "0", return just "0"
    if (computed.re === 0 && computed.im === 0) return "0";
    // If imaginary part is "0", return just real part
    if (computed.im === 0) return computed.re.toString();
    // If real part is "0", return just imaginary part with i
    if (computed.re === 0) return `${computed.im}i`;

    // Otherwise return full complex number
    const imSign = im >= 0 ? "+" : "";
    return `${computed.re}${imSign}${computed.im}i`;
}
