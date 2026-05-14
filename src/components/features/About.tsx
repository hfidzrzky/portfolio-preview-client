"use client";

import React from 'react';
import Image from "next/image";
import { motion, Variants } from 'framer-motion';
import { CLIENT_PROFILE } from "@/constants";

export const About = () => {
    // 1. Varian untuk kontainer kolom kiri (stagger ringan)
    const leftContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Jarak waktu muncul antara About, Education, Specialties
            }
        }
    };

    // 2. Varian untuk kontainer kolom kanan (delay agar muncul setelah kolom kiri jalan)
    const rightContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.4, // Menunggu 0.4 detik sebelum tanda kutip & Bio muncul
            }
        }
    };

    // 3. Varian per-item dengan kurva bezier premium yang sama dengan Hero
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1] // Deselerasi yang sangat halus
            }
        }
    };

    return (
        <section id="about" className="relative min-h-screen flex items-center px-6 md:px-16 py-24 bg-dark overflow-hidden">
            {/* Latar Belakang */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/5 via-dark to-dark"></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">

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
                        <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] text-accent mb-12 flex items-center gap-4 font-bold">
                            <span className="w-12 border-b border-accent drop-shadow-glow-red"></span>
                            About
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="group relative overflow-hidden bg-zinc-900 aspect-[3/2] rounded-sm"
                    >
                        {/* Subtle Red Overlay saat di-hover agar konsisten dengan kartu projects */}
                        <div className="absolute inset-0 z-10 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                        <Image
                            src="/images/profile-ilham.jpeg"
                            alt="Ilham Hakim - Cinematic Specialist"
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
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
                                        <span className="w-1.5 h-1.5 bg-accent rounded-full drop-shadow-glow-red"></span>
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
                    {/* ITEM BARU: Professional Statement (Pindahan dari Hero) */}
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

                    {/* Item 4: Tanda Kutip (Tipografi diturunkan sedikit agar tidak bertabrakan) */}
                    <motion.span
                        variants={itemVariants}
                        className="text-accent/30 block mb-4 text-7xl md:text-8xl font-serif leading-none italic select-none"
                    >
                        &ldquo;
                    </motion.span>

                    {/* Item 5: Teks Bio */}
                    <motion.h3
                        variants={itemVariants}
                        className="text-2xl md:text-3xl lg:text-4xl font-light leading-[1.6] text-primary tracking-wide"
                    >
                        {CLIENT_PROFILE.bio}
                    </motion.h3>
                </motion.div>
            </div>
        </section>
    );
};