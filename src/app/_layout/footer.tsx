"use client";

import { motion } from "motion/react";
import Link from "next/link";
export default function Footer() {
    return (
        <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-x-2 text-xs text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
        >
            <Link href="/what-is-this">What is this?</Link>
            <hr className="w-px h-3 bg-gray-300" />
            <Link href="/formulas">Formulas</Link>
            <hr className="w-px h-3 bg-gray-300" />
            <Link href="/constants">Constants</Link>
            <hr className="w-px h-3 bg-gray-300" />
            <Link href="/help">Help</Link>
            <hr className="w-px h-3 bg-gray-300" />
            <p className="">Made with ❤️</p>
        </motion.div>
    );
}
