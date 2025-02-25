import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { CalculatorProvider } from "./context";
import Footer from "./_layout/footer";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Formula Pro",
    description: "A formula, command, and constant-enabled calculator.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} relative antialiased min-h-screen bg-background text-foreground`}
            >
                <Toaster
                    richColors
                    position="top-center"
                    closeButton
                    duration={1500}
                />
                <CalculatorProvider>{children}</CalculatorProvider>
                <Footer />
            </body>
        </html>
    );
}
