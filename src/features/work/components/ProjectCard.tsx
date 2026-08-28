import React from "react";
import Link from "next/link";
import type { Project } from "../types";
import { ProjectMediaCarousel } from "./ProjectMediaCarousel";

export interface ProjectCardProps {
    project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <div className="group flex flex-col gap-4 select-none w-full">
            {/* Visual Exploration Area: Multi-Slide Media Carousel */}
            <ProjectMediaCarousel
                media={project.media}
                title={project.title}
                aspectRatio={project.aspectRatio}
                fitMode={project.fitMode}
                ambientBackdrop={project.ambientBackdrop}
            />

            {/* Information & Narrative Metadata */}
            <div className="flex flex-col px-0.5">
                {/* 1. Title (Clean Full-Width Editorial Display) */}
                <h3 className="text-base md:text-lg font-medium text-primary uppercase tracking-widest truncate group-hover:text-accent transition-colors duration-300">
                    {project.title}
                </h3>

                {/* 2. Role Underneath Title */}
                {project.roles && project.roles.length > 0 && (
                    <p className="text-[10px] md:text-xs text-accent uppercase tracking-[0.25em] font-medium mt-1 truncate">
                        {project.roles.join(" • ")}
                    </p>
                )}

                {/* 3. Description: High-Legibility Narrative Body */}
                {project.description && (
                    <p className="mt-2.5 text-xs md:text-sm font-light text-support/60 leading-relaxed line-clamp-2 group-hover:text-support/85 transition-colors duration-300">
                        {project.description}
                    </p>
                )}

                {/* 4. Dedicated Action CTA */}
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
