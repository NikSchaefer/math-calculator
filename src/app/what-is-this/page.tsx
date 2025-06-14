import { Undo2 } from "lucide-react";
import Link from "next/link";

export default function WhatIsThis() {
  return (
    <div className="mx-auto content max-w-[692px] px-6 py-12 text-gray-1200 antialiased sm:py-32">
      <div className="relative">
        <Link
          href="/"
          className="text-foreground italic absolute top-0 left-0 flex items-center gap-2 -translate-x-48 mb-4"
        >
          <Undo2 className="w-4 h-4" /> Back to Calculator
        </Link>
      </div>
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-medium tracking-tight mb-4">
              Math Calculator
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              An opinionated and modern scientific calculator.
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
            Made with ❤️ by{" "}
            <a
              className="text-foreground underline hover:no-underline"
              href="https://nikschaefer.com"
              target="_blank"
            >
              Nik Schaefer
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
