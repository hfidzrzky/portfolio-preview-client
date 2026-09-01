"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Layers } from "lucide-react";
import { useWorkOnSet } from "../hooks/useWorkOnSet";
import { Section, SectionHeader } from "@/shared/ui";

export const WorkOnSet = () => {
    const {
        categories,
        selectedCategory,
        categoryCounts,
        displayedImages,
        activeImageId,
        isExpanded,
        hasMore,
        remainingCount,
        handleCategorySelect,
        handleToggleExpand,
        handleCardClick,
        sectionVariants,
        headerVariants,
        filterContainerVariants,
        gridContainerVariants,
        cardVariants,
    } = useWorkOnSet();

    return (
        <Section id="work-on-set" hasDivider className="min-h-screen relative overflow-hidden">
            <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1, margin: "-60px" }}
                className="w-full"
            >
                {/* Header with animated entrance */}
                <motion.div variants={headerVariants}>
                    <SectionHeader
                        badge="Work On Set"
                        title={
                            <>
                                Behind The <span className="italic font-serif text-support">Lens</span>
                            </>
                        }
                        description="A glimpse into the chaotic yet beautiful process of filmmaking. Documenting moments, setups, and the unseen energy behind the camera."
                        align="split"
                    />
                </motion.div>

                {/* Category Filter Pills */}
                <motion.div 
                    variants={filterContainerVariants}
                    className="mb-8 md:mb-12 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
                >
                    {categories.map((cat) => {
                        const isActive = selectedCategory === cat.id;
                        const count = categoryCounts[cat.id] || 0;

                        return (
                            <button
                                key={cat.id}
                                onClick={() => handleCategorySelect(cat.id)}
                                className={`relative group shrink-0 px-3.5 md:px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer select-none flex items-center gap-2 border ${
                                    isActive
                                        ? "text-white border-accent/60 shadow-[0_0_20px_rgba(225,29,72,0.25)]"
                                        : "text-support/70 border-white/5 hover:border-white/20 hover:text-white bg-dark/40"
                                }`}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="activeCategoryBg"
                                        className="absolute inset-0 rounded-full bg-accent/20 -z-10"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span>{cat.label}</span>
                                <span 
                                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono transition-colors ${
                                        isActive 
                                            ? "bg-accent text-white" 
                                            : "bg-white/10 text-support/60 group-hover:text-white"
                                    }`}
                                >
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </motion.div>

                {/* Clean Minimalist Masonry Layout */}
                <motion.div 
                    variants={gridContainerVariants}
                    className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-4"
                >
                    <AnimatePresence mode="popLayout">
                        {displayedImages.map((image) => {
                            const isActive = activeImageId === image.id;

                            return (
                                <motion.div
                                    key={image.id}
                                    layout
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
                                    onClick={() => handleCardClick(image.id)}
                                    style={{ WebkitTapHighlightColor: "transparent" }}
                                    className="group relative w-full overflow-hidden bg-dark rounded-sm cursor-pointer break-inside-avoid mb-4 select-none outline-none focus:outline-none focus:ring-0 active:outline-none"
                                >
                                    {/* Image with smooth grayscale hover transition */}
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        width={image.width || 1200}
                                        height={image.height || 1600}
                                        loading="lazy"
                                        draggable={false}
                                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                        className={`w-full h-auto object-cover select-none pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                            isActive
                                                ? "grayscale-0 scale-105"
                                                : "grayscale md:group-hover:grayscale-0 md:group-hover:scale-105"
                                        }`}
                                    />

                                    {/* Minimalist Dark Gradient & Short Caption */}
                                    <div 
                                        className={`absolute inset-0 bg-linear-to-t from-dark/90 via-dark/25 to-transparent pointer-events-none transition-opacity duration-300 flex items-end p-3 sm:p-3.5 md:p-4 ${
                                            isActive ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
                                        }`}
                                    >
                                        <p 
                                            className={`text-[9px] sm:text-[9.5px] md:text-[10.5px] text-primary/95 font-normal uppercase tracking-[0.15em] sm:tracking-[0.18em] leading-tight line-clamp-2 transition-transform duration-300 ${
                                                isActive ? "translate-y-0 text-white" : "translate-y-1.5 md:group-hover:translate-y-0"
                                            }`}
                                        >
                                            {image.alt}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Progressive Disclosure Button */}
                {hasMore && (
                    <motion.div 
                        variants={filterContainerVariants}
                        className="mt-8 md:mt-12 flex justify-center"
                    >
                        <button
                            onClick={handleToggleExpand}
                            className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs uppercase tracking-[0.25em] font-semibold text-primary bg-dark/90 border border-white/15 hover:border-accent hover:shadow-[0_0_25px_rgba(225,29,72,0.3)] transition-all duration-300 cursor-pointer select-none active:scale-95"
                        >
                            <Layers className="w-4 h-4 text-accent transition-transform duration-300 group-hover:rotate-12" />
                            <span>
                                {isExpanded 
                                    ? "Show Curated Frames" 
                                    : `Explore All Archives (+${remainingCount})`
                                }
                            </span>
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </Section>
    );
};
