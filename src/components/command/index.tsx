"use client";

import * as React from "react";

import { useCalculator } from "@/app/context";
import { formulas } from "@/data/formulas";
import { Preset, Variable } from "@/types";
import { Command, CommandDialog } from "../ui/command";
import { constantsAsArray } from "@/data/constants";
import { generateId } from "@/lib/utils";
import { useEffect } from "react";
import InfoView from "./info-view";
import CommandListView from "./list-view";
import CommandFooter from "./footer";

export function CommandMenu() {
    const { calculators, setCalculators, commandOpen, setCommandOpen } =
        useCalculator();

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

    const onUseItem = React.useCallback(
        (item: Preset | Variable | null) => {
            setCommandOpen(false);
            if (!item) return;
            if ("calculators" in item) {
                // if the previous calculator is empty, replace that calculator with the latex
                const length = calculators.length;
                if (calculators[length - 1].latex === "") {
                    setCalculators([
                        ...calculators.slice(0, length - 1),
                        {
                            ...calculators[length - 1],
                            latex: item.calculators[0].latex,
                        },
                        ...item.calculators.slice(1),
                    ]);
                } else {
                    setCalculators([...calculators, ...item.calculators]);
                }
            } else {
                setCalculators([
                    ...calculators,
                    {
                        id: generateId(),
                        latex: item.name,
                    },
                ]);
            }
        },
        [setCommandOpen, calculators, setCalculators]
    );

    const onCommandKeyDown = React.useCallback(
        (e: React.KeyboardEvent<Element>) => {
            // Handle Command component specific key events first
            if (e.key === "Enter" && showInfo) {
                onUseItem(selectedItem);
            }
        },
        [onUseItem, showInfo, selectedItem]
    );

    const onKeyDown = React.useCallback(
        (e: React.KeyboardEvent<Element> | KeyboardEvent) => {
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
        },
        [setCommandOpen, showInfo, search]
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const hasCommandKey = e.metaKey || e.ctrlKey;
            if (e.key === "k" && hasCommandKey) {
                e.preventDefault();
                setCommandOpen(!commandOpen);
                setShowInfo(false); // Reset info view when closing
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [commandOpen, onUseItem, selectedItem, setCommandOpen, showInfo]);

    return (
        <CommandDialog
            open={commandOpen}
            onOpenChange={setCommandOpen}
            onKeyDown={onKeyDown}
        >
            <Command
                value={selectedId}
                onValueChange={setSelectedId}
                onKeyDown={onCommandKeyDown}
            >
                {!showInfo ? (
                    <CommandListView
                        onSelectItem={onSelectItem}
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
