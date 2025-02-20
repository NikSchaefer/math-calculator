"use client";

import { CalculatorField } from "@/components/calculator";
import { useEffect, useState } from "react";
import { addStyles } from "react-mathquill";
import { AnimatePresence, motion } from "framer-motion";
import { CommandMenu } from "@/components/command";

export default function Home() {
    const [ids, setIds] = useState<string[]>(["1"]);
    const [selectedId, setSelectedId] = useState<string>("1");

    useEffect(() => {
        addStyles();
    }, []);

    // Add keyboard event listener
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                const newId = String(Date.now());
                setIds((prev) => [...prev, newId]);
                setSelectedId(newId);
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);

    return (
        <div className="p-4 relative w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center flex-col">
            <CommandMenu />
            <motion.h1
                className="text-4xl font-bold mb-8 text-blue-800"
                layout
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
                Math Calculator
            </motion.h1>
            <motion.div
                className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-6 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                layout
            >
                <AnimatePresence mode="sync" initial={false}>
                    {ids.map((id) => (
                        <CalculatorField
                            key={id}
                            id={id}
                            isSelected={id === selectedId}
                            onSelect={() => setSelectedId(id)}
                            deleteCalculatorField={() => {
                                if (ids.length > 1) {
                                    const index = ids.indexOf(id);
                                    setIds((prev) =>
                                        prev.filter((i) => i !== id)
                                    );
                                    setSelectedId(ids[index - 1]);
                                }
                            }}
                        />
                    ))}
                </AnimatePresence>
                <div className="mt-4 text-sm text-gray-500 text-center">
                    Press Cmd+K to get started
                </div>
            </motion.div>
            <div className="absolute bottom-4 left-4">
                <p className="text-sm text-gray-500">Made with ❤️</p>
            </div>
        </div>
    );
}
