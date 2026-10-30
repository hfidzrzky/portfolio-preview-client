"use client";

import React, { memo, useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Loader2 } from "lucide-react";
import type { ProjectMediaItem, MediaFitMode, MediaRotation } from "../../types";

interface ProjectPreviewMediaProps {
    item: ProjectMediaItem;
    projectTitle: string;
    fitMode?: MediaFitMode;
    rotate?: MediaRotation;
}

const formatTime = (timeInSeconds: number): string => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const getMediaTransformClass = (isContain: boolean, rotate?: MediaRotation) => {
    if (rotate === -90 || rotate === 270) {
        return "-rotate-90 w-[56.25%] h-[177.78%] max-w-none object-cover";
    }
    if (rotate === 90) {
        return "rotate-90 w-[56.25%] h-[177.78%] max-w-none object-cover";
    }
    if (rotate === 180) {
        return "rotate-180 w-full h-full " + (isContain ? "object-contain" : "object-cover");
    }
    return `w-full h-full ${isContain ? "object-contain" : "object-cover"}`;
};

export const ProjectPreviewMedia = memo(({
    item,
    projectTitle,
    fitMode = "contain",
    rotate,
}: ProjectPreviewMediaProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(true);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [isBuffering, setIsBuffering] = useState<boolean>(false);
    const [showControls, setShowControls] = useState<boolean>(true);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

    const isSeekingRef = useRef<boolean>(false);
    const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const activeFitMode = item.fitMode || fitMode;
    const activeRotate = item.rotate ?? rotate;
    const isContain = activeFitMode === "contain";
    const mediaTransformClass = getMediaTransformClass(isContain, activeRotate);

    // Auto-hide controls during active playback
    const resetControlsTimer = useCallback(() => {
        setShowControls(true);
        if (hideControlsTimeoutRef.current) {
            clearTimeout(hideControlsTimeoutRef.current);
        }
        if (isPlaying) {
            hideControlsTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
            }, 3000);
        }
    }, [isPlaying]);

    // Reliable play/pause controller
    const handleTogglePlay = useCallback(async () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            try {
                await video.play();
                setIsPlaying(true);
                setIsBuffering(false);
            } catch {
                // If blocked due to sound, mute and play
                if (!video.muted) {
                    video.muted = true;
                    setIsMuted(true);
                    video.play().catch(() => {});
                }
                setIsBuffering(false);
            }
        } else {
            video.pause();
            setIsPlaying(false);
        }
        resetControlsTimer();
    }, [resetControlsTimer]);

    const handleToggleMute = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = !video.muted;
        setIsMuted(video.muted);
        resetControlsTimer();
    }, [resetControlsTimer]);

    const handleToggleFullscreen = useCallback(async () => {
        const container = containerRef.current;
        if (!container) return;

        try {
            if (!document.fullscreenElement) {
                await container.requestFullscreen();
                setIsFullscreen(true);
            } else {
                await document.exitFullscreen();
                setIsFullscreen(false);
            }
        } catch (err) {
            console.warn("Fullscreen request error", err);
        }
    }, []);

    useEffect(() => {
        const onFullscreenChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement));
        };
        document.addEventListener("fullscreenchange", onFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", onFullscreenChange);
        };
    }, []);

    // Timeline Scrubber
    const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
        const progressBar = progressBarRef.current;
        const video = videoRef.current;
        if (!progressBar || !video || !duration) return;

        const rect = progressBar.getBoundingClientRect();
        const offsetX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percentage = offsetX / rect.width;
        const targetTime = percentage * duration;

        video.currentTime = targetTime;
        setCurrentTime(targetTime);
    }, [duration]);

    const handleProgressBarMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        isSeekingRef.current = true;
        handleSeek(e);

        const onMouseMove = (moveEvent: MouseEvent) => {
            if (isSeekingRef.current) {
                handleSeek(moveEvent);
            }
        };

        const onMouseUp = () => {
            isSeekingRef.current = false;
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    // Video Lifecycle & Event Handlers (Fixed: Checks readyState immediately to prevent infinite loading)
    useEffect(() => {
        if (item.type !== "video") return;

        const video = videoRef.current;
        if (!video) return;

        // Force browser property mute for reliable autoplay policy bypass
        video.muted = true;
        video.defaultMuted = true;
        setIsMuted(true);

        const syncMetadata = () => {
            if (video.duration && !isNaN(video.duration)) {
                setDuration(video.duration);
            }
        };

        const onLoadedMetadata = () => {
            syncMetadata();
        };

        const onCanPlay = () => {
            setIsBuffering(false);
            syncMetadata();
        };

        const onPlaying = () => {
            setIsPlaying(true);
            setIsBuffering(false);
        };

        const onPause = () => {
            setIsPlaying(false);
        };

        const onWaiting = () => {
            // Only set buffering if video is actually paused waiting for data
            if (video.readyState < 3) {
                setIsBuffering(true);
            }
        };

        const onTimeUpdate = () => {
            if (!isSeekingRef.current) {
                setCurrentTime(video.currentTime);
            }
        };

        const onEnded = () => {
            setIsPlaying(false);
        };

        video.addEventListener("loadedmetadata", onLoadedMetadata);
        video.addEventListener("canplay", onCanPlay);
        video.addEventListener("playing", onPlaying);
        video.addEventListener("pause", onPause);
        video.addEventListener("waiting", onWaiting);
        video.addEventListener("timeupdate", onTimeUpdate);
        video.addEventListener("ended", onEnded);

        // Immediate check: If video was already cached from card preview, readyState is already >= 1!
        syncMetadata();
        if (video.readyState >= 2) {
            setIsBuffering(false);
        }

        // Start playing immediately
        const startAutoplay = async () => {
            try {
                await video.play();
                setIsPlaying(true);
                setIsBuffering(false);
            } catch {
                // If autoplay blocked, ensure buffering spinner is hidden so user sees frame & play button
                setIsPlaying(false);
                setIsBuffering(false);
            }
        };

        startAutoplay();

        return () => {
            video.removeEventListener("loadedmetadata", onLoadedMetadata);
            video.removeEventListener("canplay", onCanPlay);
            video.removeEventListener("playing", onPlaying);
            video.removeEventListener("pause", onPause);
            video.removeEventListener("waiting", onWaiting);
            video.removeEventListener("timeupdate", onTimeUpdate);
            video.removeEventListener("ended", onEnded);

            if (hideControlsTimeoutRef.current) {
                clearTimeout(hideControlsTimeoutRef.current);
            }
            // Pause cleanly on slide unmount, do NOT wipe video.src to preserve browser media cache!
            video.pause();
        };
    }, [item.src, item.type]);

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    // Image Render
    if (item.type === "image") {
        return (
            <div
                ref={containerRef}
                className="relative w-full h-full flex items-center justify-center bg-black/95 overflow-hidden select-none"
            >
                {/* Ambient Backlight Glow */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 blur-3xl scale-125">
                    <Image
                        src={item.src}
                        alt=""
                        fill
                        sizes="20vw"
                        className="object-cover brightness-40"
                    />
                </div>

                <div className="relative w-full h-full max-h-[75vh] flex items-center justify-center p-2 sm:p-4 z-10">
                    <Image
                        src={item.src}
                        alt={item.alt || `${projectTitle} preview frame`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 85vw"
                        priority
                        className={`object-contain transition-transform duration-500 ${mediaTransformClass}`}
                    />
                </div>
            </div>
        );
    }

    // Video Render
    return (
        <div
            ref={containerRef}
            onMouseMove={resetControlsTimer}
            onMouseEnter={resetControlsTimer}
            onClick={handleTogglePlay}
            className="group/player relative w-full h-full flex items-center justify-center bg-black/95 overflow-hidden select-none cursor-pointer"
        >
            {/* Ambient Backlight for cinematic immersion */}
            {item.poster && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25 blur-3xl scale-125 transition-opacity duration-700">
                    <Image
                        src={item.poster}
                        alt=""
                        fill
                        sizes="20vw"
                        className="object-cover brightness-40"
                    />
                </div>
            )}

            {/* Hardware-accelerated HTML5 Video Element */}
            <video
                ref={videoRef}
                src={item.src}
                poster={item.poster}
                playsInline
                muted={isMuted}
                loop
                preload="auto"
                className={`relative z-10 max-h-[75vh] w-full h-full transition-all duration-300 ${mediaTransformClass}`}
            />

            {/* Central Buffering Spinner (Only while genuinely stalled, never stuck) */}
            {isBuffering && (
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none bg-black/40 backdrop-blur-[2px]">
                    <Loader2 className="w-10 h-10 text-accent animate-spin" />
                </div>
            )}

            {/* Central Big Play Icon (Shown when paused and not buffering) */}
            {!isPlaying && !isBuffering && (
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl transition-transform duration-200 group-hover/player:scale-110">
                        <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white text-white translate-x-0.5" />
                    </div>
                </div>
            )}

            {/* Top Bar Vignette */}
            <div
                className={`absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/80 via-black/40 to-transparent pointer-events-none z-20 transition-opacity duration-300 ${
                    showControls ? "opacity-100" : "opacity-0"
                }`}
            />

            {/* Bottom Controls Bar Overlay */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`absolute inset-x-0 bottom-0 z-30 px-4 sm:px-6 pt-12 pb-4 bg-linear-to-t from-black/95 via-black/70 to-transparent transition-opacity duration-300 flex flex-col gap-2 ${
                    showControls ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            >
                {/* Timeline Scrubber */}
                <div
                    ref={progressBarRef}
                    onMouseDown={handleProgressBarMouseDown}
                    className="relative w-full h-2 group/scrubber cursor-pointer flex items-center py-2"
                >
                    <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden transition-all duration-200 group-hover/scrubber:h-1.5">
                        <div
                            className="h-full bg-accent relative transition-all duration-75"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                    {/* Scrub Handle Head */}
                    <div
                        className="absolute w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover/scrubber:scale-100 -translate-x-1/2 transition-transform duration-150 pointer-events-none"
                        style={{ left: `${progressPercentage}%` }}
                    />
                </div>

                {/* Control Action Buttons & Time Metadata */}
                <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handleTogglePlay}
                            aria-label={isPlaying ? "Pause video" : "Play video"}
                            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer"
                        >
                            {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                        </button>

                        <button
                            type="button"
                            onClick={handleToggleMute}
                            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer"
                        >
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>

                        <span className="text-[11px] tracking-wider text-zinc-400 select-none">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleToggleFullscreen}
                            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer"
                        >
                            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

ProjectPreviewMedia.displayName = "ProjectPreviewMedia";
