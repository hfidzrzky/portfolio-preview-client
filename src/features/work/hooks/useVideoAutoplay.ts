"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseVideoAutoplayProps {
    isActive: boolean;
    threshold?: number;
}

export const useVideoAutoplay = ({
    isActive,
    threshold = 0.4,
}: UseVideoAutoplayProps) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isInView, setIsInView] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isReady, setIsReady] = useState(false);

    // Ref to track play promise and prevent unhandled AbortError race conditions
    const playPromiseRef = useRef<Promise<void> | null>(null);
    const isMountedRef = useRef(true);

    // Viewport Intersection Observer
    useEffect(() => {
        isMountedRef.current = true;
        const target = containerRef.current;
        if (!target) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (isMountedRef.current) {
                    setIsInView(entry.isIntersecting);
                }
            },
            {
                threshold,
                rootMargin: "50px 0px 50px 0px",
            }
        );

        observer.observe(target);

        return () => {
            isMountedRef.current = false;
            observer.disconnect();
        };
    }, [threshold]);

    // Safe Play/Pause Controller with Race Condition Safeguard & Replay Logic
    const safePlay = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = true;
        video.loop = true;

        // If video ended or reached the end, rewind to start
        if (video.ended || (video.duration && video.currentTime >= video.duration - 0.1)) {
            video.currentTime = 0;
        }

        const promise = video.play();
        if (promise !== undefined) {
            playPromiseRef.current = promise;
            promise
                .then(() => {
                    if (isMountedRef.current) {
                        setIsPlaying(true);
                    }
                })
                .catch((error: unknown) => {
                    if (error instanceof Error && error.name === "AbortError") {
                        return;
                    }
                    if (isMountedRef.current) {
                        setIsPlaying(false);
                    }
                });
        }
    }, []);

    const safePause = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        if (playPromiseRef.current !== null) {
            playPromiseRef.current
                .then(() => {
                    video.pause();
                    if (isMountedRef.current) {
                        setIsPlaying(false);
                    }
                })
                .catch(() => {
                    // Swallowed safely
                });
        } else {
            video.pause();
            if (isMountedRef.current) {
                setIsPlaying(false);
            }
        }
    }, []);

    // Sync playback with isActive and isInView status
    useEffect(() => {
        if (isActive && isInView) {
            const video = videoRef.current;
            if (video && (video.ended || video.currentTime > 0)) {
                video.currentTime = 0;
            }
            safePlay();
        } else {
            safePause();
        }

        return () => {
            safePause();
        };
    }, [isActive, isInView, safePlay, safePause]);

    const handleLoadedData = useCallback(() => {
        if (isMountedRef.current) {
            setIsReady(true);
            if (isActive && isInView) {
                safePlay();
            }
        }
    }, [isActive, isInView, safePlay]);

    // Explicit onEnded handler to guarantee seamless looping across all browsers
    const handleEnded = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;
        video.currentTime = 0;
        safePlay();
    }, [safePlay]);

    return {
        videoRef,
        containerRef,
        isInView,
        isPlaying,
        isReady,
        handleLoadedData,
        handleEnded,
    };
};
