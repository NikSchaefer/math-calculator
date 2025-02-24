import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useCalculator } from "../context";

export function CalculatorControls() {
    const { setCommandOpen, resetCalculator, angleMode, setAngleMode } =
        useCalculator();
    return (
        <motion.div
            className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-y-2 sm:gap-y-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.4 }}
        >
            <div className="text-sm text-gray-500">
                Press{" "}
                <button onClick={() => setCommandOpen(true)}>
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </button>{" "}
                to get started
            </div>
            <div className="flex items-center gap-x-1 w-full sm:w-auto justify-end">
                <Button
                    variant="ghost"
                    size="highlight"
                    className="font-normal w-fit text-sm sm:text-base"
                    onClick={resetCalculator}
                >
                    Clear All
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">⌘</span>J
                    </kbd>
                </Button>
                <hr className="w-px h-3 bg-gray-300 hidden sm:block" />
                <Button
                    variant="ghost"
                    size="highlight"
                    className="font-normal w-fit text-sm sm:text-base"
                    onClick={() =>
                        setAngleMode(angleMode === "deg" ? "rad" : "deg")
                    }
                >
                    {angleMode === "deg" ? "DEG (°)" : "RAD (π)"}
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">⌘</span>U
                    </kbd>
                </Button>
            </div>
        </motion.div>
    );
}
