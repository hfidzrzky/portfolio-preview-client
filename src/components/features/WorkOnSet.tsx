"use client"; 

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { WORK_ON_SET_IMAGES } from '@/constants/work-on-set';

export const WorkOnSet = () => {
    // --- ANIMATION LOGIC ---
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="work-on-set" className="relative min-h-screen py-24 bg-dark overflow-hidden border-t border-white/5">
            <div className="max-w-6xl mx-auto w-full px-6 md:px-16">
                
                <div className={`mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div>
                        <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] text-accent flex items-center gap-4 font-bold mb-4">
                            <span className="w-12 border-b border-accent drop-shadow-glow-red"></span>
                            Work On Set
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-light text-primary uppercase tracking-wide">
                            Behind The <span className="italic font-serif text-support">Lens</span>
                        </h3>
                    </div>
                    <p className="text-sm font-light text-support/60 max-w-sm leading-relaxed">
                        A glimpse into the chaotic yet beautiful process of filmmaking. Documenting moments, setups, and the unseen energy behind the camera.
                    </p>
                </div>

                {/* MASONRY LAYOUT */}
                <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
                    {WORK_ON_SET_IMAGES.map((image, index) => {
                        // KUNCI FIX: Memastikan rasio dihitung sebagai angka desimal murni. 
                        // Jika di constant lupa diisi, otomatis fallback ke rasio 16/9
                        const calculatedRatio = (image.width || 16) / (image.height || 9);

                        return (
                            <div 
                                key={image.id} 
                                style={{ 
                                    aspectRatio: calculatedRatio,
                                    transitionDelay: `${index * 150}ms` 
                                }}
                                className={`group relative w-full overflow-hidden bg-zinc-900 rounded-sm cursor-pointer break-inside-avoid shadow-lg mb-4 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'}`}
                            >
                                <Image 
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    // KUNCI FIX 2: Menghapus opacity awal agar gambar dijamin terlihat jelas
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                />
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                                    <p className="text-[10px] text-primary uppercase tracking-[0.2em] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        {image.alt}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};