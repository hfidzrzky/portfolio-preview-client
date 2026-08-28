"use client";

import React, { memo } from "react";
import type { ProjectMediaItem } from "../types";
import { useProjectCarousel } from "../hooks/useProjectCarousel";
import { ProjectMediaSlide } from "./media/ProjectMediaSlide";

interface ProjectMediaCarouselProps {
    media: ProjectMediaItem[];
    title: string;
}

export const ProjectMediaCarousel = memo(({
    media,
    title,
}: ProjectMediaCarouselProps) => {
    const {
        activeIndex,
        isDraggingMouse,
        goToNext,
        goToPrev,
        goToIndex,
        handleTouchStart,
        handleTouchEnd,
        handleMouseDown,
        handleMouseMove,
        handleMouseUpOrLeave,
        handleClickCapture,
        handleWheel,
    } = useProjectCarousel({ totalItems: media.length });

    const hasMultipleSlides = media.length > 1;

    return (
        <div
            className={`relative w-full aspect-video bg-zinc-900 rounded-sm overflow-hidden border border-white/5 group-hover:border-accent/30 transition-colors duration-500 touch-pan-y select-none ${
                hasMultipleSlides
                    ? isDraggingMouse
                        ? "cursor-grabbing"
                        : "cursor-grab"
                    : "cursor-default"
            }`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onClickCapture={handleClickCapture}
            onWheel={handleWheel}
        >
            {/* Media Slides Track */}
            <div className="relative w-full h-full pointer-events-none">
                {media.map((item, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <div
                            key={item.id || index}
                            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                                isActive
                                    ? "opacity-100 z-10"
                                    : "opacity-0 z-0"
                            }`}
                        >
                            <ProjectMediaSlide
                                item={item}
                                isActive={isActive}
                                priority={index === 0}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Subtle Bottom Vignette for Indicator Contrast */}
            <div className="absolute inset-x-0 bottom-0 h-14 bg-linear-to-t from-dark/80 to-transparent pointer-events-none z-20" />

            {/* Desktop Hover Micro-Navigation Arrows */}
            {hasMultipleSlides && (
                <>
                    <button
                        type="button"
                        onClick={goToPrev}
                        aria-label="Previous slide"
                        className="hidden md:flex absolute left-2.5 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-dark/70 hover:bg-dark/95 border border-white/10 hover:border-accent/40 text-primary hover:text-accent items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm cursor-pointer shadow-lg"
                    >
                        <span className="text-xs">&#10094;</span>
                    </button>
                    <button
                        type="button"
                        onClick={goToNext}
                        aria-label="Next slide"
                        className="hidden md:flex absolute right-2.5 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-dark/70 hover:bg-dark/95 border border-white/10 hover:border-accent/40 text-primary hover:text-accent items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm cursor-pointer shadow-lg"
                    >
                        <span className="text-xs">&#10095;</span>
                    </button>
                </>
            )}

            {/* Bottom-Center Instagram-Style Pagination Dots */}
            {hasMultipleSlides && (
                <div className="absolute bottom-2 inset-x-0 z-30 flex items-center justify-center gap-1 pointer-events-auto">
                    {media.map((item, idx) => (
                        <button
                            key={item.id || idx}
                            type="button"
                            onClick={(e) => goToIndex(idx, e)}
                            aria-label={`Go to slide ${idx + 1} of ${media.length}`}
                            className="p-0.5 cursor-pointer focus:outline-hidden"
                        >
                            <span
                                className={`block transition-all duration-300 rounded-full ${
                                    idx === activeIndex
                                        ? "w-3.5 h-1 bg-accent drop-shadow-glow-red"
                                        : "w-1 h-1 bg-white/40 hover:bg-white/70"
                                }`}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
});

ProjectMediaCarousel.displayName = "ProjectMediaCarousel";
