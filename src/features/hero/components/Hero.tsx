"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HERO_DATA } from "../data/hero.data";
import { useHeroAnimation } from "../hooks/useHeroAnimation";

export const Hero = () => {
    const { containerVariants, itemVariants } = useHeroAnimation();

    return (
        <section id="home" className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center overflow-hidden bg-[#0a0a0a]">
            {/* Background Layer */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 z-0"
            >
                <Image 
                    src={HERO_DATA.bgImage} 
                    alt="Cinematic" 
                    fill 
                    priority 
                    className="object-cover" 
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent from-85% to-[#0a0a0a]" />
            </motion.div>

            {/* Content Layer */}
            <motion.div 
                className="relative z-10 max-w-5xl" 
                variants={containerVariants} 
                initial="hidden" 
                animate="visible"
            >
                <motion.span 
                    variants={itemVariants} 
                    className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-zinc-400 mb-8 font-semibold block"
                >
                    {HERO_DATA.tagline}
                </motion.span>

                <motion.h1 
                    variants={itemVariants} 
                    className="text-5xl md:text-8xl leading-[1.1] tracking-tighter uppercase text-zinc-100 font-bold"
                >
                    {HERO_DATA.headingLine1} <br />
                    <span className="italic font-serif font-light text-zinc-400 opacity-90">
                        {HERO_DATA.headingHighlight}
                    </span>
                </motion.h1>

                <motion.div variants={itemVariants} className="mt-12">
                    <p className="text-sm md:text-base uppercase tracking-[0.3em] text-zinc-500 font-medium">
                        {HERO_DATA.authorName}
                    </p>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 2 }} 
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <div className="w-px h-20 bg-linear-to-b from-zinc-100/30 to-transparent" />
            </motion.div>
        </section>
    );
};
