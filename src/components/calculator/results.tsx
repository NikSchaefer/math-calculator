import { EvalResult } from "@/types";
import math from "@/tex-parser/customMath";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { Fraction } from "mathjs";
import { SquareDivide } from "lucide-react";
import { Copy } from "@/components/copy";

export function Result({ formattedResult, result, type }: EvalResult) {
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

    const copyText = useMemo(() => {
        if (!result) return "";
        return showFraction && canShowFraction && asFraction
            ? `${asFraction.n}/${asFraction.d}`
            : type === "number"
            ? result.toString()
            : formattedResult;
    }, [
        result,
        showFraction,
        canShowFraction,
        asFraction,
        type,
        formattedResult,
    ]);

    return (
        <motion.div
            className="flex items-center gap-4 p-0.5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
        >
            <span className="text-2xl text-gray-400">=</span>
            <div className="flex items-center gap-2 relative">
                <Copy
                    text={copyText}
                    className="bg-blue-50 rounded-xl min-w-[120px] text-center relative group cursor-pointer hover:bg-blue-100 transition-colors"
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
                </Copy>
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
            </div>
        </motion.div>
    );
}
