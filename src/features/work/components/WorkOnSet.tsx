"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkOnSet } from "../hooks/useWorkOnSet";
import { Section, SectionHeader, ProgressiveImage } from "@/shared/ui";

export const WorkOnSet = () => {
    const {
        tabs,
        activeTab,
        tabCounts,
        displayedImages,
        handleTabSelect,
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

                {/* BTS TAB SWITCHER (BTS 01, BTS 02, BTS 03) */}
                <motion.div 
                    variants={filterContainerVariants}
                    className="mb-8 md:mb-12 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
                >
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        const count = tabCounts[tab.id] || 0;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabSelect(tab.id)}
                                className={`relative group shrink-0 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-colors duration-300 cursor-pointer select-none flex items-center gap-2 border ${
                                    isActive
                                        ? "text-white border-accent/70 shadow-sm"
                                        : "text-support/70 border-white/10 hover:border-white/25 hover:text-white bg-transparent"
                                }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeBtsTabPill"
                                        className="absolute inset-0 rounded-full bg-accent/15 -z-10"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span>{tab.label}</span>
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

                {/* ADAPTIVE CLEAN MASONRY GRID PER BTS TAB - popLayout for zero-latency seamless entrance */}
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={activeTab}
                        variants={gridContainerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-4"
                    >
                        {displayedImages.map((image, idx) => {
                            const aspectRatio = `${image.width || 1200} / ${image.height || 1600}`;

                            return (
                                <motion.div
                                    key={image.id}
                                    variants={cardVariants}
                                    whileHover={{ y: -4 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="group relative w-full overflow-hidden bg-dark rounded-sm break-inside-avoid mb-4 select-none border border-white/[0.04] hover:border-white/20 transition-colors duration-300"
                                >
                                    {/* Progressive Image with skeleton and intrinsic aspect ratio */}
                                    <ProgressiveImage
                                        src={image.src}
                                        alt={image.alt}
                                        width={image.width || 1200}
                                        height={image.height || 1600}
                                        priority={idx < 4}
                                        loading={idx < 4 ? "eager" : "lazy"}
                                        draggable={false}
                                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                        containerClassName="w-full relative"
                                        style={{ aspectRatio }}
                                        className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] scale-100 md:group-hover:scale-105"
                                    />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </Section>
    );
};
