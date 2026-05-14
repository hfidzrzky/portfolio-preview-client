"use client"; // Wajib ditambahkan untuk animasi berbasis scroll

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const SOCIAL_LINKS = [
    {
        name: 'WhatsApp',
        url: 'https://wa.me/6281234567890', 
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
        )
    },
    {
        name: 'Instagram',
        url: 'https://instagram.com/ilhamhakim', 
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
        )
    },
    {
        name: 'Email',
        url: 'mailto:hello@ilhamhakim.com',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
        )
    }
];

export const Contact = () => {
    // --- ANIMATION LOGIC ---
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Animasi hanya berjalan 1x saat pertama kali dilihat
                }
            },
            { threshold: 0.2 } // Memicu animasi ketika 20% area masuk layar
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Class dasar untuk animasi masuk yang sinematik
    const baseAnimClass = `transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`;

    return (
        <section ref={sectionRef} id="contact" className="relative min-h-[80vh] flex flex-col justify-between px-6 md:px-16 pt-24 pb-8 bg-dark overflow-hidden border-t border-white/5">
            
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom_center,_var(--tw-gradient-stops))] from-accent/10 via-dark to-dark"></div>

            <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center w-full max-w-4xl mx-auto">
                
                {/* Delay 0ms */}
                <h2 className={`${baseAnimClass} text-xs md:text-sm uppercase tracking-[0.4em] text-accent flex items-center gap-4 font-bold mb-10`}>
                    <span className="w-12 border-b border-accent drop-shadow-glow-red"></span>
                    Get In Touch
                    <span className="w-12 border-b border-accent drop-shadow-glow-red hidden md:block"></span>
                </h2>

                {/* Delay 200ms */}
                <h1 className={`${baseAnimClass} delay-200 text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter text-primary mb-6`}>
                    Let&apos;s Create <br />
                    <span className="italic font-light text-support">Together.</span>
                </h1>

                {/* Delay 400ms */}
                <p className={`${baseAnimClass} delay-300 mt-4 text-sm md:text-base text-support/80 max-w-xl leading-relaxed font-light tracking-wide mb-16`}>
                    Open for collaborations, freelance projects, or just a friendly chat about cinema and visual storytelling.
                </p>

                {/* Delay 600ms */}
                <div className={`${baseAnimClass} delay-500 flex flex-wrap justify-center gap-4 md:gap-6`}>
                    {SOCIAL_LINKS.map((social) => (
                        <Link 
                            key={social.name} 
                            href={social.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 border border-white/10 rounded-full bg-white/5 hover:bg-accent/10 hover:border-accent/50 hover:-translate-y-1 transition-all duration-500 shadow-lg hover:shadow-accent/20"
                        >
                            <span className="text-support group-hover:text-accent transition-colors duration-500">
                                {social.icon}
                            </span>
                            <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-primary group-hover:text-accent transition-colors duration-500">
                                {social.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            <div className={`relative z-10 w-full flex flex-col md:flex-row justify-between items-center mt-32 pt-8 border-t border-white/10 text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-support/50 ${baseAnimClass} delay-700`}>
                <p>&copy; {new Date().getFullYear()} Ilham Hakim. All Rights Reserved.</p>
                <p className="mt-4 md:mt-0">Crafted with Precision.</p>
            </div>
        </section>
    );
};