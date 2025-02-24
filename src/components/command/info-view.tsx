import { Preset, PresetVariable } from "@/types";
import { formatNumberResult } from "../calculator/format-utils";
import Markdown from "react-markdown";

export default function InfoView({
    selectedItem,
}: {
    selectedItem: Preset | PresetVariable | null;
}) {
    if (!selectedItem) {
        return null;
    }
    if ("calculators" in selectedItem) {
        return (
            <div className="p-6">
                <div className="space-y-3">
                    <h3 className="font-bold text-lg">{selectedItem?.name}</h3>

                    <Markdown>{selectedItem?.description}</Markdown>
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
                    {selectedItem?.name} - {selectedItem?.variable}
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
