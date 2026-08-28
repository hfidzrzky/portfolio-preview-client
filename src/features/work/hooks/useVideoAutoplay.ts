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

    // Strict state refs to prevent async race condition during fast scrolling
    const shouldPlayRef = useRef(false);
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

    // Safe Play Controller with Intended State Verification
    const safePlay = useCallback(() => {
        shouldPlayRef.current = true;
        const video = videoRef.current;
        if (!video) return;

        video.muted = true;
        video.loop = true;

        // If video ended or reached near the end, rewind
        if (video.ended || (video.duration && video.currentTime >= video.duration - 0.1)) {
            video.currentTime = 0;
        }

        const promise = video.play();
        if (promise !== undefined) {
            playPromiseRef.current = promise;
            promise
                .then(() => {
                    // Critical: Verify if user scrolled away while the promise was resolving
                    if (!shouldPlayRef.current) {
                        video.pause();
                        if (isMountedRef.current) setIsPlaying(false);
                    } else {
                        if (isMountedRef.current) setIsPlaying(true);
                    }
                })
                .catch((error: unknown) => {
                    if (error instanceof Error && error.name === "AbortError") {
                        // If interrupted by rapid scroll, but user is currently back on this video, retry play
                        if (shouldPlayRef.current && isMountedRef.current) {
                            setTimeout(() => {
                                if (shouldPlayRef.current) {
                                    video.play().catch(() => {});
                                }
                            }, 50);
                        }
                        return;
                    }
                    if (isMountedRef.current) {
                        setIsPlaying(false);
                    }
                });
        }
    }, []);

    // Safe Pause Controller preventing stale callback interruptions
    const safePause = useCallback(() => {
        shouldPlayRef.current = false;
        const video = videoRef.current;
        if (!video) return;

        if (playPromiseRef.current !== null) {
            playPromiseRef.current
                .then(() => {
                    // Only pause if user STILL wants it paused (not rapidly returned)
                    if (!shouldPlayRef.current) {
                        video.pause();
                        if (isMountedRef.current) {
                            setIsPlaying(false);
                        }
                    }
                })
                .catch(() => {
                    if (!shouldPlayRef.current) {
                        video.pause();
                        if (isMountedRef.current) {
                            setIsPlaying(false);
                        }
                    }
                });
        } else {
            video.pause();
            if (isMountedRef.current) {
                setIsPlaying(false);
            }
        }
    }, []);

    // Sync playback state with active slide & viewport visibility
    useEffect(() => {
        if (isActive && isInView) {
            shouldPlayRef.current = true;
            const video = videoRef.current;
            if (video && (video.ended || video.currentTime > 0)) {
                video.currentTime = 0;
            }
            safePlay();
        } else {
            shouldPlayRef.current = false;
            safePause();
        }

        return () => {
            shouldPlayRef.current = false;
            safePause();
        };
    }, [isActive, isInView, safePlay, safePause]);

    const handleLoadedData = useCallback(() => {
        if (isMountedRef.current) {
            setIsReady(true);
            if (isActive && isInView && shouldPlayRef.current) {
                safePlay();
            }
        }
    }, [isActive, isInView, safePlay]);

    // Explicit onEnded handler for continuous seamless loop
    const handleEnded = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;
        video.currentTime = 0;
        if (shouldPlayRef.current) {
            safePlay();
        }
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
