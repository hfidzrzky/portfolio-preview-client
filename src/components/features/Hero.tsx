"use client"; // Wajib untuk Framer Motion

import Image from "next/image";
import { motion, Variants } from "framer-motion"; // Tambahkan tipe Variants di sini
import { CLIENT_PROFILE } from "@/constants";

export const Hero = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Efek muncul berurutan
                delayChildren: 0.3,
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1] // Kurva bezier untuk animasi premium
            }
        }
    };

    return (
    // Menggunakan bg-[#0a0a0a] agar matching dengan About
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center overflow-hidden bg-[#0a0a0a]">
        
        {/* Background Layer */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }} // Opacity rendah agar nuansa gelap lebih dominan
            transition={{ duration: 2 }}
            className="absolute inset-0 z-0"
        >
            <Image src="/images/hero-bg.png" alt="Cinematic" fill priority className="object-cover" />
            
            {/* REFAKTOR GRADASI: 
                Menggunakan from-[85%] agar gradasi hanya muncul tipis di bagian paling bawah
                sehingga tidak mengganggu keterbacaan teks di tengah layar.
            */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[85%] to-[#0a0a0a]"></div>
        </motion.div>

        {/* Content Layer */}
        <motion.div className="relative z-10 max-w-5xl" variants={containerVariants} initial="hidden" animate="visible">
            {/* Label: Menggunakan Zinc-400 untuk kesan muted premium */}
            <motion.span variants={itemVariants} className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-zinc-400 mb-8 font-semibold block">
                Portfolio
            </motion.span>

            {/* Title: Zinc-100 memberikan kontras tinggi di atas background gelap */}
            <motion.h1 variants={itemVariants} className="text-5xl md:text-8xl leading-[1.1] tracking-tighter uppercase text-zinc-100 font-bold">
                Exploring The <br />
                <span className="italic font-serif font-light text-zinc-400 opacity-90">Visual Soul</span>
            </motion.h1>

            <motion.div variants={itemVariants} className="mt-12">
                {/* Footer Text: Zinc-500 untuk informasi pendukung */}
                <p className="text-sm md:text-base uppercase tracking-[0.3em] text-zinc-500 font-medium">
                    {CLIENT_PROFILE.fullName}
                </p>
            </motion.div>
        </motion.div>

        {/* Scroll Indicator: Putih tipis transparan */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-12 left-1/2 -translate-x-1/2">
            <div className="w-[1px] h-20 bg-gradient-to-b from-zinc-100/30 to-transparent"></div>
        </motion.div>
    </section>
);
};