"use client"; // Wajib karena menggunakan event listener untuk scroll

import React, { useState, useEffect } from 'react';

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Memantau posisi scroll
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // Fungsi kembali ke atas
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`fixed bottom-8 right-6 md:right-10 z-50 p-3 md:p-4 rounded-full border border-white/10 bg-dark/60 backdrop-blur-md text-support hover:text-accent hover:border-accent/50 hover:bg-accent/10 transition-all duration-500 shadow-lg ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
            }`}
        >
            {/* Ikon Arrow Up yang Elegan */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m18 15-6-6-6 6"/>
            </svg>
        </button>
    );
};