"use client";

import { Calculator } from "@/components/calculator";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CommandMenu } from "@/components/command";
import { useCalculator } from "./context";
import { Header } from "./_content/header";
import { CalculatorControls } from "./_content/controls";

export default function Home() {
    const { computedCalculators, resetCalculator, angleMode, setAngleMode } =
        useCalculator();

    useEffect(() => {
        import("react-mathquill").then((mathquill) => {
            mathquill.addStyles();
        });
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "j" && (event.metaKey || event.ctrlKey)) {
                resetCalculator();
            }
            if (event.key === "u" && (event.metaKey || event.ctrlKey)) {
                setAngleMode(angleMode === "deg" ? "rad" : "deg");
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [resetCalculator, angleMode, setAngleMode]);

    return (
        <motion.main
            className="p-4 w-full min-h-screen flex justify-center items-center flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <CommandMenu />
            <div className="content w-full max-w-2xl">
                <Header />

                <motion.p
                    className="text-lg text-muted-foreground mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                >
                    A formula, command, and constant-enabled calculator.
                </motion.p>

                <motion.div
                    className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-6"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    layout
                >
                    <AnimatePresence mode="sync" initial={false}>
                        {computedCalculators.map((calculator) => (
                            <Calculator
                                key={calculator.id}
                                calculator={calculator}
                            />
                        ))}
                    </AnimatePresence>

                    <CalculatorControls />
                </motion.div>

                <motion.div
                    className="line"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                />
            </div>
        </motion.main>
    );
}
