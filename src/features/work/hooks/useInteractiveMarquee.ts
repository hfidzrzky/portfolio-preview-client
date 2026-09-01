"use client";

import { useRef, useEffect, useState, useCallback } from "react";

export interface UseInteractiveMarqueeOptions {
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
}

const SPEED_MAP: Record<"fast" | "normal" | "slow", number> = {
    slow: 0.4,
    normal: 0.8,
    fast: 1.4,
};

export const useInteractiveMarquee = ({
    direction = "left",
    speed = "normal",
    pauseOnHover = true,
}: UseInteractiveMarqueeOptions = {}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const track1Ref = useRef<HTMLDivElement>(null);

    // Current continuous offset coordinate
    const xRef = useRef(0);
    const trackWidthRef = useRef(0);
    const isInteractingRef = useRef(false);
    const isHoveredRef = useRef(false);
    const [isDragging, setIsDragging] = useState(false);

    // Drag & Physics refs
    const startXRef = useRef(0);
    const startOffsetRef = useRef(0);
    const lastXRef = useRef(0);
    const lastTimeRef = useRef(0);
    const velocityRef = useRef(0);
    const hasDraggedRef = useRef(false);

    // Touch gesture intent disambiguation (prevent hijacking vertical scroll)
    const touchStartYRef = useRef(0);
    const touchAxisRef = useRef<"horizontal" | "vertical" | null>(null);

    // Timers
    const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isVisibleRef = useRef(false);

    const baseSpeed = SPEED_MAP[speed] || 0.8;
    const dirMultiplier = direction === "right" ? -1 : 1;

    // Normalizes offset seamlessly within single track width
    const normalize = useCallback((pos: number, width: number) => {
        if (width <= 0) return 0;
        return ((pos % width) + width) % width;
    }, []);

    // Apply transform directly to avoid React re-renders and layout thrashing
    const applyTransform = useCallback((pos: number) => {
        if (!innerRef.current) return;
        const width = trackWidthRef.current;
        const normX = width > 0 ? normalize(pos, width) : 0;
        innerRef.current.style.transform = `translate3d(-${normX}px, 0, 0)`;
    }, [normalize]);

    // Measure single track width via ResizeObserver (only on resize/load, not per-frame)
    useEffect(() => {
        const track = track1Ref.current;
        if (!track) return;

        const updateWidth = () => {
            if (track) {
                const width = track.offsetWidth;
                if (width > 0) {
                    trackWidthRef.current = width;
                }
            }
        };

        updateWidth();

        const ro = new ResizeObserver(() => {
            updateWidth();
        });
        ro.observe(track);

        return () => ro.disconnect();
    }, []);

    // IntersectionObserver to only animate when in viewport
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const io = new IntersectionObserver(
            ([entry]) => {
                isVisibleRef.current = entry.isIntersecting;
            },
            { threshold: 0.01 }
        );

        io.observe(container);

        return () => io.disconnect();
    }, []);

    // Main animation loop
    useEffect(() => {
        let animationFrameId: number;

        const tick = () => {
            if (isVisibleRef.current && trackWidthRef.current > 0) {
                if (isInteractingRef.current) {
                    // During active drag/touch/wheel, render position directly
                    applyTransform(xRef.current);
                } else if (Math.abs(velocityRef.current) > 0.05) {
                    // Smooth momentum inertia decay on release
                    xRef.current -= velocityRef.current;
                    velocityRef.current *= 0.94; // Friction
                    applyTransform(xRef.current);
                } else {
                    // Auto-scroll mode
                    velocityRef.current = 0;
                    if (!isHoveredRef.current || !pauseOnHover) {
                        xRef.current += baseSpeed * dirMultiplier;
                    }
                    applyTransform(xRef.current);
                }
            }

            animationFrameId = requestAnimationFrame(tick);
        };

        animationFrameId = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(animationFrameId);
            if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
        };
    }, [baseSpeed, dirMultiplier, pauseOnHover, applyTransform]);

    // Trackpad / Mouse Wheel Handler
    const onWheel = useCallback((e: React.WheelEvent) => {
        const absX = Math.abs(e.deltaX);
        const absY = Math.abs(e.deltaY);

        // Only handle horizontal wheel swiping; allow smooth vertical page scroll
        if (absX > 1 && absX > absY) {
            isInteractingRef.current = true;
            xRef.current += e.deltaX * 0.8;
            velocityRef.current = e.deltaX * 0.2;

            if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
            wheelTimeoutRef.current = setTimeout(() => {
                isInteractingRef.current = false;
            }, 180);
        }
    }, []);

    // Mouse Drag (Desktop)
    const onMouseDown = useCallback((e: React.MouseEvent) => {
        if (e.button !== 0) return; // Only left mouse button

        isInteractingRef.current = true;
        setIsDragging(true);
        hasDraggedRef.current = false;
        velocityRef.current = 0;

        startXRef.current = e.clientX;
        startOffsetRef.current = xRef.current;
        lastXRef.current = e.clientX;
        lastTimeRef.current = performance.now();

        const handleWindowMouseMove = (moveEvent: MouseEvent) => {
            const now = performance.now();
            const deltaX = moveEvent.clientX - lastXRef.current;
            const deltaTime = now - lastTimeRef.current;

            if (deltaTime > 0) {
                // Instant velocity normalized to frame time (~16ms)
                velocityRef.current = (deltaX / deltaTime) * 16;
            }

            lastXRef.current = moveEvent.clientX;
            lastTimeRef.current = now;

            const totalWalk = moveEvent.clientX - startXRef.current;
            if (Math.abs(totalWalk) > 3) {
                hasDraggedRef.current = true;
            }

            xRef.current = startOffsetRef.current - totalWalk;
        };

        const handleWindowMouseUp = () => {
            window.removeEventListener("mousemove", handleWindowMouseMove);
            window.removeEventListener("mouseup", handleWindowMouseUp);

            setIsDragging(false);
            isInteractingRef.current = false;

            // Clamp velocity to avoid extreme throws
            velocityRef.current = Math.max(-25, Math.min(25, velocityRef.current));

            // Reset drag flag shortly after mouse up to let onClickCapture work
            setTimeout(() => {
                hasDraggedRef.current = false;
            }, 60);
        };

        window.addEventListener("mousemove", handleWindowMouseMove);
        window.addEventListener("mouseup", handleWindowMouseUp);
    }, []);

    // Touch Handling (Mobile with Vertical Scroll Protection)
    const onTouchStart = useCallback((e: React.TouchEvent) => {
        if (e.touches.length === 0) return;
        const touch = e.touches[0];

        startXRef.current = touch.clientX;
        touchStartYRef.current = touch.clientY;
        startOffsetRef.current = xRef.current;
        lastXRef.current = touch.clientX;
        lastTimeRef.current = performance.now();
        velocityRef.current = 0;
        touchAxisRef.current = null;
    }, []);

    const onTouchMove = useCallback((e: React.TouchEvent) => {
        if (e.touches.length === 0) return;
        const touch = e.touches[0];

        const deltaX = touch.clientX - startXRef.current;
        const deltaY = touch.clientY - touchStartYRef.current;

        // Disambiguate intention: horizontal swipe vs vertical page scroll
        if (touchAxisRef.current === null) {
            const absX = Math.abs(deltaX);
            const absY = Math.abs(deltaY);

            if (absX > 6 && absX > absY) {
                touchAxisRef.current = "horizontal";
                isInteractingRef.current = true;
            } else if (absY > 6) {
                touchAxisRef.current = "vertical";
                return; // Let browser scroll the page vertically
            }
        }

        if (touchAxisRef.current === "horizontal") {
            const now = performance.now();
            const stepDeltaX = touch.clientX - lastXRef.current;
            const deltaTime = now - lastTimeRef.current;

            if (deltaTime > 0) {
                velocityRef.current = (stepDeltaX / deltaTime) * 16;
            }

            lastXRef.current = touch.clientX;
            lastTimeRef.current = now;

            xRef.current = startOffsetRef.current - deltaX;
        }
    }, []);

    const onTouchEnd = useCallback(() => {
        if (touchAxisRef.current === "horizontal") {
            isInteractingRef.current = false;
            velocityRef.current = Math.max(-20, Math.min(20, velocityRef.current));
        }
        touchAxisRef.current = null;
    }, []);

    const onMouseEnter = useCallback(() => {
        isHoveredRef.current = true;
    }, []);

    const onMouseLeave = useCallback(() => {
        isHoveredRef.current = false;
    }, []);

    const onClickCapture = useCallback((e: React.MouseEvent) => {
        if (hasDraggedRef.current) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, []);

    return {
        containerRef,
        innerRef,
        track1Ref,
        isDragging,
        handlers: {
            onWheel,
            onMouseDown,
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            onMouseEnter,
            onMouseLeave,
            onClickCapture,
        },
    };
};
