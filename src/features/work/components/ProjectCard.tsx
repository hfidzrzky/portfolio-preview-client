import React from "react";
import Link from "next/link";
import type { Project } from "../types";
import { ProjectMediaCarousel } from "./ProjectMediaCarousel";

export interface ProjectCardProps {
    project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <div className="group flex flex-col justify-between h-full gap-4 select-none w-full">
            {/* Visual Exploration Area: Multi-Slide Media Carousel */}
            <ProjectMediaCarousel
                media={project.media}
                title={project.title}
                aspectRatio={project.aspectRatio}
                fitMode={project.fitMode}
                ambientBackdrop={project.ambientBackdrop}
            />

            {/* Information & Narrative Metadata */}
            <div className="flex flex-col flex-1 justify-between px-0.5">
                <div className="flex flex-col gap-2">
                    {/* 1. Title (Clean Full-Width Multi-Line Wrapping Display) */}
                    <h3 className="text-base md:text-lg font-medium text-primary uppercase tracking-wider leading-snug wrap-break-words text-balance group-hover:text-accent transition-colors duration-300">
                        {project.title}
                    </h3>

                    {/* 2. Minimalist Role Badges */}
                    {project.roles && project.roles.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {project.roles.map((role, idx) => (
                                <span
                                    key={`${project.id}-role-${idx}`}
                                    className="inline-flex items-center px-2 py-0.5 text-[10px] md:text-xs font-mono uppercase tracking-wider text-support/90 bg-white/5 border border-white/10 rounded-xs transition-colors duration-300 group-hover:border-accent/40 group-hover:text-primary"
                                >
                                    {role}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* 3. Dedicated Action CTA */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <Link
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        draggable={false}
                        className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-support/80 hover:text-accent group/btn transition-colors duration-300"
                    >
                        <span>View Project</span>
                        <span className="text-sm font-normal transform transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5">
                            &#8599;
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};
