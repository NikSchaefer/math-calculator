"use client";

import { Calculator } from "@/components/calculator";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CommandMenu } from "@/components/command";
import { useCalculator } from "./context";
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
      className="p-4 sm:p-4 w-full min-h-screen flex justify-center items-center flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <CommandMenu />
      <div className="content w-full max-w-2xl text-center px-2 sm:px-0 pb-40">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2 text-blue-800"
        >
          Math Calculator
        </motion.h1>

        <motion.p
          className="text-sm sm:text-lg text-muted-foreground mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          A formula, actions, and constant-enabled calculator.
        </motion.p>

        <motion.div
          className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-3 sm:p-6 text-left"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          layout
        >
          <AnimatePresence mode="sync" initial={false}>
            {computedCalculators.map((calculator) => (
              <Calculator key={calculator.id} calculator={calculator} />
            ))}
          </AnimatePresence>

          <CalculatorControls />
        </motion.div>
      </div>
    </motion.main>
  );
}
