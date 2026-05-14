"use client"; 

import React, { useState, useRef, useEffect } from 'react';
import { PROJECTS } from "@/constants/projects";
import { ARCHIVED_ROWS } from "@/constants/archived-frames";
import { MarqueeRow } from "@/components/ui/MarqueeRow";
import { ProjectCard } from "@/components/ui/ProjectCard";

export const ProjectGallery = () => {
    // --- STATE PAGINASI ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; 
    const totalPages = Math.ceil(PROJECTS.length / itemsPerPage);
    
    // Ref khusus untuk Grid Selected Works
    const galleryRef = useRef<HTMLDivElement>(null);
    const [isCardsVisible, setIsCardsVisible] = useState(true);

    const currentProjects = PROJECTS.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        setIsCardsVisible(false);
        setTimeout(() => {
            setCurrentPage(page);
            setIsCardsVisible(true);
            if (galleryRef.current) {
                const yOffset = -100;
                const y = galleryRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 300);
    };

    // --- ANIMATION OBSERVERS (DIPISAH AGAR AKURAT) ---
    const sectionRef = useRef<HTMLElement>(null);
    const [isMarqueeVisible, setIsMarqueeVisible] = useState(false);
    const [isGalleryVisible, setIsGalleryVisible] = useState(false);

    // Observer 1: Khusus untuk Archived Frames (Bagian Atas)
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsMarqueeVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Observer 2: Khusus untuk Selected Works (Bagian Bawah)
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsGalleryVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }); // Memicu tepat saat elemen masuk layar
        if (galleryRef.current) observer.observe(galleryRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="projects" className="min-h-screen py-24 bg-dark flex flex-col space-y-32">
            
            {/* ARCHIVED FRAMES SECTION */}
            <div className={`flex flex-col transition-all duration-1000 ease-out ${isMarqueeVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="max-w-7xl mx-auto w-full px-6 md:px-16 mb-12">
                    <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] text-accent flex items-center gap-4 font-bold">
                        <span className="w-12 border-b border-accent drop-shadow-glow-red"></span>
                        Archived Frames
                    </h2>
                    <p className="mt-4 text-support text-[10px] md:text-xs tracking-[0.2em] uppercase font-light max-w-md leading-relaxed">
                        Visual explorations and light studies.
                    </p>
                </div>
                <div className="flex flex-col w-full">
                    <MarqueeRow items={ARCHIVED_ROWS.row1} direction="left" speed="slow" />
                    <MarqueeRow items={ARCHIVED_ROWS.row2} direction="right" speed="slow" />
                    <MarqueeRow items={ARCHIVED_ROWS.row3} direction="left" speed="slow" />
                </div>
            </div>

            {/* SELECTED WORKS SECTION */}
            {/* Menggunakan galleryRef sebagai target observer independen */}
            <div ref={galleryRef} className="max-w-7xl mx-auto w-full px-6 md:px-16">
                
                <div className={`mb-12 transition-all duration-1000 ease-out ${isGalleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] text-accent flex items-center gap-4 font-bold">
                        <span className="w-12 border-b border-accent drop-shadow-glow-red"></span>
                        Selected Works
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {currentProjects.map((project, index) => (
                        <div 
                            key={project.id}
                            style={{ transitionDelay: `${index * 150}ms` }}
                            // Menggunakan isGalleryVisible agar animasi baru jalan saat disekrol
                            className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isCardsVisible && isGalleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                        >
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className={`mt-24 flex justify-center items-center gap-6 transition-all duration-1000 delay-500 ${isGalleryVisible ? 'opacity-100' : 'opacity-0'}`}>
                        {/* Tombol Paginasi (Sama dengan sebelumnya) */}
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1 || !isCardsVisible} className={`text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${currentPage === 1 ? 'text-support/20 cursor-not-allowed' : 'text-support hover:text-accent'}`}><span>&larr;</span> Prev</button>
                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }).map((_, index) => {
                                const pageNum = index + 1;
                                return (
                                    <button key={pageNum} onClick={() => handlePageChange(pageNum)} disabled={!isCardsVisible} className={`w-8 h-8 flex items-center justify-center text-xs font-mono transition-all duration-300 border ${currentPage === pageNum ? 'border-accent text-accent bg-accent/5' : 'border-white/5 text-support/60 hover:border-white/20 hover:text-primary'}`}>{pageNum}</button>
                                );
                            })}
                        </div>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || !isCardsVisible} className={`text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${currentPage === totalPages ? 'text-support/20 cursor-not-allowed' : 'text-support hover:text-accent'}`}>Next <span>&rarr;</span></button>
                    </div>
                )}
            </div>
        </section>
    );
};