"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useProjectPreview } from "../context/ProjectPreviewContext";

export const useProjectPreviewModal = () => {
    const {
        isOpen,
        activeProject,
        activeSlideIndex,
        closePreview,
        nextSlide,
        prevSlide,
        setActiveSlideIndex,
    } = useProjectPreview();

    const [isMounted, setIsMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const triggerElementRef = useRef<HTMLElement | null>(null);

    // Ensure portal is mounted reliably on client
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    // Manage focus restoration & body scroll locking with scrollbar width compensation
    useEffect(() => {
        if (!isOpen) return;

        // Save the triggering element so we can restore focus upon modal close
        if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
            triggerElementRef.current = document.activeElement;
        }

        const originalOverflow = document.body.style.overflow;
        const originalPaddingRight = document.body.style.paddingRight;

        // Calculate scrollbar width to prevent desktop layout shift
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
        document.body.style.overflow = "hidden";

        // Focus inside modal once opened
        const focusTimer = setTimeout(() => {
            if (modalRef.current) {
                const focusable = modalRef.current.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                if (focusable.length > 0) {
                    focusable[0].focus();
                } else {
                    modalRef.current.focus();
                }
            }
        }, 50);

        return () => {
            clearTimeout(focusTimer);
            document.body.style.overflow = originalOverflow;
            document.body.style.paddingRight = originalPaddingRight;

            // Restore focus safely
            if (triggerElementRef.current && typeof triggerElementRef.current.focus === "function") {
                triggerElementRef.current.focus();
            }
        };
    }, [isOpen]);

    // Handle global keyboard shortcuts & focus trap
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === "Escape") {
                e.preventDefault();
                closePreview();
                return;
            }

            if (e.key === "ArrowRight") {
                e.preventDefault();
                nextSlide();
                return;
            }

            if (e.key === "ArrowLeft") {
                e.preventDefault();
                prevSlide();
                return;
            }

            // Focus trap inside modal dialog
            if (e.key === "Tab" && modalRef.current) {
                const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
                    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
                );
                if (focusableElements.length === 0) return;

                const firstEl = focusableElements[0];
                const lastEl = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstEl) {
                        e.preventDefault();
                        lastEl.focus();
                    }
                } else {
                    if (document.activeElement === lastEl) {
                        e.preventDefault();
                        firstEl.focus();
                    }
                }
            }
        },
        [isOpen, closePreview, nextSlide, prevSlide]
    );

    useEffect(() => {
        if (!isOpen) return;
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);

    return {
        isMounted,
        isOpen,
        activeProject,
        activeSlideIndex,
        modalRef,
        closePreview,
        nextSlide,
        prevSlide,
        setActiveSlideIndex,
    };
};
