"use client";

import React from "react";
import { ARCHIVED_ROWS } from "../data/archived-frames.data";
import { Section, SectionHeader } from "@/shared/ui";
import { ProjectCard } from "./ProjectCard";
import { ArchivedFramesMarquee } from "./ArchivedFramesMarquee";
import { useProjectGallery } from "../hooks/useProjectGallery";

export const ProjectGallery = () => {
    const {
        projects,
        scrollContainerRef,
        scrollProgress,
        canScrollLeft,
        canScrollRight,
        isDragging,
        isMarqueeVisible,
        isGalleryVisible,
        sectionRef,
        galleryRef,
        scrollByStep,
        handleMouseDown,
        handleMouseMove,
        handleMouseUpOrLeave,
        handleClickCapture,
    } = useProjectGallery();

    return (
        <Section ref={sectionRef} id="projects" containerSize="full" className="min-h-screen flex flex-col space-y-32">
            {/* ARCHIVED FRAMES SECTION */}
            <div className={`flex flex-col transition-all duration-1000 ease-out ${isMarqueeVisible ? "opacity-100" : "opacity-0"}`}>
                <div className="max-w-7xl mx-auto w-full px-6 md:px-16">
                    <SectionHeader
                        badge="Archived Frames"
                        description="Visual explorations and light studies."
                    />
                </div>
                <div className="flex flex-col w-full">
                    <ArchivedFramesMarquee items={ARCHIVED_ROWS.row1} direction="left" speed="slow" />
                    <ArchivedFramesMarquee items={ARCHIVED_ROWS.row2} direction="right" speed="slow" />
                    <ArchivedFramesMarquee items={ARCHIVED_ROWS.row3} direction="left" speed="slow" />
                </div>
            </div>

            {/* SELECTED WORKS SECTION - 1 ROW SMOOTH HORIZONTAL REEL */}
            <div ref={galleryRef} className="max-w-7xl mx-auto w-full px-6 md:px-16 flex flex-col">
                {/* Header with Counter & Navigation Controls */}
                <div className="w-full flex items-end justify-between mb-8">
                    <div>
                        <h2 className={`text-xs md:text-sm uppercase tracking-[0.4em] text-accent flex items-center gap-4 font-bold transition-all duration-700 ${
                            isGalleryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                        }`}>
                            <span className="w-12 border-b border-accent drop-shadow-glow-red" />
                            Selected Works
                        </h2>
                        <p className="mt-2 text-[10px] md:text-xs text-support/60 tracking-[0.2em] uppercase font-light">
                            Featured Commercial & Narrative Films
                        </p>
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
                            aria-label="Previous project"
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
                            aria-label="Next project"
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
                    {/* Visual Cue Edge Gradient (Left & Right Mask) */}
                    <div
                        className={`pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-linear-to-r from-dark to-transparent z-10 transition-opacity duration-300 ${
                            canScrollLeft ? "opacity-100" : "opacity-0"
                        }`}
                    />
                    <div
                        className={`pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-linear-to-l from-dark to-transparent z-10 transition-opacity duration-300 ${
                            canScrollRight ? "opacity-100" : "opacity-0"
                        }`}
                    />

                    {/* Scrollable Row - Exactly inside the max-w-7xl bounds */}
                    <div
                        ref={scrollContainerRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUpOrLeave}
                        onMouseLeave={handleMouseUpOrLeave}
                        onClickCapture={handleClickCapture}
                        onDragStart={(e) => e.preventDefault()}
                        className={`flex gap-6 md:gap-8 overflow-x-auto scrollbar-none select-none pb-6 transition-opacity duration-1000 will-change-scroll ${
                            isDragging
                                ? "cursor-grabbing scroll-auto snap-none"
                                : "cursor-grab scroll-smooth snap-x snap-mandatory"
                        } ${isGalleryVisible ? "opacity-100" : "opacity-0"}`}
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                data-project-card
                                className="w-70 sm:w-90 md:w-95 lg:w-100 flex-none snap-start group"
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
        </Section>
    );
};
