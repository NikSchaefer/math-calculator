import * as React from "react";
import { Slot as SlotPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 overflow-hidden",
    {
        variants: {
            variant: {
                default: [
                    "bg-white/80 backdrop-blur-sm text-neutral-900 border border-white/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] hover:shadow-md hover:brightness-[1.02] active:scale-[0.98]",
                    "before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_27%_37%,#60A5FA_0px,transparent_50%)_,radial-gradient(circle_at_97%_21%,#C4B5FD_0px,transparent_50%)_,radial-gradient(circle_at_52%_99%,#FDA4AF_0px,transparent_50%)_,radial-gradient(circle_at_10%_29%,#86EFAC_0px,transparent_50%)] before:blur-xl before:transition-opacity hover:before:opacity-30",
                    "after:absolute after:inset-0 after:rounded-md after:shadow-[0_0_0_1px_rgba(255,255,255,0.3)]",
                ],
                outline:
                    "border border-neutral-200 bg-white/50 backdrop-blur-sm hover:bg-white/80",
                ghost: "hover:bg-neutral-100/50",
                link: "text-neutral-900 underline-offset-4 hover:underline decoration-neutral-300",
            },
            size: {
                default: "h-10 px-6 py-2",
                sm: "h-9 rounded-md px-4",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
                highlight: "rounded-md px-2.5 py-0.5",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? SlotPrimitive.Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
