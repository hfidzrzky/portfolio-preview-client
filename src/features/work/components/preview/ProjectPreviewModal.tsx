"use client";

import React, { memo, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useProjectPreviewModal } from "../../hooks/useProjectPreviewModal";
import { ProjectPreviewMedia } from "./ProjectPreviewMedia";

const isSafeUrl = (url?: string): boolean => {
    if (!url || url === "#") return false;
    return url.startsWith("https://") || url.startsWith("http://") || url.startsWith("/");
};

export const ProjectPreviewModal = memo(() => {
    const {
        isMounted,
        isOpen,
        activeProject,
        activeSlideIndex,
        modalRef,
        closePreview,
        nextSlide,
        prevSlide,
        setActiveSlideIndex,
    } = useProjectPreviewModal();

    const touchStartXRef = useRef(0);
    const touchStartYRef = useRef(0);

    if (!isMounted) return null;

    const mediaList = activeProject?.media || [];
    const hasMultipleMedia = mediaList.length > 1;
    const currentMediaItem = mediaList[activeSlideIndex] || mediaList[0];
    const hasValidExternalLink = isSafeUrl(activeProject?.url);

    // Mobile touch swipe gestures
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartXRef.current = e.touches[0].clientX;
        touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const deltaX = touchStartXRef.current - e.changedTouches[0].clientX;
        const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
            if (deltaX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    };

    return createPortal(
        <AnimatePresence mode="wait">
            {isOpen && activeProject && (
                <div
                    className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-6 md:p-8"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="preview-modal-title"
                >
                    {/* Cinematic Frosted Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        onClick={closePreview}
                        className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
                    />

                    {/* Modal Window Container */}
                    <motion.div
                        ref={modalRef}
                        tabIndex={-1}
                        initial={{ opacity: 0, scale: 0.96, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: 8 }}
                        transition={{
                            type: "spring",
                            damping: 26,
                            stiffness: 320,
                            mass: 0.8,
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative z-10 w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#0d0d0d] border border-white/10 rounded-xl shadow-2xl shadow-black/95 overflow-hidden outline-none"
                    >
                        {/* Header Bar */}
                        <div className="flex items-center justify-between px-5 py-3.5 sm:px-6 sm:py-4 border-b border-white/10 bg-black/50">
                            <div className="flex flex-col gap-1 pr-4 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent drop-shadow-glow-red" />
                                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
                                        Selected Work Preview
                                    </span>
                                </div>
                                <h2
                                    id="preview-modal-title"
                                    className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-wider text-white truncate"
                                >
                                    {activeProject.title}
                                </h2>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono tracking-widest text-zinc-400 bg-white/5 border border-white/10 rounded">
                                    ESC
                                </span>
                                <button
                                    type="button"
                                    onClick={closePreview}
                                    aria-label="Close modal preview"
                                    className="p-1.5 sm:p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-accent"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Visual Media Viewport */}
                        <div
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                            className="relative w-full aspect-video sm:max-h-[62vh] bg-black flex items-center justify-center overflow-hidden"
                        >
                            <AnimatePresence mode="wait">
                                {currentMediaItem ? (
                                    <motion.div
                                        key={`${activeProject.id}-${activeSlideIndex}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.15, ease: "easeOut" }}
                                        className="w-full h-full"
                                    >
                                        <ProjectPreviewMedia
                                            item={currentMediaItem}
                                            projectTitle={activeProject.title}
                                            fitMode={activeProject.fitMode}
                                            rotate={activeProject.rotate}
                                        />
                                    </motion.div>
                                ) : null}
                            </AnimatePresence>

                            {/* Previous Slide Arrow Button */}
                            {hasMultipleMedia && (
                                <button
                                    type="button"
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        prevSlide();
                                    }}
                                    aria-label="Previous media slide"
                                    className="absolute left-3 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/75 hover:bg-accent text-white flex items-center justify-center border border-white/20 hover:border-accent transition-all duration-200 backdrop-blur-md cursor-pointer shadow-xl active:scale-95 group focus:outline-none focus:ring-1 focus:ring-accent"
                                >
                                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:-translate-x-0.5" />
                                </button>
                            )}

                            {/* Next Slide Arrow Button */}
                            {hasMultipleMedia && (
                                <button
                                    type="button"
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        nextSlide();
                                    }}
                                    aria-label="Next media slide"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/75 hover:bg-accent text-white flex items-center justify-center border border-white/20 hover:border-accent transition-all duration-200 backdrop-blur-md cursor-pointer shadow-xl active:scale-95 group focus:outline-none focus:ring-1 focus:ring-accent"
                                >
                                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:translate-x-0.5" />
                                </button>
                            )}
                        </div>

                        {/* Footer Bar with Roles & Indicators */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-3.5 sm:px-6 sm:py-4 border-t border-white/10 bg-black/60">
                            {/* Role Badges */}
                            <div className="flex flex-wrap items-center gap-1.5">
                                {activeProject.roles?.map((role, idx) => (
                                    <span
                                        key={`modal-role-${idx}`}
                                        className="inline-flex items-center px-2.5 py-0.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-accent bg-accent/10 border border-accent/30 rounded-full"
                                    >
                                        {role}
                                    </span>
                                ))}
                            </div>

                            {/* Navigation Indicators & External CTA */}
                            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                {hasMultipleMedia && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-mono text-zinc-300 font-semibold tracking-wider">
                                            {activeSlideIndex + 1} / {mediaList.length}
                                        </span>
                                        <div className="flex items-center gap-1.5 ml-1">
                                            {mediaList.map((item, idx) => (
                                                <button
                                                    key={item.id || idx}
                                                    type="button"
                                                    onClick={() => setActiveSlideIndex(idx)}
                                                    aria-label={`Jump to slide ${idx + 1}`}
                                                    className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                                                        idx === activeSlideIndex
                                                            ? "w-5 h-1.5 bg-accent drop-shadow-glow-red"
                                                            : "w-1.5 h-1.5 bg-white/30 hover:bg-white/70"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {hasValidExternalLink && (
                                    <a
                                        href={activeProject.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white hover:text-accent transition-colors duration-200"
                                    >
                                        <span>Open Link</span>
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
});

ProjectPreviewModal.displayName = "ProjectPreviewModal";
