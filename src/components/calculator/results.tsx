import { EvalResult } from "@/types";
import math from "@/tex-parser/customMath";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { Fraction } from "mathjs";
import { SquareDivide } from "lucide-react";
import { Copy } from "@/components/copy";
import { MAX_ARRAY_LENGTH } from "@/config";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

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
        if (showFraction && canShowFraction && asFraction) {
            return `${asFraction.n}/${asFraction.d}`;
        }
        if (type === "array" || type === "matrix") {
            return `[${result.toString()}]`;
        }
        if (type === "number") {
            return result.toString();
        }
        return formattedResult;
    }, [
        result,
        showFraction,
        canShowFraction,
        asFraction,
        type,
        formattedResult,
    ]);

    const isCutoffArray = useMemo(() => {
        if (!result || !Array.isArray(result)) return false;
        return result.length > MAX_ARRAY_LENGTH;
    }, [result]);

    const fullArrayDisplay = useMemo(() => {
        if (!Array.isArray(result)) return null;
        return result.join(", ");
    }, [result]);

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
                    className="bg-blue-50 rounded-xl min-w-[120px] text-center relative cursor-pointer hover:bg-blue-100 transition-colors"
                >
                    <div className="text-2xl font-semibold text-blue-800 whitespace-nowrap select-text">
                        {showFraction && canShowFraction ? (
                            <div className="flex p-2 text-base flex-col items-center">
                                <span>{asFraction?.n}</span>
                                <hr className="w-1/2 border-t border-gray-300" />
                                <span>{`${asFraction?.d}`}</span>
                            </div>
                        ) : (
                            <div className="p-4 relative">
                                {isCutoffArray ? (
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div>{formattedResult}</div>
                                            </TooltipTrigger>
                                            <TooltipContent
                                                side="top"
                                                className="max-w-[400px] max-h-[300px] overflow-y-auto"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <div className="text-sm">
                                                    [{fullArrayDisplay}]
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ) : (
                                    formattedResult || "-"
                                )}
                            </div>
                        )}
                    </div>
                </Copy>
                {canShowFraction && (
                    <button
                        className="absolute -right-0 translate-x-1/2 top-1/2 -translate-y-1/2 bg-blue-200 rounded-full p-1 hover:bg-blue-300 transition-colors"
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
