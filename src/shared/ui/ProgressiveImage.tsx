"use client";

import React, { useState, memo } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/shared/lib";

export interface ProgressiveImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
    containerClassName?: string;
    showSkeleton?: boolean;
    skeletonClassName?: string;
    onLoad?: () => void;
    onError?: () => void;
}

export const ProgressiveImage = memo(({
    src,
    alt,
    className,
    containerClassName,
    showSkeleton = true,
    skeletonClassName,
    priority = false,
    loading,
    unoptimized = false,
    onLoad,
    onError,
    ...rest
}: ProgressiveImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setIsLoaded(true);
        onLoad?.();
    };

    const handleError = () => {
        setHasError(true);
        onError?.();
    };

    return (
        <div className={cn("relative overflow-hidden bg-zinc-950/60", containerClassName)}>
            {/* Skeleton Shimmer Placeholder */}
            {showSkeleton && !isLoaded && !hasError && (
                <div
                    className={cn(
                        "absolute inset-0 z-0 bg-white/3 animate-pulse pointer-events-none",
                        skeletonClassName
                    )}
                />
            )}

            {/* Error Fallback */}
            {hasError ? (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50 text-support/40 text-xs font-mono">
                    <span>Image unavailable</span>
                </div>
            ) : (
                <Image
                    src={src}
                    alt={alt}
                    priority={priority}
                    loading={loading}
                    unoptimized={unoptimized}
                    onLoad={handleLoad}
                    onError={handleError}
                    className={cn(
                        "transition-opacity duration-500 ease-out",
                        isLoaded ? "opacity-100" : "opacity-0",
                        className
                    )}
                    {...rest}
                />
            )}
        </div>
    );
});

ProgressiveImage.displayName = "ProgressiveImage";
