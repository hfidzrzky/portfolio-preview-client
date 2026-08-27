"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { NAV_LINKS } from "../data/nav-links.data";
import { useNavbar } from "../hooks/useNavbar";
import { cn } from "@/shared/lib";

export const Navbar = () => {
    const { isOpen, scrolled, activeSection, toggleMenu, closeMenu } = useNavbar();

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300",
                isOpen
                    ? "bg-[#0a0a0a]"
                    : scrolled
                    ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/8 shadow-2xl shadow-black/50"
                    : "bg-transparent"
            )}
        >
            {/* Main Navbar Bar */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
                {/* Left Side: Brand Logo + Left-Aligned Navigation Links */}
                <div className="flex items-center gap-6 lg:gap-8">
                    {/* Brand Identifier */}
                    <Link
                        href="#home"
                        className="group flex items-center gap-2.5 focus:outline-none"
                        onClick={closeMenu}
                        aria-label="Ilham Hakim Portfolio - Home"
                    >
                        <div className="relative w-7 h-3.5 md:w-8 md:h-4 shrink-0 transition-transform duration-300 group-hover:scale-105">
                            <Image
                                src="/icon-logo.png"
                                alt="Ilham Hakim Logo Icon"
                                fill
                                sizes="32px"
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className="flex items-baseline tracking-tighter text-lg md:text-xl font-bold">
                            <span className="text-white group-hover:text-zinc-200 transition-colors">ilham</span>
                            <span className="text-accent font-light italic ml-0.5 group-hover:translate-x-0.5 transition-transform duration-300">
                                Hakim.
                            </span>
                        </div>
                    </Link>

                    {/* Subtle Vertical Divider */}
                    <div className="hidden md:block h-4 w-px bg-white/15" aria-hidden="true" />

                    {/* Left-Aligned Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
                        {NAV_LINKS.map((link) => {
                            const isActive = activeSection === link.id;

                            return (
                                <Link
                                    key={link.id}
                                    href={link.href}
                                    className={cn(
                                        "relative px-4 py-1.5 rounded-full text-xs font-medium tracking-[0.18em] uppercase transition-all duration-300 flex items-center",
                                        isActive
                                            ? "text-white font-semibold"
                                            : "text-zinc-400 hover:text-zinc-100 hover:bg-white/4"
                                    )}
                                >
                                    {/* Active Glass Pill Background */}
                                    {isActive && (
                                        <motion.span
                                            layoutId="activeNavPill"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            className="absolute inset-0 rounded-full bg-white/10 border border-white/20 shadow-inner pointer-events-none"
                                        />
                                    )}

                                    <span className="relative z-10">{link.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Right Side: Direct Action CTA Button */}
                <div className="hidden md:flex items-center">
                    <Link
                        href="#contact"
                        className="group relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black text-xs font-semibold tracking-wider uppercase overflow-hidden hover:bg-accent hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 cursor-pointer"
                    >
                        <span>LET&apos;S TALK</span>
                        <ArrowUpRight
                            size={14}
                            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                        />
                    </Link>
                </div>

                {/* Mobile Hamburger Toggle Button */}
                <button
                    type="button"
                    className="md:hidden relative p-2 text-zinc-300 hover:text-white focus:outline-none cursor-pointer rounded-lg bg-white/4 border border-white/8"
                    onClick={toggleMenu}
                    aria-label={isOpen ? "Close Menu" : "Open Menu"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
                </button>
            </div>

            {/* Mobile Seamless Drawer (100% Solid Dark Canvas without any HR lines) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "calc(100dvh - 4rem)" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full bg-[#0a0a0a] md:hidden flex flex-col justify-between px-6 py-8 overflow-y-auto"
                    >
                        {/* Mobile Navlinks with Full-Row Active State and Horizontal Lines */}
                        <div className="flex flex-col gap-2">
                            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500 mb-2 px-1">
                                NAVIGATION
                            </span>

                            <nav className="flex flex-col border-t border-white/8">
                                {NAV_LINKS.map((link) => {
                                    const isActive = activeSection === link.id;

                                    return (
                                        <Link
                                            key={link.id}
                                            href={link.href}
                                            onClick={closeMenu}
                                            className={cn(
                                                "relative group flex items-center justify-between px-4 py-4 text-xs font-medium tracking-[0.18em] uppercase transition-all duration-300 border-b border-white/8",
                                                isActive
                                                    ? "text-white font-semibold"
                                                    : "text-zinc-400 hover:text-zinc-100 hover:bg-white/2"
                                            )}
                                        >
                                            {/* Full-width Active Row Highlight */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeNavRowMobile"
                                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                                    className="absolute inset-0 bg-white/6 border-l-2 border-accent pointer-events-none"
                                                />
                                            )}

                                            <span className="relative z-10">{link.label}</span>
                                            <ArrowUpRight
                                                size={15}
                                                className={cn(
                                                    "relative z-10 transition-all duration-300",
                                                    isActive
                                                        ? "text-accent opacity-100"
                                                        : "text-zinc-600 opacity-40 group-hover:opacity-100 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                                )}
                                            />
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Mobile Drawer Footer: Direct CTA Button with Horizontal Divider */}
                        <div className="pt-6 pb-4 border-t border-white/8 flex flex-col gap-3">
                            <Link
                                href="#contact"
                                onClick={closeMenu}
                                className="w-full py-3.5 rounded-full bg-white text-black font-semibold uppercase tracking-[0.18em] text-xs flex items-center justify-center gap-2 hover:bg-accent hover:text-white transition-all duration-300 shadow-lg shadow-white/5 active:scale-[0.99]"
                            >
                                <span>LET&apos;S TALK</span>
                                <ArrowUpRight size={14} />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
