"use client";

import React from "react";
import Image from "next/image";
import type { ArchivedFrameItem } from "../types";
import { useInteractiveMarquee } from "../hooks/useInteractiveMarquee";

export interface ArchivedFramesMarqueeProps {
    items: ArchivedFrameItem[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    className?: string;
}

export const ArchivedFramesMarquee: React.FC<ArchivedFramesMarqueeProps> = ({
    items,
    direction = "left",
    speed = "normal",
    className = "",
}) => {
    const { containerRef, innerRef, track1Ref, isDragging, handlers } = useInteractiveMarquee({
        direction,
        speed,
        pauseOnHover: true,
    });

    if (!items || items.length === 0) return null;

    return (
        <div
            ref={containerRef}
            className={`relative w-full overflow-hidden select-none py-1 md:py-1.5 touch-pan-y ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
            } ${className}`}
            onWheel={handlers.onWheel}
            onMouseDown={handlers.onMouseDown}
            onTouchStart={handlers.onTouchStart}
            onTouchMove={handlers.onTouchMove}
            onTouchEnd={handlers.onTouchEnd}
            onMouseEnter={handlers.onMouseEnter}
            onMouseLeave={handlers.onMouseLeave}
            onClickCapture={handlers.onClickCapture}
        >
            <div
                ref={innerRef}
                className="flex w-max will-change-transform"
                style={{ transform: "translate3d(0, 0, 0)" }}
            >
                {/* Track 1 */}
                <div ref={track1Ref} className="flex shrink-0 items-center gap-3 md:gap-4 pr-3 md:pr-4">
                    {items.map((item) => (
                        <div
                            key={`t1-${item.id}`}
                            className="relative w-44 sm:w-56 md:w-64 lg:w-72 aspect-video rounded-sm overflow-hidden bg-zinc-900 shrink-0 group/frame"
                        >
                            <Image
                                src={item.src}
                                alt={item.alt || "Archived Frame"}
                                fill
                                loading="lazy"
                                draggable={false}
                                sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
                                className="object-cover opacity-60 group-hover/frame:opacity-100 group-hover/frame:scale-105 transition-all duration-500 ease-out pointer-events-none select-none"
                            />
                            {/* Cinematic vignette */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
                        </div>
                    ))}
                </div>

                {/* Track 2 (Seamless infinite clone) */}
                <div className="flex shrink-0 items-center gap-3 md:gap-4 pr-3 md:pr-4" aria-hidden="true">
                    {items.map((item) => (
                        <div
                            key={`t2-${item.id}`}
                            className="relative w-44 sm:w-56 md:w-64 lg:w-72 aspect-video rounded-sm overflow-hidden bg-zinc-900 shrink-0 group/frame"
                        >
                            <Image
                                src={item.src}
                                alt={item.alt || "Archived Frame"}
                                fill
                                loading="lazy"
                                draggable={false}
                                sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
                                className="object-cover opacity-60 group-hover/frame:opacity-100 group-hover/frame:scale-105 transition-all duration-500 ease-out pointer-events-none select-none"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
