import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

interface CopyProps {
    text: string;
    children: React.ReactNode;
    className?: string;
}

export function Copy({ text, children, className }: CopyProps) {
    const [showCheck, setShowCheck] = useState(false);

    const handleCopy = () => {
        if (!text) return;

        navigator.clipboard.writeText(text);
        toast.success(`Copied to clipboard: ${text}`);

        setShowCheck(true);
        setTimeout(() => setShowCheck(false), 1300);
    };

    return (
        <motion.div
            className={className}
            onClick={handleCopy}
            initial={{ scale: 0.95, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
        >
            {children}
            {showCheck && (
                <motion.div
                    className="absolute rounded-xl inset-0 w-full h-full flex items-center justify-center text-xs bg-green-50 backdrop-blur-[1px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                    >
                        <motion.path
                            d="M4 12L10 18L20 6"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.svg>
                </motion.div>
            )}
        </motion.div>
    );
}
