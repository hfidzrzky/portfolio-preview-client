"use client";

import React from "react";
import Image from "next/image";
import { WORK_ON_SET_IMAGES } from "../data/work-on-set.data";
import { useWorkOnSet } from "../hooks/useWorkOnSet";
import { Section, SectionHeader } from "@/shared/ui";

export const WorkOnSet = () => {
    const { sectionRef, isVisible } = useWorkOnSet();

    return (
        <Section ref={sectionRef} id="work-on-set" hasDivider className="min-h-screen">
            <SectionHeader
                badge="Work On Set"
                title={
                    <>
                        Behind The <span className="italic font-serif text-support">Lens</span>
                    </>
                }
                description="A glimpse into the chaotic yet beautiful process of filmmaking. Documenting moments, setups, and the unseen energy behind the camera."
                align="split"
                className={`transition-all duration-1000 ease-out ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            />

            {/* MASONRY LAYOUT */}
            <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
                {WORK_ON_SET_IMAGES.map((image, index) => {
                    const calculatedRatio = (image.width || 16) / (image.height || 9);

                    return (
                        <div 
                            key={image.id} 
                            style={{ 
                                aspectRatio: calculatedRatio,
                                transitionDelay: `${index * 150}ms` 
                            }}
                            className={`group relative w-full overflow-hidden bg-zinc-900 rounded-sm cursor-pointer break-inside-avoid shadow-lg mb-4 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"
                            }`}
                        >
                            <Image 
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                            />
                            
                            <div className="absolute inset-0 bg-linear-to-t from-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                                <p className="text-[10px] text-primary uppercase tracking-[0.2em] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    {image.alt}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
};
