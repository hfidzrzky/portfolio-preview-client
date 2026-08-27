"use client";

import { useRef, useEffect, useCallback } from "react";

export interface UseArchivedMarqueeProps {
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
}

export const useArchivedMarquee = ({
    direction = "left",
    speed = "normal",
}: UseArchivedMarqueeProps = {}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInteractingRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftPosRef = useRef(0);
    const hasDraggedRef = useRef(false);
    const lastXRef = useRef(0);
    const lastTimeRef = useRef(0);
    const velocityRef = useRef(0);

    const speedRef = useRef(speed);
    const directionRef = useRef(direction);

    // Sync props to refs inside effect to adhere to React pure render rules
    useEffect(() => {
        speedRef.current = speed;
        directionRef.current = direction;
    }, [speed, direction]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let animationFrameId: number;
        let position = container.scrollLeft;

        // Inisialisasi awal ke tengah jika scroll direction right agar tidak langsung 0
        const halfWidth = container.scrollWidth / 2;
        if (halfWidth > 0 && container.scrollLeft === 0 && directionRef.current === "right") {
            container.scrollLeft = halfWidth;
            position = halfWidth;
        }

        const render = () => {
            const currentHalfWidth = container.scrollWidth / 2;

            if (currentHalfWidth > 0) {
                if (isInteractingRef.current) {
                    // Selama user drag/touch, sinkronkan posisi aktual dengan normalisasi modulo aman
                    position = ((container.scrollLeft % currentHalfWidth) + currentHalfWidth) % currentHalfWidth;
                } else {
                    // Auto-scroll berkelanjutan
                    const delta = (speedRef.current === "fast" ? 1.5 : speedRef.current === "slow" ? 0.5 : 1) *
                                  (directionRef.current === "left" ? 1 : -1);

                    position += delta;

                    // Wrapping seamless tak terbatas (infinite modulo boundary)
                    if (position >= currentHalfWidth) {
                        position -= currentHalfWidth;
                    } else if (position < 0) {
                        position += currentHalfWidth;
                    }

                    container.scrollLeft = position;
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        if (e.button !== 0) return;
        const container = containerRef.current;
        if (!container) return;

        isInteractingRef.current = true;
        hasDraggedRef.current = false;
        startXRef.current = e.pageX;
        scrollLeftPosRef.current = container.scrollLeft;
        lastXRef.current = e.pageX;
        lastTimeRef.current = performance.now();
        velocityRef.current = 0;
    }, []);

    const onMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isInteractingRef.current || !containerRef.current) return;

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
            containerRef.current.scrollLeft = scrollLeftPosRef.current - walk;
        }
    }, []);

    const onMouseUpOrLeave = useCallback(() => {
        if (!isInteractingRef.current) return;
        isInteractingRef.current = false;

        // Normalisasi posisi agar tidak loncat saat beralih kembali ke auto-scroll
        const container = containerRef.current;
        if (container) {
            const halfWidth = container.scrollWidth / 2;
            if (halfWidth > 0) {
                container.scrollLeft = ((container.scrollLeft % halfWidth) + halfWidth) % halfWidth;
            }
        }
    }, []);

    const onTouchStart = useCallback((e: React.TouchEvent) => {
        const container = containerRef.current;
        if (!container || e.touches.length === 0) return;

        isInteractingRef.current = true;
        startXRef.current = e.touches[0].pageX;
        scrollLeftPosRef.current = container.scrollLeft;
    }, []);

    const onTouchMove = useCallback((e: React.TouchEvent) => {
        if (!isInteractingRef.current || !containerRef.current || e.touches.length === 0) return;

        const walk = e.touches[0].pageX - startXRef.current;
        containerRef.current.scrollLeft = scrollLeftPosRef.current - walk;
    }, []);

    const onTouchEnd = useCallback(() => {
        isInteractingRef.current = false;
        const container = containerRef.current;
        if (container) {
            const halfWidth = container.scrollWidth / 2;
            if (halfWidth > 0) {
                container.scrollLeft = ((container.scrollLeft % halfWidth) + halfWidth) % halfWidth;
            }
        }
    }, []);

    return {
        containerRef,
        onMouseDown,
        onMouseMove,
        onMouseUp: onMouseUpOrLeave,
        onMouseLeave: onMouseUpOrLeave,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
    };
};
