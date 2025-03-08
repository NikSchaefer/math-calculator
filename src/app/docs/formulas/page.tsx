"use client";

import { formulas } from "@/data/formulas";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Markdown from "react-markdown";

export default function FormulasPage() {
    const formulasByCategory = formulas.reduce((acc, formula) => {
        formula.categories.forEach((category) => {
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(formula);
        });
        return acc;
    }, {} as Record<string, typeof formulas>);

    const sortedCategories = Object.keys(formulasByCategory).sort();

    return (
        <main className="p-4 pt-16 pb-32 w-full min-h-screen">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="flex justify-start">
                    <Link href="/docs">
                        <Button variant="ghost" className="mb-8">
                            ← Back to Docs
                        </Button>
                    </Link>
                </div>
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold">Formulas</h1>
                    <p className="text-lg text-muted-foreground">
                        Browse all available formulas and equations
                    </p>
                </div>

                <div className="space-y-8">
                    {sortedCategories.map((category) => (
                        <div key={category} className="space-y-4">
                            <h3 className="text-xl font-medium capitalize">
                                {category}
                            </h3>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {formulasByCategory[category].map((formula) => (
                                    <div
                                        key={formula.name}
                                        className="border bg-white rounded-lg p-4 space-y-2"
                                    >
                                        <h4 className="font-medium">
                                            {formula.name}
                                        </h4>
                                        <div className="text-sm text-foreground whitespace-pre-wrap">
                                            <Markdown>
                                                {formula.description}
                                            </Markdown>
                                        </div>
                                        <div className="pt-2">
                                            <code className="bg-muted px-2 py-1 rounded text-sm">
                                                {formula.calculators[0].preview}
                                            </code>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="py-8 flex justify-center gap-4">
                    <Link href="/docs">
                        <Button variant="outline">Back to Docs</Button>
                    </Link>
                    <Link href="/">
                        <Button variant="outline">Return to Calculator</Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
