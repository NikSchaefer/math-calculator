"use client";
import { MathField } from "react-mathquill";
import { motion } from "motion/react";
import { ComputedCalculator } from "@/types";
import { useCalculator } from "../../app/context";
import { MathInput } from "./input";
import { CompileResults } from "./results";

export function Calculator({
  calculator: computed,
}: {
  calculator: ComputedCalculator;
}) {
  const {
    deleteCalculator,
    updateCalculator,
    insertCalculatorAfter,
    selectedId,
    setSelectedId,
  } = useCalculator();

  const isSelected = selectedId === computed.id;

  const clearInput = () => {
    updateCalculator(computed.id!, "");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Delete" && (e.metaKey || e.ctrlKey)) {
      clearInput();
    } else if (
      (e.key === "Backspace" || e.key === "Delete") &&
      computed.latex === "" // Only delete if the row was already empty before this keypress
    ) {
      deleteCalculator(computed.id!);
    } else if (e.key === "Enter") {
      insertCalculatorAfter(computed.id!);
    }
  };

  const handleLatexChange = (mathField: MathField) => {
    if (!mathField) return;
    const newLatex = mathField.latex();
    updateCalculator(computed.id!, newLatex);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
      }}
      className="flex flex-col sm:flex-row gap-4 items-center"
      onClick={() => setSelectedId(computed.id!)}
    >
      <MathInput
        onFocus={() => setSelectedId(computed.id!)}
        id={computed.id!}
        latex={computed.latex}
        isSelected={isSelected}
        onLatexChange={handleLatexChange}
        onKeyDown={handleKeyDown}
      />
      <CompileResults results={computed.results} />
    </motion.div>
  );
}
