"use client";
import { MathField } from "react-mathquill";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator as CalculatorType } from "@/types";
import { useCalculator } from "../../app/context";
import { useCalculation } from "./useCalculation";
import { MathInput } from "./input";
import { Result } from "./results";
import { generateId } from "@/lib/utils";

export function Calculator({ calculator }: { calculator: CalculatorType }) {
    const {
        variables,
        deleteCalculator,
        updateCalculator,
        selectedId,
        setSelectedId,
        calculators,
        setCalculators,
    } = useCalculator();

    const isSelected = selectedId === calculator.id;
    const [wasEmpty, setWasEmpty] = useState(true);
    const { result, calculate } = useCalculation(calculator.id, variables);

    const clearInput = () => {
        updateCalculator(calculator.id, "");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Delete" && (e.metaKey || e.ctrlKey)) {
            clearInput();
        } else if (
            (e.key === "Backspace" || e.key === "Delete") &&
            wasEmpty // Only delete if it was already empty before this keypress
        ) {
            deleteCalculator(calculator.id);
        } else if (e.key === "Enter") {
            const newId = generateId();
            setCalculators([...calculators, { id: newId, latex: "" }]);
            setSelectedId(newId);
        }
        // else if (e.key === "ArrowUp")
        // {
        //     const index = calculators.findIndex((c) => c.id === calculator.id);
        //     if (index === -1) return;
        //     setSelectedId(calculators[index - 1].id);
        // } else if (e.key === "ArrowDown") {
        //     const index = calculators.findIndex((c) => c.id === calculator.id);
        //     if (index === -1) return;
        //     setSelectedId(calculators[index + 1].id);
        // }
    };

    const handleLatexChange = (mathField: MathField) => {
        if (!mathField) return;
        const newLatex = mathField.latex();
        calculate(newLatex);
        updateCalculator(calculator.id, newLatex);
    };

    useEffect(() => {
        setWasEmpty(calculator.latex === "");
    }, [calculator.latex]);

    useEffect(() => {
        calculate(calculator.latex);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variables]);

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
            className="flex flex-col md:flex-row gap-4 items-center"
            onClick={() => setSelectedId(calculator.id)}
        >
            <MathInput
                id={calculator.id}
                latex={calculator.latex}
                isSelected={isSelected}
                onLatexChange={handleLatexChange}
                onKeyDown={handleKeyDown}
            />
            <Result result={result} />
        </motion.div>
    );
}
