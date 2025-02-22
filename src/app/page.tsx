"use client";

import { Calculator } from "@/components/calculator";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CommandMenu } from "@/components/command";
import { useCalculator } from "./context";

export default function Home() {
    const { calculators } = useCalculator();

    useEffect(() => {
        // Dynamically import and add styles only on the client side
        import("react-mathquill").then((mathquill) => {
            mathquill.addStyles();
        });
    }, []);

    return (
        <div className="p-4 relative w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center flex-col">
            <CommandMenu />
            <motion.h1
                className="text-4xl font-bold mb-4 text-blue-800"
                layout
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
                Math Calculator
            </motion.h1>
            <motion.p className="text-lg text-muted-foreground mb-4">
                Math at the Speed of Thought
            </motion.p>
            <motion.div
                className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-6 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                layout
            >
                <AnimatePresence mode="sync" initial={false}>
                    {calculators.map((calculator) => (
                        <Calculator
                            key={calculator.id}
                            calculator={calculator}
                        />
                    ))}
                </AnimatePresence>
                <div className="mt-4 flex justify-center items-center">
                    <div className="text-sm text-gray-500">
                        Press Cmd+K to get started
                    </div>
                </div>
            </motion.div>
            <div className="absolute bottom-4 left-4">
                <p className="text-sm text-gray-500">Made with ❤️</p>
            </div>
        </div>
    );
}
