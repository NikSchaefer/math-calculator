import { useCalculator } from "@/app/context";
import {
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../ui/command";
import { constantsAsArray } from "@/data/constants";
import { formulas } from "@/data/formulas";
import { SquareFunction, SquareAsterisk, SquareCode } from "lucide-react";
import { formatNumberResult } from "../calculator/format-utils";
import { Preset, Variable } from "@/types";
export default function CommandListView({
    search,
    setSearch,
    onSelectItem,
}: {
    search: string;
    setSearch: (search: string) => void;
    onSelectItem: (item: Preset | Variable) => void;
}) {
    const { resetCalculator, exportCalculations, setCommandOpen } =
        useCalculator();
    return (
        <>
            <CommandInput
                placeholder="Type a command or search..."
                value={search}
                onValueChange={setSearch}
            />
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList className="focus-visible:outline-none">
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
