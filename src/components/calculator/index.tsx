"use client";
import { MathField } from "react-mathquill";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ComputedCalculator } from "@/types";
import { useCalculator } from "../../app/context";
import { MathInput } from "./input";
import { Result } from "./results";
import { generateId } from "@/lib/utils";

export function Calculator({
    calculator: computed,
}: {
    calculator: ComputedCalculator;
}) {
    const {
        deleteCalculator,
        updateCalculator,
        selectedId,
        setSelectedId,
        calculators,
        setCalculators,
    } = useCalculator();

    const isSelected = selectedId === computed.id;
    const [wasEmpty, setWasEmpty] = useState(true);

    const clearInput = () => {
        updateCalculator(computed.id!, "");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Delete" && (e.metaKey || e.ctrlKey)) {
            clearInput();
        } else if (
            (e.key === "Backspace" || e.key === "Delete") &&
            wasEmpty // Only delete if it was already empty before this keypress
        ) {
            deleteCalculator(computed.id!);
        } else if (e.key === "Enter") {
            const newId = generateId();

            // Insert it after the selected calculator, if available
            const index = calculators.findIndex((c) => c.id === selectedId);
            if (index !== -1) {
                setCalculators([
                    ...calculators.slice(0, index + 1),
                    { id: newId, latex: "" },
                    ...calculators.slice(index + 1),
                ]);
            } else {
                setCalculators([...calculators, { id: newId, latex: "" }]);
            }

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
        updateCalculator(computed.id!, newLatex);
    };

    useEffect(() => {
        setWasEmpty(computed.latex === "");
    }, [computed.latex]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.3,
                exit: { duration: 0 },
            }}
            className="flex flex-col sm:flex-row gap-4 items-center"
            onClick={() => setSelectedId(computed.id!)}
        >
            <MathInput
                id={computed.id!}
                latex={computed.latex}
                isSelected={isSelected}
                onLatexChange={handleLatexChange}
                onKeyDown={handleKeyDown}
            />
            <Result {...computed} />
        </motion.div>
    );
}
