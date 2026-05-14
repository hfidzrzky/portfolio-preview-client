"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Efek untuk mendeteksi scroll agar navbar berubah opacity-nya
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20); // Nilai diperkecil agar transisi lebih responsif
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-[100] transition-all duration-500 px-6 md:px-12 py-6",
                // Background akan konsisten gelap/blur jika di-scroll ATAU jika menu mobile sedang dibuka
                scrolled || isOpen 
                    ? "bg-[#0a0a0a]/95 backdrop-blur-xl py-4 border-b border-white/5" 
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Brand Name */}
                <Link
                    href="#home"
                    className="text-xl font-bold tracking-tighter transition-all duration-300 flex items-center"
                    onClick={() => setIsOpen(false)}
                >
                    <span className="text-white">ilham</span>
                    {/* Teks "Hakim" berwarna merah sinematik */}
                    <span className="text-[#E11D48] font-light hover:italic transition-all duration-300">Hakim.</span>
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex gap-10">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="group relative text-xs font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-white transition-colors duration-300"
                            >
                                {link.label}
                                {/* Hover Premium Red Underline Animation */}
                                <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-[#E11D48] transition-all duration-300 group-hover:w-full" />
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Toggle Button */}
                <button
                    className="md:hidden text-white hover:text-[#E11D48] transition-colors focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {/* Ukuran icon diperkecil (24) dan diperhalus stroke-nya agar elegan */}
                    {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        // Latar belakang menu dropdown konsisten dengan navbar
                        className="absolute top-full left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5 flex flex-col items-center py-8 md:hidden overflow-hidden"
                    >
                        <ul className="flex flex-col items-center gap-6">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        // Ukuran teks menu mobile dibuat lebih normal (text-sm) dengan spasi tracking luas
                                        className="group relative text-sm font-medium uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-all duration-300"
                                    >
                                        {link.label}
                                        {/* Hover Premium Red (memusat dari tengah) */}
                                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#E11D48] transition-all duration-300 group-hover:w-full" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};