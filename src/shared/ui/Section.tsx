import React, { forwardRef } from "react";
import { cn } from "@/shared/lib";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    id?: string;
    children: React.ReactNode;
    hasDivider?: boolean;
    containerSize?: "default" | "compact" | "full";
    className?: string;
    containerClassName?: string;
}

export const Section = forwardRef<HTMLElement, SectionProps>(({
    id,
    children,
    hasDivider = false,
    containerSize = "default",
    className,
    containerClassName,
    ...props
}, ref) => {
    const sizeClasses = {
        default: "max-w-7xl mx-auto w-full px-6 md:px-16",
        compact: "max-w-4xl mx-auto w-full px-6 md:px-16",
        full: "w-full",
    };

    return (
        <section
            ref={ref}
            id={id}
            className={cn(
                "relative py-24 md:py-32 bg-dark overflow-hidden",
                hasDivider && "border-t border-white/5",
                className
            )}
            {...props}
        >
            {containerSize === "full" ? (
                children
            ) : (
                <div className={cn(sizeClasses[containerSize], containerClassName)}>
                    {children}
                </div>
            )}
        </section>
    );
});

Section.displayName = "Section";
