import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WhatIsThis() {
  return (
    <main className="min-h-screen content">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              ← Back to Calculator
            </Button>
          </Link>
        </div>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-light tracking-tight mb-4">
              Math Calculator
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A modern calculator reimagined for precision and elegance.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Features
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-muted-foreground mr-2">•</span>
                <span>Formula evaluation with mathematical expressions</span>
              </li>
              <li className="flex items-start">
                <span className="text-muted-foreground mr-2">•</span>
                <span>Built-in formulas, commands, and constants</span>
              </li>
              <li className="flex items-start">
                <span className="text-muted-foreground mr-2">•</span>
                <span>Complex mathematical expressions</span>
              </li>
              <li className="flex items-start">
                <span className="text-muted-foreground mr-2">•</span>
                <span>Vector and matrix operations</span>
              </li>
              <li className="flex items-start">
                <span className="text-muted-foreground mr-2">•</span>
                <span>Trigonometry in rad/deg</span>
              </li>
              <li className="flex items-start">
                <span className="text-muted-foreground mr-2">•</span>
                <span>Context-aware variables</span>
              </li>
              <li className="flex items-start">
                <span className="text-muted-foreground mr-2">•</span>
                <span>Keyboard-first workflow</span>
              </li>
              <li className="flex items-start">
                <span className="text-muted-foreground mr-2">•</span>
                <span>Precise fraction support</span>
              </li>
            </ul>
          </div>

          <p className="text-sm text-muted-foreground">
            Built with React, TypeScript, and Framer Motion
          </p>
        </div>
      </div>
    </main>
  );
}
