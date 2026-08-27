"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useIntersectionObserver } from "@/shared/hooks";
import { PROJECTS } from "../data/projects.data";

export const useProjectGallery = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isDragging, setIsDragging] = useState(false);

    const isPointerDownRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);
    const lastXRef = useRef(0);
    const lastTimeRef = useRef(0);
    const velocityRef = useRef(0);
    const hasDraggedRef = useRef(false);
    const rafIdRef = useRef<number | null>(null);
    const momentumRafRef = useRef<number | null>(null);

    const [sectionRef, isMarqueeVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 });
    const [galleryRef, isGalleryVisible] = useIntersectionObserver<HTMLDivElement>({
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
    });

    const updateScrollState = useCallback(() => {
        const el = scrollContainerRef.current;
        if (!el) return;

        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll <= 0) {
            setScrollProgress(100);
            setCanScrollLeft(false);
            setCanScrollRight(false);
            return;
        }

        const progress = Math.min(100, Math.max(0, (el.scrollLeft / maxScroll) * 100));
        setScrollProgress(progress);
        setCanScrollLeft(el.scrollLeft > 15);
        setCanScrollRight(el.scrollLeft < maxScroll - 15);
    }, []);

    const onScroll = useCallback(() => {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(() => {
            updateScrollState();
        });
    }, [updateScrollState]);

    // Handle Mouse Wheel: Smooth horizontal conversion
    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;

        const handleWheel = (e: WheelEvent) => {
            // Jika user scroll vertikal di atas gallery
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                const maxScroll = el.scrollWidth - el.clientWidth;
                const isAtStart = el.scrollLeft <= 0 && e.deltaY < 0;
                const isAtEnd = el.scrollLeft >= maxScroll - 1 && e.deltaY > 0;

                // Jika belum mentok, konversi scroll wheel vertikal ke horizontal
                if (!isAtStart && !isAtEnd) {
                    e.preventDefault();
                    el.scrollLeft += e.deltaY * 0.9;
                }
            }
        };

        el.addEventListener("wheel", handleWheel, { passive: false });
        el.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", updateScrollState);
        updateScrollState();

        return () => {
            el.removeEventListener("wheel", handleWheel);
            el.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", updateScrollState);
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
            if (momentumRafRef.current) cancelAnimationFrame(momentumRafRef.current);
        };
    }, [onScroll, updateScrollState]);

    const scrollByStep = useCallback((direction: "left" | "right") => {
        const el = scrollContainerRef.current;
        if (!el) return;
        const cardWidth = el.querySelector<HTMLElement>("[data-project-card]")?.offsetWidth || 400;
        const step = direction === "left" ? -(cardWidth + 24) : (cardWidth + 24);
        el.scrollBy({ left: step, behavior: "smooth" });
    }, []);

    // Drag-to-Scroll Physics with Velocity & Inertia
    const handleMouseDown = (e: React.MouseEvent) => {
        // Hanya trigger jika tombol mouse kiri
        if (e.button !== 0) return;
        const el = scrollContainerRef.current;
        if (!el) return;

        if (momentumRafRef.current) {
            cancelAnimationFrame(momentumRafRef.current);
        }

        isPointerDownRef.current = true;
        hasDraggedRef.current = false;
        startXRef.current = e.pageX;
        scrollLeftRef.current = el.scrollLeft;
        lastXRef.current = e.pageX;
        lastTimeRef.current = performance.now();
        velocityRef.current = 0;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isPointerDownRef.current || !scrollContainerRef.current) return;

        const now = performance.now();
        const deltaX = e.pageX - lastXRef.current;
        const deltaTime = now - lastTimeRef.current;

        if (deltaTime > 0) {
            velocityRef.current = deltaX / deltaTime;
        }

        lastXRef.current = e.pageX;
        lastTimeRef.current = now;

        const walk = e.pageX - startXRef.current;

        if (Math.abs(walk) > 2) {
            hasDraggedRef.current = true;
            if (!isDragging) setIsDragging(true);
            scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
        }
    };

    const applyInertia = () => {
        const el = scrollContainerRef.current;
        if (!el) return;

        let vel = velocityRef.current * 18; // multiplier jarak lemparan
        const friction = 0.94; // faktor redaman momentum

        const step = () => {
            if (Math.abs(vel) < 0.5 || !el) {
                setIsDragging(false);
                setTimeout(() => {
                    hasDraggedRef.current = false;
                }, 50);
                return;
            }

            el.scrollLeft -= vel;
            vel *= friction;
            momentumRafRef.current = requestAnimationFrame(step);
        };

        momentumRafRef.current = requestAnimationFrame(step);
    };

    const handleMouseUpOrLeave = () => {
        if (!isPointerDownRef.current) return;
        isPointerDownRef.current = false;

        if (isDragging && Math.abs(velocityRef.current) > 0.1) {
            applyInertia();
        } else {
            setIsDragging(false);
            setTimeout(() => {
                hasDraggedRef.current = false;
            }, 50);
        }
    };

    const handleClickCapture = (e: React.MouseEvent) => {
        if (hasDraggedRef.current) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    return {
        projects: PROJECTS,
        scrollContainerRef,
        scrollProgress,
        canScrollLeft,
        canScrollRight,
        isDragging,
        isMarqueeVisible,
        isGalleryVisible,
        sectionRef,
        galleryRef,
        scrollByStep,
        handleMouseDown,
        handleMouseMove,
        handleMouseUpOrLeave,
        handleClickCapture,
    };
};
