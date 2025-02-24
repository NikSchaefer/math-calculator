import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="p-4 w-full min-h-screen flex justify-center items-center flex-col">
            <div className="content text-center">
                <h1 className="font-bold mb-4">404</h1>
                <p className="text-lg text-muted-foreground mb-6">
                    This page doesn&apos;t exist.
                </p>
                <Link href="/">
                    <Button>Return to calculator</Button>
                </Link>
            </div>
        </main>
    );
}
