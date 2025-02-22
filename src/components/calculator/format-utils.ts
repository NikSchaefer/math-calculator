import { ComplexNumber } from "@/types";

const THRESHOLD = 1e-35;

export function computeNumberResult(num: number): number {
    // Check for numbers very close to common values
    const commonValues = [0, 0.5, 1, -0.5, -1];
    for (const value of commonValues) {
        if (Math.abs(num - value) < THRESHOLD) {
            return value;
        }
    }

    // Increase threshold for "zero" to 1e-32
    if (Math.abs(num) < THRESHOLD) return 0;

    return num;
}

export function formatNumberResult(num: number): string {
    const computed = computeNumberResult(num);
    if (computed === 0) return "0";

    // For very small or large numbers, use scientific notation
    if (Math.abs(computed) < 0.0001 || Math.abs(computed) > 10000) {
        return Number(computed).toExponential(4);
    }

    return num.toString();
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
