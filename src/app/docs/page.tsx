"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DocsPage() {
    return (
        <main className="py-32 w-full min-h-screen">
            <div className="px-4 max-w-4xl mx-auto space-y-12">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold">Documentation</h1>
                    <p className="text-lg text-muted-foreground">
                        Browse all available formulas, commands, and constants
                        in Formula Pro
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                    <Link href="/docs/formulas">
                        <div className="border bg-white rounded-lg p-6 space-y-3 hover:border-primary transition-colors">
                            <h2 className="text-2xl font-semibold">Formulas</h2>
                            <p className="text-muted-foreground">
                                Browse all available formulas and equations
                            </p>
                        </div>
                    </Link>

                    <Link href="/docs/constants">
                        <div className="border bg-white rounded-lg p-6 space-y-3 hover:border-primary transition-colors">
                            <h2 className="text-2xl font-semibold">
                                Constants
                            </h2>
                            <p className="text-muted-foreground">
                                View all mathematical and physical constants
                            </p>
                        </div>
                    </Link>

                    <Link href="/docs/commands">
                        <div className="border bg-white rounded-lg p-6 space-y-3 hover:border-primary transition-colors">
                            <h2 className="text-2xl font-semibold">Commands</h2>
                            <p className="text-muted-foreground">
                                Learn about available calculator commands
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="py-8 flex justify-center">
                    <Link href="/">
                        <Button variant="outline">Return to Calculator</Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
