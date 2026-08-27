import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "../types";

export interface ProjectCardProps {
    project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <Link 
            href={project.url} 
            target="_blank" 
            rel="noopener noreferrer"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="group flex flex-col gap-4 cursor-pointer select-none"
        >
            <div className="relative w-full aspect-video bg-zinc-900 overflow-hidden rounded-sm border border-white/5 transition-colors duration-500 group-hover:border-accent/30 pointer-events-none">
                <Image 
                    src={project.thumbnail || "/images/frames/khoas1.png"} 
                    alt={project.title}
                    fill
                    draggable={false}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] select-none pointer-events-none"
                />
                
                <div className="absolute inset-0 bg-linear-to-t from-dark/90 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 translate-y-4">
                    <span className="bg-dark/80 text-primary text-[10px] uppercase tracking-[0.3em] px-6 py-2 border border-white/10 backdrop-blur-sm rounded-full">
                        View Project
                    </span>
                </div>
            </div>

            <div className="flex flex-col px-1 select-none pointer-events-none">
                <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col flex-1 min-w-0">
                        <h3 className="text-base md:text-lg font-medium text-primary uppercase tracking-widest truncate group-hover:text-accent transition-colors duration-300">
                            {project.title}
                        </h3>
                        <p className="text-[10px] md:text-xs text-accent/80 uppercase tracking-[0.2em] mt-1 truncate">
                            {project.roles ? project.roles.join(" • ") : "Short Movie"}
                        </p>
                    </div>

                    <div className="shrink-0 pt-1">
                        <span className="text-[10px] font-mono text-support/80 border border-white/10 bg-white/5 px-2 py-1 rounded-sm">
                            {project.year || "2024"}
                        </span>
                    </div>
                </div>

                {project.description && (
                    <div className="mt-4 border-t border-white/5 pt-3">
                        <p className="text-sm font-light text-support/60 leading-relaxed line-clamp-2 wrap-break-word group-hover:text-support/90 transition-colors duration-300">
                            {project.description}
                        </p>
                    </div>
                )}
            </div>
        </Link>
    );
};
