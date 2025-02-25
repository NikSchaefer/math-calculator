"use client";

import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useMemo,
    useCallback,
} from "react";
import {
    Calculator,
    ComputedCalculator,
    Context,
    Preset,
    PresetVariable,
} from "@/types";
import { toast } from "sonner";
import { generateId } from "@/lib/utils";
import { computeCalculator } from "@/components/calculator/calculate";
import { constants } from "@/data/constants";
import math from "@/tex-parser/customMath";

interface CalculatorContextType {
    calculators: Calculator[];
    setCalculators: (calculators: Calculator[]) => void;
    computedCalculators: ComputedCalculator[];
    selectedId: string;
    setSelectedId: (id: string) => void;
    updateCalculator: (id: string, latex: string) => void;
    deleteCalculator: (id: string) => void;
    exportCalculations: () => void;
    resetCalculator: () => void;
    angleMode: "deg" | "rad";
    setAngleMode: (mode: "deg" | "rad") => void;
    commandOpen: boolean;
    setCommandOpen: (open: boolean) => void;
    onUseItem: (item: Preset | PresetVariable | null) => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(
    undefined
);

export function CalculatorProvider({ children }: { children: ReactNode }) {
    const [commandOpen, setCommandOpen] = useState(false);
    const [angleMode, setAngleMode] = useState<"deg" | "rad">("rad");

    const [selectedId, setSelectedId] = useState<string>(generateId());
    const [calculators, setCalculators] = useState<Calculator[]>([
        { id: selectedId, latex: "" },
    ]);

    // Two-pass calculation system
    const { computedCalculators, combinedContext } = useMemo(() => {
        // Set the math angle mode whenever it changes
        // @ts-expect-error this is a custom function
        math.setAngleMode(angleMode);

        // First pass: Calculate all expressions to identify variables
        const firstPass = calculators.map((c) => computeCalculator(c));
        const variables = firstPass
            .map((c) => c.variables)
            .flat()
            .filter(Boolean);

        const context = variables.reduce((acc, v) => {
            if (!v) return acc;

            // if the variable already exists, throw an error
            if (acc[v.id]) {
                throw new Error(`Variable ${v.id} already exists`);
            }
            acc[v.id] = v.value;
            return acc;
        }, {} as Context);

        // Combine context with our universal constants, with context taking precedence
        const combinedContext = {
            ...constants,
            ...context,
            ans: 7,
        };

        // Second pass: Recalculate with known variables
        const computedCalculators = calculators.map((c) =>
            computeCalculator(c, combinedContext)
        );

        return { computedCalculators, combinedContext };
    }, [calculators, angleMode]);

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

        if (index > 0) {
            setSelectedId(calculators[index - 1].id!);
        } else {
            setSelectedId(calculators[index + 1].id!);
        }
    };

    const exportCalculations = () => {
        toast.success(JSON.stringify(calculators));
    };

    function resetCalculator() {
        const firstId = calculators[0].id;
        setCalculators([{ id: firstId, latex: "" }]);
        setSelectedId(firstId!);
    }

    const onUseItem = useCallback(
        (item: Preset | PresetVariable | null) => {
            setCommandOpen(false);
            if (!item) return;
            // handle presets
            if ("calculators" in item) {
                const calculatorsToAdd = item.calculators;

                // If the input variables are not found in the variables array, create them on a single line
                const inputVariablesNotInVariables = item.inputVariables.filter(
                    (v: string) =>
                        !Object.keys(combinedContext).find((key) => v === key)
                );

                if (inputVariablesNotInVariables.length > 0) {
                    calculatorsToAdd.unshift({
                        id: generateId(),
                        latex: inputVariablesNotInVariables
                            .map((v) => `${v} = 1`)
                            .join(",\\ "),
                    });
                }

                // Add ids to the calculators
                calculatorsToAdd.forEach((c) => {
                    c.id = generateId();
                });

                // if the previous calculator is empty, replace that calculator with the new preset
                const length = calculators.length;
                const isPreviousCalculatorEmpty =
                    calculators[length - 1].latex === "";

                if (isPreviousCalculatorEmpty) {
                    return setCalculators([
                        ...calculators.slice(0, length - 1),
                        {
                            ...calculators[length - 1],
                            latex: item.calculators[0].latex,
                        },
                        ...item.calculators.slice(1),
                    ]);
                }

                return setCalculators([...calculators, ...item.calculators]);
            }

            // handle variables
            setCalculators([
                ...calculators,
                {
                    id: generateId(),
                    latex: item.variable,
                },
            ]);
        },
        [setCommandOpen, calculators, setCalculators, combinedContext]
    );

    return (
        <CalculatorContext.Provider
            value={{
                calculators,
                setCalculators,
                selectedId,
                setSelectedId,
                computedCalculators,
                updateCalculator,
                deleteCalculator,
                exportCalculations,
                resetCalculator,
                commandOpen,
                setCommandOpen,
                angleMode,
                setAngleMode,
                onUseItem,
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
