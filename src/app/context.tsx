"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Calculator, Variable } from "@/types";
import { toast } from "sonner";
import { generateId } from "@/lib/utils";

interface CalculatorContextType {
    calculators: Calculator[];
    setCalculators: (calculators: Calculator[]) => void;
    selectedId: string;
    setSelectedId: (id: string) => void;
    variables: Variable[];
    setVariables: (
        variables: Variable[] | ((prev: Variable[]) => Variable[])
    ) => void;
    addVariable: (variable: Variable) => void;
    updateCalculator: (id: string, latex: string) => void;
    deleteCalculator: (id: string) => void;
    exportCalculations: () => void;
    resetCalculator: () => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(
    undefined
);

export function CalculatorProvider({ children }: { children: ReactNode }) {
    const [selectedId, setSelectedId] = useState<string>(generateId());
    const [variables, setVariables] = useState<Variable[]>([]);
    const [calculators, setCalculators] = useState<Calculator[]>([
        { id: selectedId, latex: "" },
    ]);
    const [open, setOpen] = useState(false);
    function addVariable(variable: Variable) {
        // Check if the variable already exists by ID and if it has a different value now
        const existingVariable = variables.find((v) => v.id === variable.id);
        if (existingVariable && existingVariable.value !== variable.value) {
            setVariables(
                variables.map((v) => (v.id === variable.id ? variable : v))
            );
        } else if (!existingVariable) {
            setVariables([...variables, variable]);
        }
    }

    const updateCalculator = (id: string, latex: string) => {
        setCalculators((prev) =>
            prev.map((c) => (c.id === id ? { ...c, latex } : c))
        );
    };

    const deleteCalculator = (id: string) => {
        if (calculators.length === 1) return;
        const index = calculators.findIndex((c) => c.id === id);
        setCalculators((prev) => [
            ...prev.slice(0, index),
            ...prev.slice(index + 1),
        ]);

        // Remove the variables that are no longer in the calculators
        const removed = variables.filter(
            (v) => !calculators.some((c) => c.id === v.id)
        );
        setVariables([...removed]);

        if (index > 0) {
            setSelectedId(calculators[index - 1].id);
        } else {
            setSelectedId(calculators[index + 1].id);
        }
    };

    const exportCalculations = () => {
        toast.success(JSON.stringify(calculators));
    };

    function resetCalculator() {
        setCalculators([{ id: generateId(), latex: "" }]);
        setSelectedId(generateId());
    }

    return (
        <CalculatorContext.Provider
            value={{
                calculators,
                setCalculators,
                selectedId,
                setSelectedId,
                variables,
                setVariables,
                addVariable,
                updateCalculator,
                deleteCalculator,
                exportCalculations,
                resetCalculator,
                open,
                setOpen,
            }}
        >
            {children}
        </CalculatorContext.Provider>
    );
}

export function useCalculator() {
    const context = useContext(CalculatorContext);
    if (context === undefined) {
        throw new Error(
            "useCalculator must be used within a CalculatorProvider"
        );
    }
    return context;
}
