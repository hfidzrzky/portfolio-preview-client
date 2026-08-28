"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import type { ArchivedFrameItem } from "../types";
import { useArchivedMarquee } from "../hooks/useArchivedMarquee";

export interface ArchivedFramesMarqueeProps {
    items: ArchivedFrameItem[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
}

export const ArchivedFramesMarquee: React.FC<ArchivedFramesMarqueeProps> = ({
    items,
    direction = "left",
    speed = "normal",
}) => {
    const {
        containerRef,
        onMouseDown,
        onMouseMove,
        onMouseUp,
        onMouseLeave,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
    } = useArchivedMarquee({ direction, speed });

    const repeatedItems = useMemo(() => Array.from({ length: 3 }).flatMap(() => items), [items]);

    return (
        <div
            ref={containerRef}
            className="flex w-full overflow-x-auto cursor-grab active:cursor-grabbing scrollbar-none select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onDragStart={(e) => e.preventDefault()}
        >
            <div className="flex w-max select-none">
                {/* Block 1 */}
                <div className="flex shrink-0">
                    {repeatedItems.map((item, index) => (
                        <div
                            key={`block1-${item.id}-${index}`}
                            className="relative w-40 md:w-56 lg:w-72 aspect-video bg-zinc-900 overflow-hidden shrink-0 select-none"
                        >
                            <Image
                                src={item.src}
                                alt={item.alt || "Archived Frame"}
                                fill
                                loading="lazy"
                                draggable={false}
                                sizes="(max-width: 768px) 160px, (max-width: 1024px) 224px, 288px"
                                className="object-cover opacity-60 hover:opacity-100 transition-all duration-700 pointer-events-none select-none"
                            />
                        </div>
                    ))}
                </div>

                {/* Block 2 (Infinite duplicate clone for seamless loop) */}
                <div className="flex shrink-0">
                    {repeatedItems.map((item, index) => (
                        <div
                            key={`block2-${item.id}-${index}`}
                            className="relative w-40 md:w-56 lg:w-72 aspect-video bg-zinc-900 overflow-hidden shrink-0 select-none"
                        >
                            <Image
                                src={item.src}
                                alt={item.alt || "Archived Frame"}
                                fill
                                loading="lazy"
                                draggable={false}
                                sizes="(max-width: 768px) 160px, (max-width: 1024px) 224px, 288px"
                                className="object-cover opacity-60 hover:opacity-100 transition-all duration-700 pointer-events-none select-none"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
