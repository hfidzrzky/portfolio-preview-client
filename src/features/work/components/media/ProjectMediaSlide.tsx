"use client";

import React, { memo } from "react";
import Image from "next/image";
import type { ProjectMediaItem } from "../../types";
import { useVideoAutoplay } from "../../hooks/useVideoAutoplay";

interface ProjectMediaSlideProps {
    item: ProjectMediaItem;
    isActive: boolean;
    priority?: boolean;
}

const VideoPlayer = memo(({
    item,
    isActive,
}: {
    item: ProjectMediaItem;
    isActive: boolean;
}) => {
    const {
        videoRef,
        containerRef,
        isInView,
        isReady,
        handleLoadedData,
    } = useVideoAutoplay({ isActive });

    return (
        <div ref={containerRef} className="relative w-full h-full bg-zinc-950 overflow-hidden">
            {/* Poster fallback image while buffering or when offscreen */}
            {item.poster && (!isReady || !isInView) && (
                <Image
                    src={item.poster}
                    alt={item.alt || "Video preview"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-opacity duration-700 select-none pointer-events-none"
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
                    className={`w-full h-full object-cover transition-opacity duration-700 select-none pointer-events-none ${
                        isReady ? "opacity-100" : "opacity-0"
                    }`}
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
}: ProjectMediaSlideProps) => {
    if (item.type === "video") {
        return <VideoPlayer item={item} isActive={isActive} />;
    }

    return (
        <div className="relative w-full h-full bg-zinc-950 overflow-hidden">
            <Image
                src={item.src}
                alt={item.alt || "Project Frame"}
                fill
                priority={priority}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] select-none pointer-events-none"
            />
        </div>
    );
});

ProjectMediaSlide.displayName = "ProjectMediaSlide";
