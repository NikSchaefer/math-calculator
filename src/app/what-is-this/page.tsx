"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function WhatIsThis() {
    return (
        <motion.main
            className="p-4 w-full min-h-screen flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="max-w-2xl w-full space-y-8 content">
                <motion.h1
                    className="text-4xl font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    What is this?
                </motion.h1>

                <motion.div
                    className="prose prose-zinc dark:prose-invert"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <p className="text-lg text-muted-foreground">
                        This is a modern calculator designed for developers and
                        power users. It combines the simplicity of a standard
                        calculator with powerful features like:
                    </p>

                    <ul className="space-y-2 mt-4">
                        <li>
                            Formula evaluation with mathematical expressions
                        </li>
                        <li>Quick actions and commands (Press ⌘/Ctrl + K)</li>
                        <li>Support for constants and unit conversions</li>
                        <li>Toggle between radians and degrees (⌘/Ctrl + U)</li>
                        <li>
                            Multiple calculator instances (⌘/Ctrl + J to reset)
                        </li>
                    </ul>

                    <p className="mt-8">
                        Built with React, TypeScript, and Framer Motion for
                        smooth animations. Open source and ready for your
                        calculations.
                    </p>
                </motion.div>

                <motion.div
                    className="inline-block mt-8 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    <Link href="/">← Back to calculator</Link>
                </motion.div>
            </div>
        </motion.main>
    );
}
