"use client";

import React, { memo } from "react";
import Image from "next/image";
import type { ProjectMediaItem, MediaFitMode } from "../../types";
import { useVideoAutoplay } from "../../hooks/useVideoAutoplay";

interface ProjectMediaSlideProps {
    item: ProjectMediaItem;
    isActive: boolean;
    priority?: boolean;
    fitMode?: MediaFitMode;
    ambientBackdrop?: boolean;
}

const VideoPlayer = memo(({
    item,
    isActive,
    fitMode = "contain",
    ambientBackdrop = true,
}: {
    item: ProjectMediaItem;
    isActive: boolean;
    fitMode?: MediaFitMode;
    ambientBackdrop?: boolean;
}) => {
    const {
        videoRef,
        containerRef,
        isInView,
        isReady,
        handleLoadedData,
    } = useVideoAutoplay({ isActive });

    const activeFitMode = item.fitMode || fitMode;
    const isContain = activeFitMode === "contain";

    return (
        <div ref={containerRef} className="relative w-full h-full bg-zinc-950 overflow-hidden flex items-center justify-center">
            {/* Ambient Frosted Glow Backdrop for non-covering aspect ratios */}
            {ambientBackdrop && isContain && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none select-none opacity-40 blur-2xl scale-125 transition-opacity duration-1000">
                    {item.poster ? (
                        <Image
                            src={item.poster}
                            alt=""
                            fill
                            sizes="10vw"
                            className="object-cover brightness-50"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-zinc-800/40 via-dark to-zinc-950/80" />
                    )}
                </div>
            )}

            {/* Poster fallback image while buffering or when offscreen */}
            {item.poster && (!isReady || !isInView) && (
                <Image
                    src={item.poster}
                    alt={item.alt || "Video preview"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`relative z-10 transition-opacity duration-700 select-none pointer-events-none ${
                        isContain ? "object-contain" : "object-cover"
                    }`}
                />
            )}

            {/* Hardware-virtualized strictly muted HTML5 Video (Only active when in view) */}
            {isInView && (
                <video
                    ref={videoRef}
                    src={item.src}
                    poster={item.poster}
                    muted
                    playsInline
                    loop
                    preload="metadata"
                    onLoadedData={handleLoadedData}
                    className={`relative z-10 w-full h-full transition-opacity duration-700 select-none pointer-events-none ${
                        isContain ? "object-contain" : "object-cover"
                    } ${isReady ? "opacity-100" : "opacity-0"}`}
                />
            )}
        </div>
    );
});

VideoPlayer.displayName = "VideoPlayer";

export const ProjectMediaSlide = memo(({
    item,
    isActive,
    priority = false,
    fitMode = "contain",
    ambientBackdrop = true,
}: ProjectMediaSlideProps) => {
    const activeFitMode = item.fitMode || fitMode;
    const isContain = activeFitMode === "contain";

    if (item.type === "video") {
        return (
            <VideoPlayer
                item={item}
                isActive={isActive}
                fitMode={fitMode}
                ambientBackdrop={ambientBackdrop}
            />
        );
    }

    return (
        <div className="relative w-full h-full bg-zinc-950 overflow-hidden flex items-center justify-center">
            {/* Ambient Frosted Glow Backdrop for Stills / Images */}
            {ambientBackdrop && isContain && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none select-none opacity-30 blur-2xl scale-125 transition-opacity duration-1000">
                    <Image
                        src={item.src}
                        alt=""
                        fill
                        sizes="10vw"
                        className="object-cover brightness-50"
                    />
                </div>
            )}

            <Image
                src={item.src}
                alt={item.alt || "Project Frame"}
                fill
                priority={priority}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`relative z-10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] select-none pointer-events-none ${
                    isContain ? "object-contain" : "object-cover"
                }`}
            />
        </div>
    );
});

ProjectMediaSlide.displayName = "ProjectMediaSlide";
