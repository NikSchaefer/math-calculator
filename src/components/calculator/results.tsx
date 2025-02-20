import { motion } from "framer-motion";

export function Result({ result }: { result: string }) {
    return (
        <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
        >
            <span className="text-2xl text-gray-400">=</span>
            <motion.div
                key={result}
                className="bg-blue-50 p-4 rounded-xl min-w-[120px] text-center"
                initial={{ scale: 0.95, opacity: 0.7 }}
                animate={{
                    scale: result ? 1 : 0.95,
                    opacity: result ? 1 : 0.7,
                }}
                transition={{ duration: 0.2 }}
            >
                <span className="text-2xl font-semibold text-blue-800 whitespace-nowrap">
                    {result || "-"}
                </span>
            </motion.div>
        </motion.div>
    );
}
