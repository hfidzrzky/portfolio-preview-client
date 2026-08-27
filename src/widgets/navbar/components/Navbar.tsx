"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../data/nav-links.data";
import { useNavbar } from "../hooks/useNavbar";
import { cn } from "@/shared/lib";

export const Navbar = () => {
    const { isOpen, scrolled, toggleMenu, closeMenu } = useNavbar();

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-6",
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
                    onClick={closeMenu}
                >
                    <span className="text-white">ilham</span>
                    <span className="text-accent font-light hover:italic transition-all duration-300">Hakim.</span>
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
                                <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Toggle Button */}
                <button
                    className="md:hidden text-white hover:text-accent transition-colors focus:outline-none cursor-pointer"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
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
                        className="absolute top-full left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5 flex flex-col items-center py-8 md:hidden overflow-hidden"
                    >
                        <ul className="flex flex-col items-center gap-6">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={closeMenu}
                                        className="group relative text-sm font-medium uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-all duration-300"
                                    >
                                        {link.label}
                                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
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
