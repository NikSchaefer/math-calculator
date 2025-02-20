import { ComplexNumber } from "@/types";

const formatNumber = (num: number) => {
    // Check for numbers very close to common values
    const commonValues = [0, 0.5, 1, -0.5, -1];
    for (const value of commonValues) {
        if (Math.abs(num - value) < 1e-12) {
            return value.toString();
        }
    }

    // Increase threshold for "zero" to 1e-12
    if (Math.abs(num) < 1e-12) return "0";

    // For very small or large numbers, use scientific notation
    if (Math.abs(num) < 0.0001 || Math.abs(num) > 10000) {
        return Number(num).toExponential(4);
    }

    // Round numbers with more than 8 decimal places
    if (num % 1 !== 0) {
        // Check if it's a decimal number
        const decimalPlaces = num.toString().split(".")[1]?.length || 0;
        if (decimalPlaces > 8) {
            return Number(num.toFixed(8)).toString();
        }
    }

    const str = num.toString();
    if (str.length > 10) {
        return Number(num).toPrecision(8);
    }
    return str;
};

const formatComplexNumber = ({ re, im }: ComplexNumber): string => {
    // Format real and imaginary parts
    const formattedRe = formatNumber(re);
    const formattedIm = formatNumber(im);

    // If both parts are "0", return just "0"
    if (formattedRe === "0" && formattedIm === "0") return "0";
    // If imaginary part is "0", return just real part
    if (formattedIm === "0") return formattedRe;
    // If real part is "0", return just imaginary part with i
    if (formattedRe === "0") return `${formattedIm}i`;

    // Otherwise return full complex number
    const imSign = im >= 0 ? "+" : "";
    return `${formattedRe}${imSign}${formattedIm}i`;
};

export { formatNumber, formatComplexNumber };
