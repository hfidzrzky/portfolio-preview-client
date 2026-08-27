import React from "react";
import { cn } from "@/shared/lib";

export interface SectionHeaderProps {
    badge: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    align?: "left" | "center" | "split";
    className?: string;
    badgeClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    badge,
    title,
    description,
    align = "left",
    className,
    badgeClassName,
    titleClassName,
    descriptionClassName,
}) => {
    if (align === "split") {
        return (
            <div className={cn("mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6", className)}>
                <div>
                    <h2 className={cn("text-xs md:text-sm uppercase tracking-[0.4em] text-accent flex items-center gap-4 font-bold mb-3", badgeClassName)}>
                        <span className="w-12 border-b border-accent drop-shadow-glow-red" />
                        {badge}
                    </h2>
                    {title && (
                        <h3 className={cn("text-3xl md:text-4xl font-light text-primary uppercase tracking-wide", titleClassName)}>
                            {title}
                        </h3>
                    )}
                </div>
                {description && (
                    <div className={cn("text-sm font-light text-support/60 max-w-sm leading-relaxed", descriptionClassName)}>
                        {description}
                    </div>
                )}
            </div>
        );
    }

    if (align === "center") {
        return (
            <div className={cn("mb-12 md:mb-16 flex flex-col items-center text-center", className)}>
                <h2 className={cn("text-xs md:text-sm uppercase tracking-[0.4em] text-accent flex items-center gap-4 font-bold mb-6", badgeClassName)}>
                    <span className="w-12 border-b border-accent drop-shadow-glow-red hidden md:block" />
                    {badge}
                    <span className="w-12 border-b border-accent drop-shadow-glow-red" />
                </h2>
                {title && (
                    <h3 className={cn("text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-primary mb-6", titleClassName)}>
                        {title}
                    </h3>
                )}
                {description && (
                    <div className={cn("text-sm md:text-base text-support/80 max-w-xl leading-relaxed font-light tracking-wide", descriptionClassName)}>
                        {description}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={cn("mb-12", className)}>
            <h2 className={cn("text-xs md:text-sm uppercase tracking-[0.4em] text-accent flex items-center gap-4 font-bold", badgeClassName)}>
                <span className="w-12 border-b border-accent drop-shadow-glow-red" />
                {badge}
            </h2>
            {title && (
                <h3 className={cn("mt-3 text-2xl md:text-3xl font-light text-primary tracking-wide", titleClassName)}>
                    {title}
                </h3>
            )}
            {description && (
                <div className={cn("mt-3 text-support text-[10px] md:text-xs tracking-[0.2em] uppercase font-light max-w-md leading-relaxed", descriptionClassName)}>
                    {description}
                </div>
            )}
        </div>
    );
};
