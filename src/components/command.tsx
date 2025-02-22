"use client";

import * as React from "react";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { useCalculator } from "@/app/context";
import { formulas } from "@/data/formulas";

export function CommandMenu() {
    const {
        calculators,
        setCalculators,
        resetCalculator,
        exportCalculations,
        open,
        setOpen,
    } = useCalculator();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(!open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [open, setOpen]);

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <Command>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Formulas">
                        {formulas.map((preset) => (
                            <CommandItem
                                className="flex justify-between items-center"
                                key={preset.id}
                                onSelect={() => {
                                    setOpen(false);
                                    // if the previous calculator is empty, replace that calculator with the latex
                                    const length = calculators.length;
                                    if (calculators[length - 1].latex === "") {
                                        setCalculators([
                                            ...calculators.slice(0, length - 1),
                                            {
                                                ...calculators[length - 1],
                                                latex: preset.calculators[0]
                                                    .latex,
                                            },
                                            ...preset.calculators.slice(1),
                                        ]);
                                    } else {
                                        setCalculators([
                                            ...calculators,
                                            ...preset.calculators,
                                        ]);
                                    }
                                }}
                            >
                                <span>{preset.name}</span>
                                <span className="text-muted-foreground">
                                    {preset.calculators[0].preview}
                                </span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandGroup heading="Quick Actions">
                        <CommandItem
                            onSelect={() => {
                                setOpen(false);
                                resetCalculator();
                            }}
                        >
                            Clear (Reset)
                        </CommandItem>
                        <CommandItem
                            onSelect={() => {
                                setOpen(false);
                                exportCalculations();
                            }}
                        >
                            Export
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </CommandDialog>
    );
}
