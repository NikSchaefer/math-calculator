"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WhatIsThis() {
    return (
        <main className="p-4 w-full min-h-screen flex justify-center items-center">
            <div className="max-w-2xl w-full space-y-4">
                <h1 className="text-4xl font-bold">What is this?</h1>

                <p className="text-lg text-muted-foreground">
                    This is a beautiful, keyboard-first, modern calculator
                    designed for developers and power users. It combines the
                    simplicity of a standard calculator with powerful features
                    like:
                </p>

                <ul className="space-y-2 my-4 list-decimal list-inside">
                    <li>Formula evaluation with mathematical expressions</li>
                    <li>Built in set of formulas, commands, and constants</li>
                    <li>Handles complex mathematical expressions</li>
                    <li>Supports vector and matrix operations</li>
                    <li>Includes trigonometry functions in both rad/deg</li>
                    <li>Variable support with context aware variable values</li>
                    <li>Keyboard first support for quick calculations</li>
                    <li>Fraction support for precise answers</li>
                </ul>

                <p className="mt-8">
                    Built with React, TypeScript, and Framer Motion for smooth
                    animations. Open source and ready for your calculations.
                </p>

                <p className="mt-4">
                    Get started by trying some calculations, or check out our{" "}
                    <Link href="/how-do-i" className="underline">
                        how do I...?
                    </Link>{" "}
                    for more information.
                </p>

                <Link href="/">
                    <Button variant="outline">← Back to calculator</Button>
                </Link>
            </div>
        </main>
    );
}
