import { Fraction } from "mathjs";
import math from "@/tex-parser/customMath";
import { FractionDisplay } from "./results/fraction-display";
import { ArrayTooltip } from "./results/tooltip";
import { useMemo } from "react";
import { EvalResult } from "@/types";
import { SquareDivide } from "lucide-react";
import { useState } from "react";
import { MAX_ARRAY_LENGTH } from "@/config";
import { motion } from "motion/react";
import { Copy } from "../copy";

function ResultDisplay({
    showFraction,
    canShowFraction,
    asFraction,
    isCutoffArray,
    formattedResult,
    fullArrayDisplay,
}: {
    showFraction: boolean;
    canShowFraction: boolean;
    asFraction: Fraction | null;
    isCutoffArray: boolean;
    formattedResult: string;
    fullArrayDisplay: string | null;
}) {
    if (showFraction && canShowFraction && asFraction) {
        return (
            <FractionDisplay
                numerator={asFraction.n}
                denominator={asFraction.d}
            />
        );
    }

    if (isCutoffArray) {
        return (
            <div className="p-4 relative">
                <ArrayTooltip
                    formattedResult={formattedResult}
                    fullArrayDisplay={fullArrayDisplay || ""}
                />
            </div>
        );
    }

    return <div className="p-4 relative">{formattedResult || "-"}</div>;
}

export function CompileResults({ results }: { results: EvalResult[] }) {
    if (results.length === 0) {
        return null;
    }

    if (results.length === 1) {
        return <Result {...results[0]} />;
    }

    const result: EvalResult = {
        result: results.map((r) => r.result).flat(),
        formattedResult: results.map((r) => r.formattedResult).join("; "),
        type: "array",
        variables: results.map((r) => r.variables).flat(),
    };
    return <Result {...result} />;
}

export function Result({ formattedResult, result, type }: EvalResult) {
    const [showFraction, setShowFraction] = useState(false);

    const { asFraction, canShowFraction } = useMemo(() => {
        try {
            if (Array.isArray(result)) {
                const allNumbers = result.every(
                    (r) => typeof r === "number" && !Number.isNaN(r)
                );
                if (!allNumbers) {
                    return { asFraction: null, canShowFraction: false };
                }

                const fractions = result.map((r) => math.fraction(r as number));
                const hasNonTrivialFractions = fractions.some(
                    (f) => f.d !== BigInt(1)
                );

                return {
                    asFraction: hasNonTrivialFractions ? fractions : null,
                    canShowFraction: hasNonTrivialFractions,
                };
            }

            if (typeof result !== "number" || Number.isNaN(result)) {
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
            if (Array.isArray(asFraction)) {
                return asFraction.map((f) => `${f.n}/${f.d}`).join("; ");
            }
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
                        <ResultDisplay
                            showFraction={showFraction}
                            canShowFraction={canShowFraction}
                            asFraction={
                                Array.isArray(asFraction)
                                    ? asFraction[0]
                                    : asFraction
                            }
                            isCutoffArray={isCutoffArray}
                            formattedResult={formattedResult}
                            fullArrayDisplay={fullArrayDisplay}
                        />
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
