"use client";

import React from "react";
import { ARCHIVED_ROWS } from "../data/archived-frames.data";
import { PROJECT_ROWS } from "../data/projects.data";
import { Section, SectionHeader } from "@/shared/ui";
import { ArchivedFramesMarquee } from "./ArchivedFramesMarquee";
import { ProjectGalleryRow } from "./ProjectGalleryRow";
import { useIntersectionObserver } from "@/shared/hooks";

export const ProjectGallery = () => {
    const [sectionRef, isMarqueeVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.05 });

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
                <div className="relative flex flex-col w-full overflow-hidden mt-6">
                    {/* Cinematic edge fade masks */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 md:w-36 bg-linear-to-r from-background to-transparent z-10" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 md:w-36 bg-linear-to-l from-background to-transparent z-10" />

                    <ArchivedFramesMarquee items={ARCHIVED_ROWS.row1} direction="left" speed="slow" />
                    <ArchivedFramesMarquee items={ARCHIVED_ROWS.row2} direction="right" speed="slow" />
                    <ArchivedFramesMarquee items={ARCHIVED_ROWS.row3} direction="left" speed="slow" />
                </div>
            </div>

            {/* SELECTED WORKS - 3 CURATED ROWS (6 PROJECTS EACH) */}
            <div className="flex flex-col space-y-24 md:space-y-32 w-full">
                {PROJECT_ROWS.map((row) => (
                    <ProjectGalleryRow key={row.id} row={row} />
                ))}
            </div>
        </Section>
    );
};
