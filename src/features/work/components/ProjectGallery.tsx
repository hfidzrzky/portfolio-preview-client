"use client";

import React from "react";
import { ARCHIVED_ROWS } from "../data/archived-frames.data";
import { Section, SectionHeader } from "@/shared/ui";
import { ProjectCard } from "./ProjectCard";
import { ArchivedFramesMarquee } from "./ArchivedFramesMarquee";
import { useProjectGallery } from "../hooks/useProjectGallery";

export const ProjectGallery = () => {
    const {
        currentPage,
        totalPages,
        currentProjects,
        isCardsVisible,
        isMarqueeVisible,
        isGalleryVisible,
        sectionRef,
        galleryRef,
        handlePageChange,
    } = useProjectGallery(6);

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

            {/* SELECTED WORKS SECTION */}
            <div ref={galleryRef} className="max-w-7xl mx-auto w-full px-6 md:px-16">
                <SectionHeader
                    badge="Selected Works"
                    className={`transition-all duration-1000 ease-out ${
                        isGalleryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {currentProjects.map((project, index) => (
                        <div 
                            key={project.id}
                            style={{ transitionDelay: `${index * 150}ms` }}
                            className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                isCardsVisible && isGalleryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                            }`}
                        >
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className={`mt-24 flex justify-center items-center gap-6 transition-all duration-1000 delay-500 ${isGalleryVisible ? "opacity-100" : "opacity-0"}`}>
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)} 
                            disabled={currentPage === 1 || !isCardsVisible} 
                            className={`text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                                currentPage === 1 ? "text-support/20 cursor-not-allowed" : "text-support hover:text-accent cursor-pointer"
                            }`}
                        >
                            <span>&larr;</span> Prev
                        </button>
                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }).map((_, index) => {
                                const pageNum = index + 1;
                                return (
                                    <button 
                                        key={pageNum} 
                                        onClick={() => handlePageChange(pageNum)} 
                                        disabled={!isCardsVisible} 
                                        className={`w-8 h-8 flex items-center justify-center text-xs font-mono transition-all duration-300 border cursor-pointer ${
                                            currentPage === pageNum 
                                                ? "border-accent text-accent bg-accent/5" 
                                                : "border-white/5 text-support/60 hover:border-white/20 hover:text-primary"
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>
                        <button 
                            onClick={() => handlePageChange(currentPage + 1)} 
                            disabled={currentPage === totalPages || !isCardsVisible} 
                            className={`text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                                currentPage === totalPages ? "text-support/20 cursor-not-allowed" : "text-support hover:text-accent cursor-pointer"
                            }`}
                        >
                            Next <span>&rarr;</span>
                        </button>
                    </div>
                )}
            </div>
        </Section>
    );
};
