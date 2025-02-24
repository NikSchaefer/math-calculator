"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HowDoI() {
    return (
        <main className="p-4 py-32 w-full min-h-screen flex justify-center items-center">
            <div className="max-w-2xl w-full space-y-8 content">
                <h1 className="text-4xl font-bold">
                    How do I use Formula Pro?
                </h1>
                <p className="text-lg text-muted-foreground">
                    Formula Pro is a calculator that can handle a wide range of
                    mathematical operations. Here&apos;s a quick guide to get
                    you started.
                </p>

                <section className="space-y-4">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium mb-2">
                                Basic Operations
                            </h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>
                                    • Addition: <code>2 + 2</code>
                                </li>
                                <li>
                                    • Subtraction: <code>5 - 3</code>
                                </li>
                                <li>
                                    • Multiplication: <code>4 * 3</code> or{" "}
                                    <code>4(3)</code>
                                </li>
                                <li>
                                    • Division: <code>10 / 2</code>
                                </li>
                                <li>
                                    • Exponents: <code>2^3</code>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-2">
                                Special Functions
                            </h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>
                                    • Square root: <code>sqrt(16)</code>
                                </li>
                                <li>
                                    • nth root: <code>nthrt(8, 3)</code>
                                </li>
                                <li>
                                    • Trigonometry: <code>sin(pi/2)</code>,{" "}
                                    <code>cos(pi)</code>, <code>tan(pi/4)</code>
                                </li>
                                <li>
                                    • Logarithms: <code>log(100)</code>,{" "}
                                    <code>ln(e)</code>
                                </li>
                                <li>
                                    • Absolute value: <code>abs(-5)</code> or{" "}
                                    <code>|-5|</code>
                                </li>
                                <li>
                                    • Round: <code>round(3.14159)</code>.
                                    Specify a second argument to round to a
                                    specific decimal place. For example,{" "}
                                    <code>round(3.14159, 2)</code> rounds to 2
                                    decimal places.
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-2">
                                Variables
                            </h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>
                                    • Assignment: <code>x = 5</code>
                                </li>
                                <li>
                                    • Usage: <code>y = 2x + 3</code>
                                </li>
                                <li>
                                    • Multiple variables: <code>z = x + y</code>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-2">
                                Constants
                            </h3>
                            <ul className="space-y-2 mb-4 text-muted-foreground">
                                <li>
                                    • π (pi): <code>pi</code> or{" "}
                                    <code>\pi</code>
                                </li>
                                <li>
                                    • e (Euler&apos;s number): <code>e</code>
                                </li>
                            </ul>
                            <Link href="/docs" className="underline">
                                See all constants
                            </Link>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-2">
                                Vector Operations
                            </h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>
                                    • Create a vector: <code>[1, 2, 3]</code>
                                </li>
                                <li>
                                    • Statistical operations:
                                    <ul className="ml-4 space-y-2 mt-2">
                                        <li>
                                            - Mean:{" "}
                                            <code>mean([1, 2, 3, 4])</code> →
                                            2.5
                                        </li>
                                        <li>
                                            - Median:{" "}
                                            <code>median([1, 2, 3, 4])</code> →
                                            2.5
                                        </li>
                                        <li>
                                            - Standard deviation:{" "}
                                            <code>std([1, 2, 3, 4])</code> →
                                            1.29
                                        </li>
                                        <li>
                                            - Total:{" "}
                                            <code>total([1, 2, 3, 4])</code> →
                                            10
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    • Vector manipulations:
                                    <ul className="ml-4 space-y-2 mt-2">
                                        <li>
                                            - Length:{" "}
                                            <code>len([1, 2, 3, 4])</code> → 4
                                        </li>
                                        <li>
                                            - Sort:{" "}
                                            <code>sort([3, 1, 4, 2])</code> →
                                            [1, 2, 3, 4]
                                        </li>
                                        <li>
                                            - Dot product:{" "}
                                            <code>dot([1, 2], [3, 4])</code> →
                                            11
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2">
                                Advanced Input
                            </h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>
                                    • Matrices:{" "}
                                    <code>A = [[1, 2], [3, 4]]</code>
                                </li>
                                <li>
                                    • Complex numbers: <code>2 + 3i</code>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Tips & Tricks</h2>
                    <ul className="space-y-2 text-muted-foreground">
                        <li>• Results are automatically copied when clicked</li>
                        <li>
                            • Variables persist across calculations until
                            cleared
                        </li>
                        <li>• Press Enter to add a new calculation line</li>
                        <li>
                            • Use Tab and Shift+Tab to quickly navigate between
                            inputs
                        </li>
                    </ul>
                </section>

                <div className="pt-4">
                    <Link href="/">
                        <Button variant="outline">← Back to calculator</Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
