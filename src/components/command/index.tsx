"use client";

import * as React from "react";

import { useCalculator } from "@/app/context";
import { formulas } from "@/data/formulas";
import { Preset, PresetVariable } from "@/types";
import { Command, CommandDialog } from "../ui/command";
import { constantsAsArray } from "@/data/constants";
import { useEffect } from "react";
import InfoView from "./info-view";
import CommandListView from "./list-view";
import CommandFooter from "./footer";

export function CommandMenu() {
  const { commandOpen, setCommandOpen, onUseItem } = useCalculator();

  const [selectedId, setSelectedId] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [showInfo, setShowInfo] = React.useState(false);

  const selectedItem =
    [...formulas, ...constantsAsArray].find(
      (item) => item.name === selectedId
    ) || null;

  function onSelectItem(item: Preset | PresetVariable) {
    setSelectedId(item.name);
    setShowInfo(true);
  }

  const onCommandKeyDown = React.useCallback(
    (e: React.KeyboardEvent<Element>) => {
      // Handle Command component specific key events first

      if (e.key === "Enter" && e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        onUseItem(selectedItem);
      }

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

  // Reset the info view whenever the command menu closes, regardless of how
  // it was closed (⌘K, Escape, or clicking outside).
  useEffect(() => {
    if (!commandOpen) setShowInfo(false);
  }, [commandOpen]);

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
