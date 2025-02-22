import { EvalResult } from "@/types";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export function Result({ formattedResult, result, type }: EvalResult) {
    const [showCheck, setShowCheck] = useState(false);

    const handleCopy = () => {
        if (!result) return;

        const text = type === "number" ? result.toString() : formattedResult;

        navigator.clipboard.writeText(text);
        toast.success(`Copied to clipboard: ${text}`);

        setShowCheck(true);
        setTimeout(() => setShowCheck(false), 1300);
    };

    return (
        <motion.div
            className="flex items-center gap-4 p-0.5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
        >
            <span className="text-2xl text-gray-400">=</span>
            <div className="flex items-center gap-2">
                <motion.div
                    key={formattedResult}
                    className="bg-blue-50 p-4 rounded-xl min-w-[120px] text-center relative group cursor-pointer hover:bg-blue-100 transition-colors"
                    initial={{ scale: 0.95, opacity: 0.7 }}
                    animate={{
                        scale: result ? 1 : 0.95,
                        opacity: result ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.2 }}
                    onClick={handleCopy}
                >
                    <span className="text-2xl font-semibold text-blue-800 whitespace-nowrap select-text">
                        {formattedResult || "-"}
                    </span>
                    {showCheck && (
                        <motion.div
                            className="absolute rounded-xl inset-0 w-full h-full flex items-center justify-center text-xs bg-green-50 backdrop-blur-[1px]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.svg
                                viewBox="0 0 24 24"
                                className="w-5 h-5 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={3}
                            >
                                <motion.path
                                    d="M4 12L10 18L20 6"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.svg>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
}
