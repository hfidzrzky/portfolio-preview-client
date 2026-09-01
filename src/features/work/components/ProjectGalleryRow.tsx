"use client";

import React, { memo } from "react";
import type { ProjectRowSection } from "../types";
import { useGalleryRow } from "../hooks/useGalleryRow";
import { ProjectCard } from "./ProjectCard";

interface ProjectGalleryRowProps {
    row: ProjectRowSection;
}

export const ProjectGalleryRow = memo(({ row }: ProjectGalleryRowProps) => {
    const {
        rowRef,
        isRowVisible,
        scrollContainerRef,
        scrollProgress,
        canScrollLeft,
        canScrollRight,
        isDragging,
        scrollByStep,
        handleMouseDown,
        handleMouseMove,
        handleMouseUpOrLeave,
        handleClickCapture,
    } = useGalleryRow();

    const { badge, title, projects } = row;

    return (
        <div ref={rowRef} className="max-w-7xl mx-auto w-full px-6 md:px-16 flex flex-col">
            {/* Row Header with Counter & Navigation Controls */}
            <div className="w-full flex items-end justify-between mb-8">
                <div>
                    <h2
                        className={`text-xs md:text-sm uppercase tracking-[0.4em] text-accent flex items-center gap-4 font-bold transition-all duration-700 ${
                            isRowVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                        }`}
                    >
                        <span className="w-10 md:w-12 border-b border-accent drop-shadow-glow-red" />
                        {badge || title}
                    </h2>
                </div>

                {/* Navigation Buttons & Total Counter */}
                <div className="hidden md:flex items-center gap-4">
                    <span className="font-mono text-xs text-support/50 tracking-widest mr-2">
                        {projects.length < 10 ? `0${projects.length}` : projects.length} WORKS
                    </span>
                    <button
                        type="button"
                        onClick={() => scrollByStep("left")}
                        disabled={!canScrollLeft}
                        aria-label="Previous projects"
                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                            canScrollLeft
                                ? "border-white/20 text-primary hover:border-accent hover:text-accent hover:bg-accent/10 cursor-pointer"
                                : "border-white/5 text-support/20 cursor-not-allowed"
                        }`}
                    >
                        <span className="text-sm">&larr;</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollByStep("right")}
                        disabled={!canScrollRight}
                        aria-label="Next projects"
                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                            canScrollRight
                                ? "border-white/20 text-primary hover:border-accent hover:text-accent hover:bg-accent/10 cursor-pointer"
                                : "border-white/5 text-support/20 cursor-not-allowed"
                        }`}
                    >
                        <span className="text-sm">&rarr;</span>
                    </button>
                </div>
            </div>

            {/* Horizontal Scroll Track Container */}
            <div className="relative w-full">
                {/* Visual Edge Gradient Mask */}
                <div
                    className={`pointer-events-none absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-linear-to-r from-dark to-transparent z-10 transition-opacity duration-300 hidden md:block ${
                        canScrollLeft ? "opacity-100" : "opacity-0"
                    }`}
                />
                <div
                    className={`pointer-events-none absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-linear-to-l from-dark to-transparent z-10 transition-opacity duration-300 hidden md:block ${
                        canScrollRight ? "opacity-100" : "opacity-0"
                    }`}
                />

                {/* Scrollable Track */}
                <div
                    ref={scrollContainerRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseLeave={handleMouseUpOrLeave}
                    onClickCapture={handleClickCapture}
                    onDragStart={(e) => e.preventDefault()}
                    className={`-mx-6 px-6 md:mx-0 md:px-0 flex gap-4 md:gap-8 overflow-x-auto scrollbar-none select-none pb-6 transition-opacity duration-1000 will-change-scroll ${
                        isDragging
                            ? "md:cursor-grabbing scroll-auto snap-none"
                            : "md:cursor-grab scroll-smooth snap-x snap-mandatory"
                    } ${isRowVisible ? "opacity-100" : "opacity-0"}`}
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            data-project-card
                            className="w-[82vw] max-w-85 sm:w-90 md:w-95 lg:w-100 flex-none snap-center md:snap-start group"
                        >
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Minimalist Progress Bar Track */}
            <div className="w-full mt-2">
                <div className="w-full h-0.5 bg-white/5 relative overflow-hidden rounded-full">
                    <div
                        className="h-full bg-accent transition-all duration-150 ease-out drop-shadow-glow-red"
                        style={{ width: `${Math.max(12, scrollProgress)}%` }}
                    />
                </div>
            </div>
        </div>
    );
});

ProjectGalleryRow.displayName = "ProjectGalleryRow";
