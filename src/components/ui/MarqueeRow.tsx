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
    const [isTouching, setIsTouching] = useState(false);
    const touchTimeout = useRef<NodeJS.Timeout | null>(null);

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
            // 1. Inisialisasi posisi awal secara aman
            if (!isInitialized) {
                if (direction === 'right') {
                    positionRef.current = container.scrollWidth / 2;
                }
                isInitialized = true;
            }

            // 2. KUNCI REFAKTOR: Tambahkan kondisi 'isTouching'
            // Kita berhenti melakukan animasi otomatis JIKA:
            // - Sedang di-hover (Desktop)
            // - Sedang di-drag mouse (Desktop)
            // - Sedang disentuh/meluncur (Mobile)
            if (isHovered || isDragging || isTouching) {
                // SELAMA interaksi manual, JavaScript hanya bertugas "mencatat" posisi scroll
                // agar saat dilepas, animasi tahu harus lanjut dari mana.
                positionRef.current = container.scrollLeft;
            } else {
                // 3. Animasi Otomatis (Hanya jalan jika benar-benar tidak ada interaksi)
                const factor = direction === 'left' ? 1 : -1;
                positionRef.current += speedValue * factor;

                // Handle Infinite Loop (Reset posisi jika sudah mencapai setengah konten)
                if (direction === 'left' && positionRef.current >= container.scrollWidth / 2) {
                    positionRef.current -= container.scrollWidth / 2;
                } else if (direction === 'right' && positionRef.current <= 0) {
                    positionRef.current += container.scrollWidth / 2;
                }

                // Terapkan ke DOM
                container.scrollLeft = positionRef.current;
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isHovered, isDragging, isTouching, direction, speedValue]);


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

    const onTouchStart = () => {
        setIsTouching(true);
        if (touchTimeout.current) clearTimeout(touchTimeout.current);
    };

    const onTouchEnd = () => {
        // Memberikan jeda 800ms agar efek meluncur HP selesai sebelum JS mengambil alih
        touchTimeout.current = setTimeout(() => {
            setIsTouching(false);
        }, 800);
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
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            <div className="flex w-max">
                {/* BLOK 1 */}
                <div className="flex shrink-0">
                    {repeatedItems.map((item, index) => (
                        <div
                            key={`block1-${item.id}-${index}`}
                            className="relative w-40 md:w-56 lg:w-72 aspect-video bg-zinc-900 overflow-hidden shrink-0"
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
                            className="relative w-40 md:w-56 lg:w-72 aspect-video bg-zinc-900 overflow-hidden shrink-0"
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