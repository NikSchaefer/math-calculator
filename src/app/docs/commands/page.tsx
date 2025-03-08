"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CommandsPage() {
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
                    <h1 className="text-4xl font-bold">Commands</h1>
                    <p className="text-lg text-muted-foreground">
                        Learn about available calculator commands
                    </p>
                </div>

                {/* Add commands content here once you have the commands data */}
                <div className="text-center text-muted-foreground">
                    Coming soon...
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
