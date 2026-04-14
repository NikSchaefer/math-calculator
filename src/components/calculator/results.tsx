import { Fraction } from "mathjs";
import math from "@/tex-parser/customMath";
import { FractionDisplay } from "./results/fraction-display";
import { ArrayTooltip } from "./results/tooltip";
import { useMemo } from "react";
import { ComplexNumber, EvalResult } from "@/types";
import { SquareDivide } from "lucide-react";
import { useState } from "react";
import { MAX_ARRAY_LENGTH } from "@/config";
import { motion } from "motion/react";
import { Copy } from "../copy";
import { formatPhasorComplex } from "./format-utils";
import { useCalculator } from "@/app/context";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function ResultDisplay({
  showFraction,
  canShowFraction,
  asFraction,
  isCutoffArray,
  formattedResult,
  fullArrayDisplay,
  type,
}: {
  showFraction: boolean;
  canShowFraction: boolean;
  asFraction: Fraction | null;
  isCutoffArray: boolean;
  formattedResult: string;
  fullArrayDisplay: string | null;
  type: string;
}) {
  if (type === "function") {
    return (
      <div className="px-4 py-3 relative text-sm font-normal text-blue-400 italic">
        {formattedResult}
      </div>
    );
  }

  if (showFraction && canShowFraction && asFraction) {
    return (
      <FractionDisplay numerator={asFraction.n} denominator={asFraction.d} />
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
  const { angleMode } = useCalculator();
  const [showFraction, setShowFraction] = useState(false);
  const [showPhasor, setShowPhasor] = useState(false);

  const canShowPhasor = type === "complex";
  const phasorDisplay = useMemo(() => {
    if (!canShowPhasor || !result || typeof result !== "object" || Array.isArray(result)) return null;
    return formatPhasorComplex(result as ComplexNumber, angleMode);
  }, [canShowPhasor, result, angleMode]);

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
        const hasNonTrivialFractions = fractions.some((f) => f.d !== BigInt(1));

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
    if (showPhasor && canShowPhasor && phasorDisplay) {
      return phasorDisplay;
    }
    return formattedResult;
  }, [
    result,
    showFraction,
    canShowFraction,
    asFraction,
    showPhasor,
    canShowPhasor,
    phasorDisplay,
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

  if (type === "error" && formattedResult) {
    return (
      <motion.div
        className="flex items-center gap-4 p-0.5"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        <span className="text-xl text-gray-400">=</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="bg-red-50 rounded-xl min-w-[120px] text-center cursor-default">
                <div className="p-4 text-xl font-semibold text-red-500">
                  Error
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[320px]">
              <p className="text-sm">{formattedResult}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex items-center gap-4 p-0.5"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: 0.1 }}
    >
      <span className="text-xl text-gray-400">=</span>
      <div className="flex items-center gap-2 relative">
        <Copy
          text={copyText}
          className="bg-blue-50 rounded-xl min-w-[120px] text-center relative cursor-pointer hover:bg-blue-100 transition-colors"
        >
          <div className="text-xl font-semibold text-blue-800 whitespace-nowrap select-text">
            {showPhasor && canShowPhasor && phasorDisplay ? (
              <div className="p-4 relative">{phasorDisplay}</div>
            ) : (
              <ResultDisplay
                showFraction={showFraction}
                canShowFraction={canShowFraction}
                asFraction={
                  Array.isArray(asFraction) ? asFraction[0] : asFraction
                }
                isCutoffArray={isCutoffArray}
                formattedResult={formattedResult}
                fullArrayDisplay={fullArrayDisplay}
                type={type}
              />
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
        {canShowPhasor && (
          <button
            className="absolute -right-0 translate-x-1/2 top-1/2 -translate-y-1/2 bg-blue-200 rounded-full p-1 hover:bg-blue-300 transition-colors font-semibold text-sm leading-none"
            onClick={(e) => {
              e.stopPropagation();
              setShowPhasor(!showPhasor);
            }}
          >
            ∠
          </button>
        )}
      </div>
    </motion.div>
  );
}
