import { MathField, EditableMathField } from "react-mathquill";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

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
                mathquillDidMount={(mathField) => {
                    mathFieldRef.current = mathField;
                }}
                id={id}
                className="w-full p-4 text-2xl bg-gray-50 rounded-xl transition-all duration-200 hover:bg-gray-100 focus:bg-white"
                aria-label="Math equation input"
                latex={latex}
                onKeyDown={onKeyDown}
                onChange={onLatexChange}
                config={{
                    autoCommands: "pi theta sqrt sum phi int",
                    autoOperatorNames: "sin cos tan",
                }}
            />
        </motion.div>
    );
}
