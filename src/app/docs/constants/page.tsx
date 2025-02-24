"use client";

import { constantsAsArray } from "@/data/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatResult } from "@/components/calculator/format-utils";
import Markdown from "react-markdown";

export default function ConstantsPage() {
    return (
        <main className="p-4 pt-16 pb-32 w-full min-h-screen">
            <div className="content max-w-4xl mx-auto space-y-12">
                <div className="flex justify-start">
                    <Link href="/docs">
                        <Button variant="ghost" className="mb-8">
                            ← Back to Docs
                        </Button>
                    </Link>
                </div>
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold">Constants</h1>
                    <p className="text-lg text-muted-foreground">
                        View all mathematical and physical constants
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {constantsAsArray.map((constant) => (
                        <div
                            key={constant.name}
                            className="border bg-white rounded-lg p-4 space-y-2"
                        >
                            <h4 className="font-medium">{constant.name}</h4>
                            <div className="text-sm text-foreground">
                                <Markdown>{constant.description}</Markdown>
                            </div>
                            <div className="pt-2 flex items-center gap-2">
                                <code className="bg-muted px-2 py-1 rounded text-sm">
                                    {constant.variable}
                                </code>
                                <span className="text-sm text-muted-foreground">
                                    = {formatResult(constant.value)}
                                </span>
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
