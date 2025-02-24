import { EvalResult } from "@/types";
import math from "@/tex-parser/customMath";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Fraction } from "mathjs";
import { SquareDivide } from "lucide-react";

export function Result({ formattedResult, result, type }: EvalResult) {
    const [showCheck, setShowCheck] = useState(false);
    const [showFraction, setShowFraction] = useState(false);

    const { asFraction, canShowFraction } = useMemo(() => {
        try {
            if (typeof result !== "number") {
                return { asFraction: null, canShowFraction: false };
            }

            const asFraction: Fraction | null =
                type === "number" ? math.fraction(result as number) : null;

            if (asFraction?.d === BigInt(1)) {
                return { asFraction: null, canShowFraction: false };
            }

            const canShowFraction = asFraction !== null;
            return { asFraction, canShowFraction };
        } catch (error) {
            console.error(error);
            return { asFraction: null, canShowFraction: false };
        }
    }, [type, result]);

    const handleCopy = () => {
        if (!result) return;

        const text =
            showFraction && canShowFraction && asFraction
                ? `${asFraction.n}/${asFraction.d}`
                : type === "number"
                ? result.toString()
                : formattedResult;

        navigator.clipboard.writeText(text);
        toast.success(`Copied to clipboard: ${text}`);

        setShowCheck(true);
        setTimeout(() => setShowCheck(false), 1300);
    };

    return (
        <motion.div
            className="flex items-center gap-4 p-0.5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
        >
            <span className="text-2xl text-gray-400">=</span>
            <div className="flex items-center gap-2">
                <motion.div
                    key={formattedResult}
                    className="bg-blue-50 rounded-xl min-w-[120px] text-center relative group cursor-pointer hover:bg-blue-100 transition-colors"
                    initial={{ scale: 0.95, opacity: 0.7 }}
                    animate={{
                        scale: result ? 1 : 0.95,
                        opacity: result ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.2 }}
                    onClick={handleCopy}
                >
                    <div className="text-2xl font-semibold text-blue-800 whitespace-nowrap select-text">
                        {showFraction && canShowFraction ? (
                            <div className="flex p-2 text-base flex-col items-center">
                                <span>{asFraction?.n}</span>
                                <hr className="w-1/2 border-t border-gray-300" />
                                <span>{`${asFraction?.d}`}</span>
                            </div>
                        ) : (
                            <div className="p-4">{formattedResult || "-"}</div>
                        )}
                    </div>
                    {canShowFraction && (
                        <button
                            className="absolute -right-2 top-1/2 -translate-y-1/2 bg-blue-200 rounded-full p-1 hover:bg-blue-300 transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowFraction(!showFraction);
                            }}
                        >
                            <SquareDivide className="w-4 h-4" />
                        </button>
                    )}
                    {showCheck && (
                        <motion.div
                            className="absolute rounded-xl inset-0 w-full h-full flex items-center justify-center text-xs bg-green-50 backdrop-blur-[1px]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.svg
                                viewBox="0 0 24 24"
                                className="w-5 h-5 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={3}
                            >
                                <motion.path
                                    d="M4 12L10 18L20 6"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.svg>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
}
