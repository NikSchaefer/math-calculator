"use client";

import * as React from "react";

import { useCalculator } from "@/app/context";
import { formulas } from "@/data/formulas";
import { Preset, Variable } from "@/types";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command";
import { constantsAsArray } from "@/data/constants";
import { generateId } from "@/lib/utils";
import { formatNumberResult } from "./calculator/format-utils";
import { SquareAsterisk, SquareCode, SquareFunction } from "lucide-react";

export function CommandMenu() {
    const {
        calculators,
        setCalculators,
        resetCalculator,
        exportCalculations,
        commandOpen,
        setCommandOpen,
    } = useCalculator();

    function onSelectPreset(preset: Preset) {
        setCommandOpen(false);
        // if the previous calculator is empty, replace that calculator with the latex
        const length = calculators.length;
        if (calculators[length - 1].latex === "") {
            setCalculators([
                ...calculators.slice(0, length - 1),
                {
                    ...calculators[length - 1],
                    latex: preset.calculators[0].latex,
                },
                ...preset.calculators.slice(1),
            ]);
        } else {
            setCalculators([...calculators, ...preset.calculators]);
        }
    }

    function onSelectConstant(constant: Variable) {
        setCommandOpen(false);
        setCalculators([
            ...calculators,
            {
                id: generateId(),
                latex: constant.name,
            },
        ]);
    }

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setCommandOpen(!commandOpen);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [commandOpen, setCommandOpen]);

    return (
        <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
            <Command>
                <CommandInput placeholder="Type a command or search..." />
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandList>
                    <CommandGroup heading="Formulae">
                        {formulas.map((preset) => (
                            <CommandItem
                                className="flex justify-between items-center"
                                key={preset.id}
                                onSelect={() => onSelectPreset(preset)}
                            >
                                <span className="flex items-center gap-2">
                                    <SquareFunction className="w-4 h-4" />
                                    {preset.name}
                                </span>
                                <div className="text-muted-foreground flex justify-end flex-grow text-right">
                                    <p className="text-xs w-full truncate max-w-[200px]">
                                        {preset.calculators[0].preview}
                                    </p>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandGroup heading="Constants">
                        {constantsAsArray.map((constant) => (
                            <CommandItem
                                key={constant.id}
                                onSelect={() => onSelectConstant(constant)}
                                className="flex justify-between items-center"
                            >
                                <span className="flex items-center gap-2">
                                    <SquareAsterisk className="w-4 h-4" />
                                    {constant.id}
                                </span>
                                <span className="text-muted-foreground">
                                    {formatNumberResult(
                                        constant.value as number
                                    )}
                                </span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandGroup heading="Actions">
                        <CommandItem
                            onSelect={() => {
                                setCommandOpen(false);
                                resetCalculator();
                            }}
                        >
                            <SquareCode className="w-4 h-4 mr-2" />
                            Clear
                        </CommandItem>
                        <CommandItem
                            onSelect={() => {
                                setCommandOpen(false);
                                exportCalculations();
                            }}
                        >
                            <SquareCode className="w-4 h-4 mr-2" />
                            Export
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </CommandDialog>
    );
}
