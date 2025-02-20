"use client";

import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
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

const existingVariables: Variable[] = [
    { id: "gravity", name: "g", value: 9.81 },
    { id: "avogadro", name: "N_A", value: 6.02214076e23 },
    { id: "speedOfLight", name: "c", value: 299792458 },
    { id: "planck", name: "h", value: 6.62607015e-34 },
    { id: "boltzmann", name: "k_B", value: 1.380649e-23 },
    { id: "electronCharge", name: "e", value: 1.602176634e-19 },
    { id: "electronMass", name: "m_e", value: 9.1093837015e-31 },
    { id: "protonMass", name: "m_p", value: 1.67262192369e-27 },
    { id: "neutronMass", name: "m_n", value: 1.67492749804e-27 },
];

const CalculatorContext = createContext<CalculatorContextType | undefined>(
    undefined
);

export function CalculatorProvider({ children }: { children: ReactNode }) {
    const [selectedId, setSelectedId] = useState<string>(generateId());
    const [variables, setVariables] = useState<Variable[]>(existingVariables);
    const [calculators, setCalculators] = useState<Calculator[]>([
        { id: selectedId, latex: "" },
    ]);
    const [open, setOpen] = useState(false);
    function addVariable(variable: Variable) {
        // Remove the variable if it already exists
        const removed = variables.filter((v) => v.id !== variable.id);
        setVariables([...removed, variable]);
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

    // Add keyboard event listener
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                const newId = generateId();
                setCalculators((prev) => [...prev, { id: newId, latex: "" }]);
                setSelectedId(newId);
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [open]);

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
