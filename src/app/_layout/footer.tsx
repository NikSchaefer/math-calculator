"use client";

import { githubLink } from "@/config";
import { motion } from "motion/react";
import Link from "next/link";
export default function Footer() {
  return (
    <motion.div
      className="absolute bottom-2 left-1/2 px-8 gap-1 -translate-x-1/2 w-full justify-center flex-col sm:flex-row flex sm:items-center text-xs text-muted-foreground"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.6 }}
    >
      <Link href="/what-is-this">What is this?</Link>
      <hr className="w-px h-3 bg-gray-300 hidden sm:block" />
      <Link href={githubLink}>GitHub ❤️</Link>
    </motion.div>
  );
}
