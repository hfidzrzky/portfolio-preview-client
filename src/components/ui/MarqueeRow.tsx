"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

export interface MarqueeItem {
    id: number | string;
    src: string;
    alt?: string;
}

interface MarqueeRowProps {
    items: MarqueeItem[];
    direction?: 'left' | 'right';
    speed?: 'fast' | 'normal' | 'slow';
}

export const MarqueeRow = ({ items, direction = 'left', speed = 'normal' }: MarqueeRowProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // KUNCI PERBAIKAN: Ref ini menyimpan posisi desimal murni (mengatasi bug browser)
    const positionRef = useRef(0); 
    const startX = useRef(0);
    const scrollLeftPos = useRef(0);

    const repeatedItems = Array.from({ length: 10 }).flatMap(() => items);
    const speedValue = speed === 'fast' ? 1.5 : speed === 'slow' ? 0.5 : 1;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let animationFrameId: number;
        let isInitialized = false;

        const render = () => {
            // 1. Inisialisasi aman (memastikan container sudah punya scrollWidth)
            if (!isInitialized) {
                if (direction === 'right') {
                    positionRef.current = container.scrollWidth / 2;
                }
                isInitialized = true;
            }

            // 2. Kalkulasi murni di memori JS (Tidak peduli browser membulatkan atau tidak)
            if (!isHovered && !isDragging) {
                if (direction === 'left') {
                    positionRef.current += speedValue;
                    if (positionRef.current >= container.scrollWidth / 2) {
                        positionRef.current -= container.scrollWidth / 2;
                    }
                } else {
                    positionRef.current -= speedValue;
                    if (positionRef.current <= 0) {
                        positionRef.current += container.scrollWidth / 2;
                    }
                }
                // 3. Terapkan hasil kalkulasi ke DOM
                container.scrollLeft = positionRef.current;
                
            } else if (isDragging) {
                // 4. Sinkronisasi saat user menggeser manual agar animasi tidak melompat saat dilepas
                positionRef.current = container.scrollLeft;
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isHovered, isDragging, direction, speedValue]);


    // --- LOGIKA DRAG MANUAL ---
    const onMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        startX.current = e.pageX - (containerRef.current?.offsetLeft || 0);
        scrollLeftPos.current = containerRef.current?.scrollLeft || 0;
    };

    const onMouseLeave = () => {
        setIsDragging(false);
        setIsHovered(false);
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        e.preventDefault();
        const x = e.pageX - (containerRef.current.offsetLeft || 0);
        const walk = (x - startX.current) * 1.5; 
        containerRef.current.scrollLeft = scrollLeftPos.current - walk;
    };

    return (
        <div
            ref={containerRef}
            className="flex w-full overflow-x-auto cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={onMouseLeave}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            <div className="flex w-max">
                {/* BLOK 1 */}
                <div className="flex shrink-0">
                    {repeatedItems.map((item, index) => (
                        <div
                            key={`block1-${item.id}-${index}`}
                            className="relative w-28 md:w-40 lg:w-52 aspect-video bg-zinc-900 overflow-hidden shrink-0"
                        >
                            <Image
                                src={item.src} 
                                alt={item.alt || "Archived Frame"}
                                fill
                                sizes="(max-width: 768px) 112px, (max-width: 1024px) 160px, 208px"
                                // Warna asli sepenuhnya (tanpa grayscale), hanya memainkan opacity
                                className="object-cover opacity-60 hover:opacity-100 transition-all duration-700 pointer-events-none"
                            />
                        </div>
                    ))}
                </div>

                {/* BLOK 2 */}
                <div className="flex shrink-0">
                    {repeatedItems.map((item, index) => (
                        <div
                            key={`block2-${item.id}-${index}`}
                            className="relative w-28 md:w-40 lg:w-52 aspect-video bg-zinc-900 overflow-hidden shrink-0"
                        >
                            <Image
                                src={item.src} 
                                alt={item.alt || "Archived Frame"}
                                fill
                                sizes="(max-width: 768px) 112px, (max-width: 1024px) 160px, 208px"
                                className="object-cover opacity-60 hover:opacity-100 transition-all duration-700 pointer-events-none"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};