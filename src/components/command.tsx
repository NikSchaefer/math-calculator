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
import { useEffect } from "react";

export function CommandMenu() {
    const {
        calculators,
        setCalculators,
        resetCalculator,
        exportCalculations,
        commandOpen,
        setCommandOpen,
    } = useCalculator();

    const [selectedId, setSelectedId] = React.useState("");
    const [search, setSearch] = React.useState("");
    const [showInfo, setShowInfo] = React.useState(false);

    const selectedItem =
        [...formulas, ...constantsAsArray].find(
            (item) => item.id === selectedId
        ) || null;

    function onSelectItem(item: Preset | Variable) {
        setSelectedId(item.id);
        setShowInfo(true);
    }

    function onUseItem(item: Preset | Variable | null) {
        setCommandOpen(false);
        if (!item) return;
        if ("calculators" in item) {
            onSelectPreset(item as Preset);
        } else {
            onSelectConstant(item as Variable);
        }
    }

    function onSelectPreset(preset: Preset) {
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
        setCalculators([
            ...calculators,
            {
                id: generateId(),
                latex: constant.name,
            },
        ]);
    }

    function onKeyDown(e: React.KeyboardEvent<Element> | KeyboardEvent) {
        // if the user presses enter and the command is open, show the info view
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            if (showInfo) {
                setShowInfo(false);
            }
        }
        // if the user presses escape, close the command or go back
        if (e.key === "Escape") {
            e.preventDefault();
            e.stopPropagation();

            if (showInfo) {
                setShowInfo(false);
                return;
            }

            if (search.trim() !== "") {
                setSearch("");
                return;
            }

            setCommandOpen(false);
        }

        // if the user presses enter and the command is open, use the item, and meta key or control key
        if (e.key === "Enter" && !showInfo && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            onUseItem(selectedItem);
            setCommandOpen(false);
        }

        // if the user presses enter and the info view is open, use the item
        if (e.key === "Enter" && showInfo) {
            e.preventDefault();
            onUseItem(selectedItem);
            setShowInfo(false);
            setCommandOpen(false);
        }
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setCommandOpen(!commandOpen);
                setShowInfo(false); // Reset info view when closing
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [commandOpen, setCommandOpen, showInfo]);

    return (
        <CommandDialog
            open={commandOpen}
            onOpenChange={setCommandOpen}
            onKeyDown={onKeyDown}
        >
            <Command
                value={selectedId}
                onValueChange={setSelectedId}
                // onKeyDown={onKeyDown}
            >
                {!showInfo ? (
                    <CommandListView
                        onSelectItem={onSelectItem}
                        resetCalculator={resetCalculator}
                        exportCalculations={exportCalculations}
                        setCommandOpen={setCommandOpen}
                        search={search}
                        setSearch={setSearch}
                    />
                ) : (
                    <InfoView selectedItem={selectedItem} />
                )}
                <CommandFooter
                    showInfo={showInfo}
                    onUseItem={() => onUseItem(selectedItem)}
                    setShowInfo={setShowInfo}
                />
            </Command>
        </CommandDialog>
    );
}

function CommandListView({
    onSelectItem,
    resetCalculator,
    exportCalculations,
    setCommandOpen,
    search,
    setSearch,
}: {
    onSelectItem: (item: Preset | Variable) => void;
    resetCalculator: () => void;
    exportCalculations: () => void;
    setCommandOpen: (open: boolean) => void;
    search: string;
    setSearch: (search: string) => void;
}) {
    return (
        <>
            <CommandInput
                placeholder="Type a command or search..."
                value={search}
                onValueChange={setSearch}
            />
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
                <CommandGroup heading="Formulae">
                    {formulas.map((preset) => (
                        <CommandItem
                            value={preset.id}
                            keywords={[preset.name]}
                            className="flex justify-between items-center"
                            key={preset.id}
                            onSelect={() => onSelectItem(preset)}
                            onClick={() => onSelectItem(preset)}
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
                            value={constant.id}
                            key={constant.id}
                            keywords={[constant.id, constant.name]}
                            className="flex justify-between items-center"
                            onSelect={() => onSelectItem(constant)}
                            onClick={() => onSelectItem(constant)}
                        >
                            <span className="flex items-center gap-2">
                                <SquareAsterisk className="w-4 h-4" />
                                {constant.id}
                            </span>
                            <span className="text-muted-foreground">
                                {formatNumberResult(constant.value as number)}
                            </span>
                        </CommandItem>
                    ))}
                </CommandGroup>
                <CommandGroup heading="Actions">
                    <CommandItem
                        value="reset"
                        onSelect={() => {
                            setCommandOpen(false);
                            resetCalculator();
                        }}
                        onClick={() => {
                            setCommandOpen(false);
                            resetCalculator();
                        }}
                    >
                        <SquareCode className="w-4 h-4 mr-2" />
                        Clear
                    </CommandItem>
                    <CommandItem
                        value="export"
                        onSelect={() => {
                            setCommandOpen(false);
                            exportCalculations();
                        }}
                        onClick={() => {
                            setCommandOpen(false);
                            exportCalculations();
                        }}
                    >
                        <SquareCode className="w-4 h-4 mr-2" />
                        Export
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </>
    );
}

function InfoView({
    selectedItem,
}: {
    selectedItem: Preset | Variable | null;
}) {
    if (!selectedItem) {
        return null;
    }
    if ("calculators" in selectedItem) {
        return (
            <div className="p-6">
                <div className="space-y-3">
                    <h3 className="font-bold text-lg">
                        {selectedItem?.name || selectedItem?.id}
                    </h3>
                    <p className="text-muted-foreground">
                        {selectedItem?.description}
                    </p>
                    <div className="mt-4">
                        <h4 className="font-semibold mb-2">Formula:</h4>
                        <pre className="bg-muted p-2 rounded break-words whitespace-pre-wrap">
                            {selectedItem?.calculators[0].preview}
                        </pre>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="p-6">
            <div className="space-y-3">
                <h3 className="font-bold text-lg">
                    {selectedItem?.name} - {selectedItem?.id}
                </h3>
                <p className="text-muted-foreground">
                    {selectedItem?.description}
                </p>
                <div className="mt-4 overflow-hidden">
                    <pre className="bg-muted p-2 rounded break-words whitespace-pre-wrap">
                        {formatNumberResult(selectedItem?.value as number)}
                    </pre>
                </div>
            </div>
        </div>
    );
}

function CommandFooter({
    showInfo,
    onUseItem,
    setShowInfo,
}: {
    showInfo: boolean;
    onUseItem: () => void;
    setShowInfo: (show: boolean) => void;
}) {
    if (!showInfo) {
        return (
            <div className="flex gap-2 border-t items-center justify-end mt-4 p-3">
                <button className="flex items-center gap-2 text-xs">
                    Learn More
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-lg pb-1">↵</span>
                    </kbd>
                </button>
                <div className="h-3 w-px bg-slate-300" />
                <button className="flex items-center text-xs text-muted-foreground">
                    Use Formula
                    <kbd className="ml-2 mr-0.5 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-base">⌘</span>
                    </kbd>
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-lg pb-1">↵</span>
                    </kbd>
                </button>
            </div>
        );
    }

    return (
        <div className="flex gap-2 border-t items-center justify-end mt-4 p-3">
            <button
                className="flex items-center gap-2 text-xs"
                onClick={onUseItem}
            >
                Use Formula
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-lg pb-1">↵</span>
                </kbd>
            </button>
            <div className="h-3 w-px bg-slate-300" />
            <button
                className="flex items-center text-xs text-muted-foreground"
                onClick={() => setShowInfo(false)}
            >
                Back
                <kbd className="ml-2 mr-0.5 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">Esc</span>
                </kbd>
            </button>
        </div>
    );
}
