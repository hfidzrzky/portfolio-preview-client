"use client";

import { useState, useCallback, useRef } from "react";

interface UseProjectCarouselProps {
    totalItems: number;
}

export const useProjectCarousel = ({ totalItems }: UseProjectCarouselProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDraggingMouse, setIsDraggingMouse] = useState(false);

    // Touch refs
    const touchStartXRef = useRef(0);
    const touchStartYRef = useRef(0);
    const isSwipingRef = useRef(false);

    // Mouse drag refs
    const isMouseDownRef = useRef(false);
    const mouseStartXRef = useRef(0);
    const hasMouseDraggedRef = useRef(false);
    const lastWheelTimeRef = useRef(0);

    const goToNext = useCallback((e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        setActiveIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
    }, [totalItems]);

    const goToPrev = useCallback((e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
    }, [totalItems]);

    const goToIndex = useCallback((index: number, e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        if (index >= 0 && index < totalItems) {
            setActiveIndex(index);
        }
    }, [totalItems]);

    // Touch / Swipe handler isolated for mobile/tablet
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStartXRef.current = e.touches[0].clientX;
        touchStartYRef.current = e.touches[0].clientY;
        isSwipingRef.current = true;
    }, []);

    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        if (!isSwipingRef.current) return;
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const deltaX = touchStartXRef.current - touchEndX;
        const deltaY = touchStartYRef.current - touchEndY;

        // Ensure horizontal swipe is dominant and exceeds minimum threshold
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
            if (deltaX > 0) {
                goToNext();
            } else {
                goToPrev();
            }
        }
        isSwipingRef.current = false;
    }, [goToNext, goToPrev]);

    // Desktop Mouse Click & Drag Handler
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (e.button !== 0) return; // Only left click
        e.stopPropagation(); // Isolate from parent row drag
        isMouseDownRef.current = true;
        hasMouseDraggedRef.current = false;
        mouseStartXRef.current = e.pageX;
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isMouseDownRef.current) return;
        e.stopPropagation();
        const delta = e.pageX - mouseStartXRef.current;
        if (Math.abs(delta) > 5 && !hasMouseDraggedRef.current) {
            hasMouseDraggedRef.current = true;
            setIsDraggingMouse(true);
        }
    }, []);

    const handleMouseUpOrLeave = useCallback((e: React.MouseEvent) => {
        if (!isMouseDownRef.current) return;
        e.stopPropagation();

        if (hasMouseDraggedRef.current) {
            const deltaX = mouseStartXRef.current - e.pageX;
            if (Math.abs(deltaX) >= 35) {
                if (deltaX > 0) {
                    goToNext();
                } else {
                    goToPrev();
                }
            }
        }

        isMouseDownRef.current = false;
        setIsDraggingMouse(false);
        setTimeout(() => {
            hasMouseDraggedRef.current = false;
        }, 50);
    }, [goToNext, goToPrev]);

    const handleClickCapture = useCallback((e: React.MouseEvent) => {
        if (hasMouseDraggedRef.current) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, []);

    // Trackpad Horizontal 2-Finger Swipe over Card Media
    const handleWheel = useCallback((e: React.WheelEvent) => {
        if (Math.abs(e.deltaX) > 25 && Math.abs(e.deltaX) > Math.abs(e.deltaY) * 2) {
            const now = performance.now();
            if (now - lastWheelTimeRef.current > 350) {
                lastWheelTimeRef.current = now;
                if (e.deltaX > 0) {
                    goToNext();
                } else {
                    goToPrev();
                }
            }
        }
    }, [goToNext, goToPrev]);

    return {
        activeIndex,
        isDraggingMouse,
        goToNext,
        goToPrev,
        goToIndex,
        handleTouchStart,
        handleTouchEnd,
        handleMouseDown,
        handleMouseMove,
        handleMouseUpOrLeave,
        handleClickCapture,
        handleWheel,
    };
};
