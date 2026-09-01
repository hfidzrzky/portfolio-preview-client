"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CLIENT_PROFILE } from "../data/profile.data";
import { useAboutAnimation } from "../hooks/useAboutAnimation";
import { Section, SectionHeader } from "@/shared/ui";

export const About = () => {
    const { leftContainerVariants, rightContainerVariants, itemVariants } = useAboutAnimation();
    const [isImageActive, setIsImageActive] = React.useState(false);

    return (
        <Section id="about" className="min-h-screen flex items-center">
            <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
                {/* KOLOM KIRI: Label & Informasi Detail */}
                <motion.div
                    variants={leftContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="md:col-span-5 flex flex-col justify-start space-y-10"
                >
                    {/* Item 1: Judul Section */}
                    <motion.div variants={itemVariants}>
                        <SectionHeader badge="About" className="mb-0" />
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        onClick={() => setIsImageActive((prev) => !prev)}
                        className="group relative overflow-hidden bg-zinc-900 aspect-3/2 rounded-sm cursor-pointer select-none"
                    >
                        <div 
                            className={`absolute inset-0 z-10 bg-accent/10 transition-opacity duration-700 pointer-events-none ${
                                isImageActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`} 
                        />

                        <Image
                            src="/images/profile-ilham.webp"
                            alt="Ilham Hakim - Cinematic Specialist"
                            fill
                            draggable={false}
                            sizes="(max-width: 768px) 100vw, 40vw"
                            className={`object-cover object-center transition-all duration-700 select-none ${
                                isImageActive
                                    ? "grayscale-0 scale-100"
                                    : "grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100"
                            }`}
                        />
                    </motion.div>

                    <div className="space-y-10">
                        {/* Item 2: Section Pendidikan */}
                        <motion.div variants={itemVariants} className="border-t border-accent/20 pt-6">
                            <h3 className="text-[10px] uppercase tracking-widest text-support mb-3">Education</h3>
                            <p className="text-base md:text-lg font-medium text-primary">
                                {CLIENT_PROFILE.education}
                            </p>
                            <p className="text-sm text-support mt-1 font-light italic tracking-wide">
                                Majoring in {CLIENT_PROFILE.major}
                            </p>
                        </motion.div>

                        {/* Item 3: Section Spesialisasi */}
                        <motion.div variants={itemVariants} className="border-t border-accent/20 pt-6">
                            <h3 className="text-[10px] uppercase tracking-widest text-support mb-4">Specialties</h3>
                            <ul className="text-sm md:text-base font-light text-primary space-y-3">
                                {CLIENT_PROFILE.roles.map((role, index) => (
                                    <li key={index} className="flex items-center gap-4 tracking-wide">
                                        <span className="w-1.5 h-1.5 bg-accent rounded-full drop-shadow-glow-red" />
                                        {role}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </motion.div>

                {/* KOLOM KANAN: Teks Bio Utama */}
                <motion.div
                    variants={rightContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="md:col-span-7 flex flex-col justify-center"
                >
                    <motion.div
                        variants={itemVariants}
                        className="mb-12 border-l-2 border-accent pl-8 py-2"
                    >
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-support tracking-wide">
                            A <span className="text-primary font-medium">{CLIENT_PROFILE.major}</span> specialist
                            from <span className="text-primary font-medium">{CLIENT_PROFILE.origin}</span>.
                            <br className="hidden lg:block" />
                             Focusing on cinematic storytelling through light and frames.
                        </p>
                    </motion.div>

                    <motion.span
                        variants={itemVariants}
                        className="text-accent/30 block mb-4 text-7xl md:text-8xl font-serif leading-none italic select-none"
                    >
                        &ldquo;
                    </motion.span>

                    <motion.h3
                        variants={itemVariants}
                        className="text-2xl md:text-3xl lg:text-4xl font-light leading-[1.6] text-primary tracking-wide"
                    >
                        {CLIENT_PROFILE.bio}
                    </motion.h3>
                </motion.div>
            </div>
        </Section>
    );
};
