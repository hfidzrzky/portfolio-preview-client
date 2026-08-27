"use client";

import React, { useState } from "react";
import Image from "next/image";
import { WORK_ON_SET_IMAGES } from "../data/work-on-set.data";
import { useWorkOnSet } from "../hooks/useWorkOnSet";
import { Section, SectionHeader } from "@/shared/ui";

export const WorkOnSet = () => {
    const { sectionRef, isVisible } = useWorkOnSet();
    const [activeImageId, setActiveImageId] = useState<string | number | null>(null);

    const handleCardClick = (id: string | number) => {
        setActiveImageId((prevId) => (prevId === id ? null : id));
    };

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
                    const isActive = activeImageId === image.id;
                    const isStaticImport = typeof image.src !== "string";

                    return (
                        <div 
                            key={image.id} 
                            onClick={() => handleCardClick(image.id)}
                            style={{ 
                                transitionDelay: `${index * 150}ms`,
                                WebkitTapHighlightColor: "transparent"
                            }}
                            className={`group relative w-full overflow-hidden bg-dark rounded-sm cursor-pointer break-inside-avoid mb-4 select-none outline-none focus:outline-none focus:ring-0 active:outline-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"
                            }`}
                        >
                            {/* Image with hover and active states */}
                            {isStaticImport ? (
                                <Image 
                                    src={image.src}
                                    alt={image.alt}
                                    placeholder="blur"
                                    draggable={false}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className={`w-full h-auto object-cover select-none pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                        isActive
                                            ? "grayscale-0 scale-105"
                                            : "grayscale md:group-hover:grayscale-0 md:group-hover:scale-105"
                                    }`}
                                />
                            ) : (
                                <Image 
                                    src={image.src}
                                    alt={image.alt}
                                    width={0}
                                    height={0}
                                    draggable={false}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className={`w-full h-auto object-cover select-none pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                        isActive
                                            ? "grayscale-0 scale-105"
                                            : "grayscale md:group-hover:grayscale-0 md:group-hover:scale-105"
                                    }`}
                                />
                            )}
                            
                            {/* Caption & Dark Gradient Overlay */}
                            <div 
                                className={`absolute inset-0 bg-linear-to-t from-dark/90 via-dark/20 to-transparent pointer-events-none transition-opacity duration-300 flex items-end p-5 ${
                                    isActive ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
                                }`}
                            >
                                <p 
                                    className={`text-[10px] md:text-xs text-primary uppercase tracking-[0.2em] transition-transform duration-300 ${
                                        isActive ? "translate-y-0 text-white" : "translate-y-2 md:group-hover:translate-y-0"
                                    }`}
                                >
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
