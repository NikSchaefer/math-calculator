"use client";

import { Calculator } from "@/components/calculator";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CommandMenu } from "@/components/command";
import { useCalculator } from "./context";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    const { computedCalculators, resetCalculator } = useCalculator();

    useEffect(() => {
        // Dynamically import and add styles only on the client side
        import("react-mathquill").then((mathquill) => {
            mathquill.addStyles();
        });
    }, []);

    return (
        <motion.main
            className="p-4 relative w-full min-h-screen flex justify-center items-center flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="content w-full max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                >
                    <CommandMenu />
                </motion.div>
                <motion.div
                    className="flex justify-between items-center mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                >
                    <span className="text-xs w-fit text-muted-foreground bg-muted px-2 py-1 rounded-sm">
                        v1.0.8
                    </span>
                </motion.div>
                <div className="flex items-center justify-between">
                    <motion.h1
                        className="text-4xl font-bold mb-2 text-blue-800"
                        layout
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        Formula Pro
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        <Link href="https://github.com/nikschaefer">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="hover:scale-105 transition-transform"
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7 0.175049C3.128 0.175049 0 3.30305 0 7.17505C0 10.259 2.013 12.885 4.79 13.825C5.14 13.891 5.272 13.672 5.272 13.497V12.316C3.325 12.731 2.909 11.375 2.909 11.375C2.581 10.565 2.122 10.347 2.122 10.347C1.488 9.90905 2.166 9.93105 2.166 9.93105C2.866 9.97505 3.237 10.653 3.237 10.653C3.872 11.725 4.878 11.419 5.272 11.243C5.338 10.784 5.512 10.478 5.709 10.303C4.156 10.128 2.516 9.51605 2.516 6.84705C2.516 6.08105 2.778 5.46905 3.237 4.96605C3.172 4.79105 2.931 4.06905 3.303 3.10605C3.303 3.10605 3.893 2.90905 5.228 3.82805C5.79831 3.67179 6.38668 3.5911 6.978 3.58805C7.568 3.58805 8.181 3.67505 8.728 3.82805C10.063 2.93105 10.653 3.10605 10.653 3.10605C11.025 4.06905 10.784 4.79105 10.719 4.96605C11.179 5.44605 11.441 6.08105 11.441 6.84605C11.441 9.53705 9.8 10.128 8.247 10.303C8.487 10.522 8.728 10.937 8.728 11.593V13.519C8.728 13.716 8.859 13.934 9.209 13.847C11.988 12.884 14 10.259 14 7.17505C14 3.30305 10.872 0.175049 7 0.175049V0.175049Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                nikschaefer/formula-pro
                            </Button>
                        </Link>
                    </motion.div>
                </div>
                <motion.p
                    className="text-lg text-muted-foreground mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                >
                    A formula, action, and constant-enabled calculator.
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
                    <motion.div
                        className="mt-4 flex justify-between items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.4 }}
                    >
                        <div className="text-sm text-gray-500">
                            Press{" "}
                            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                <span className="text-xs">⌘</span>K
                            </kbd>{" "}
                            to get started
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="font-normal"
                            onClick={resetCalculator}
                        >
                            Clear all
                        </Button>
                    </motion.div>
                </motion.div>
                <motion.div
                    className="line"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                />
                <motion.div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                >
                    <p className="text-sm text-gray-500">Made with ❤️</p>
                </motion.div>
            </div>
        </motion.main>
    );
}
