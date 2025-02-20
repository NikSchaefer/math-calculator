import { MathField, EditableMathField } from "react-mathquill";
import { evaluateTex } from "tex-math-parser";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface ComplexNumber {
    re: number;
    im: number;
}

interface CalculatorFieldProps {
    id: string;
    isSelected?: boolean;
    onSelect?: () => void;
    deleteCalculatorField?: () => void;
}

const existingVariables = {
    g: 9.81,
};

export function CalculatorField({
    id,
    isSelected,
    onSelect,
    deleteCalculatorField,
}: CalculatorFieldProps) {
    const [latex, setLatex] = useState("");
    const [result, setResult] = useState("");
    const mathFieldRef = useRef<MathField>(null);

    const clearInput = () => {
        setLatex("");
        setResult("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Delete" && (e.metaKey || e.ctrlKey)) {
            clearInput();
        } else if (
            (e.key === "Backspace" || e.key === "Delete") &&
            !latex.trim() &&
            deleteCalculatorField
        ) {
            deleteCalculatorField();
        }
    };
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

    const calculate = (input: string) => {
        if (!input.trim()) {
            setResult("");
            return;
        }

        try {
            const { evaluated } = evaluateTex(input, existingVariables);

            if (
                typeof evaluated === "object" &&
                "im" in evaluated &&
                "re" in evaluated
            ) {
                setResult(formatComplexNumber(evaluated as ComplexNumber));
            } else {
                const numResult = Number(evaluated);
                setResult(formatNumber(numResult));
            }
        } catch (error) {
            if (
                error instanceof Error &&
                error.message.includes("expected primary")
            ) {
                setResult("");
            } else {
                setResult("Error");
            }
        }
    };

    const handleLatexChange = (mathField: MathField) => {
        const newLatex = mathField.latex();
        setLatex(newLatex);
        calculate(newLatex);
    };

    useEffect(() => {
        if (isSelected && mathFieldRef.current) {
            mathFieldRef.current.focus();
        }
    }, [isSelected]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                duration: 0.3,
                exit: { duration: 0.2 },
            }}
            className={`flex flex-col md:flex-row gap-4 items-center`}
            onClick={onSelect}
        >
            <motion.div
                className="flex-grow w-full"
                animate={{
                    scale: isSelected ? 1.02 : 1,
                }}
                transition={{ duration: 0.2 }}
            >
                <EditableMathField
                    mathquillDidMount={(mathField) => {
                        mathFieldRef.current = mathField;
                    }}
                    id={id}
                    className="w-full p-4 text-2xl bg-gray-50 rounded-xl transition-all duration-200 hover:bg-gray-100 focus:bg-white"
                    aria-label="Math equation input"
                    latex={latex}
                    onKeyDown={handleKeyDown}
                    onChange={handleLatexChange}
                    config={{
                        autoCommands: "pi theta sqrt sum phi int",
                        autoOperatorNames: "sin cos tan",
                    }}
                />
            </motion.div>
            <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
            >
                <span className="text-2xl text-gray-400">=</span>
                <motion.div
                    className="bg-blue-50 p-4 rounded-xl min-w-[120px] text-center"
                    animate={{
                        scale: result ? 1 : 0.95,
                        opacity: result ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <span className="text-2xl font-semibold text-blue-800 whitespace-nowrap">
                        {result || "-"}
                    </span>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
