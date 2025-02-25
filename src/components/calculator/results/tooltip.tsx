import {
    Tooltip,
    TooltipTrigger,
    TooltipProvider,
    TooltipContent,
} from "@/components/ui/tooltip";

interface ArrayTooltipProps {
    formattedResult: string;
    fullArrayDisplay: string;
}

export function ArrayTooltip({
    formattedResult,
    fullArrayDisplay,
}: ArrayTooltipProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div>{formattedResult}</div>
                </TooltipTrigger>
                <TooltipContent
                    side="top"
                    className="max-w-[400px] max-h-[300px] overflow-y-auto"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className="text-sm">[{fullArrayDisplay}]</div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
