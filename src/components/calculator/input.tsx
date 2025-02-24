"use client";

import dynamic from "next/dynamic";
import { MathField } from "react-mathquill";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

const EditableMathField = dynamic(
    () => import("react-mathquill").then((mod) => mod.EditableMathField),
    { ssr: false }
);

const autoOperatorNames = [
    "sin cos tan log sec csc arcsin arccos arctan mean median mode proj comp sort std nPr nCr len",
    "det cross proj comp norm inv",
];

interface MathInputProps {
    id: string;
    latex: string;
    isSelected: boolean;
    onLatexChange: (mathField: MathField) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
}

export function MathInput({
    id,
    latex,
    isSelected,
    onLatexChange,
    onKeyDown,
}: MathInputProps) {
    const mathFieldRef = useRef<MathField>(null);

    useEffect(() => {
        if (isSelected && mathFieldRef.current) {
            mathFieldRef.current.focus();
        }
    }, [isSelected]);

    return (
        <motion.div
            className="flex-grow w-full"
            animate={{
                scale: isSelected ? 1.02 : 1,
            }}
            transition={{ duration: 0.2 }}
        >
            <EditableMathField
                id={id}
                latex={latex}
                onKeyDown={onKeyDown}
                onChange={onLatexChange}
                mathquillDidMount={(mathField) => {
                    mathFieldRef.current = mathField;
                }}
                className="w-full p-4 text-2xl bg-gray-50 rounded-xl transition-all duration-200 hover:bg-gray-100 focus:bg-white"
                aria-label="Math equation input"
                config={{
                    autoCommands:
                        "pi theta sqrt sum phi int rho lambda alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu nu xi omicron pi rho sigma tau upsilon phi chi psi omega triangle square",
                    autoOperatorNames: autoOperatorNames.join(" "),
                    sumStartsWithNEquals: true,
                }}
            />
        </motion.div>
    );
}
