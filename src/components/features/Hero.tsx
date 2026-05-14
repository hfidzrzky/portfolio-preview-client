"use client"; // Wajib untuk Framer Motion

import Image from "next/image";
import { motion, Variants } from "framer-motion"; // Tambahkan tipe Variants di sini
import { CLIENT_PROFILE } from "@/constants";

export const Hero = () => {
    // 1. Definisikan tipe : Variants agar TypeScript tidak error
    const bgVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 1.5, ease: "linear" }
        }
    };

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
        <section className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center overflow-hidden">
            {/* Background dengan efek fade-in */}
            <motion.div 
                className="absolute inset-0 z-0"
                variants={bgVariants}
                initial="hidden"
                animate="visible"
            >
                <Image
                    src="/images/frames/OIP.jpg"
                    alt="Cinematic background"
                    fill
                    priority 
                    className="object-cover opacity-60"  
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-[#0a0a0a]"></div>
            </motion.div>

            {/* Container Teks yang membungkus anak-anaknya agar muncul berurutan */}
            <motion.div 
                className="relative z-10 max-w-4xl flex flex-col items-center mt-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Teks Atas (Kecil/Label) */}
                <motion.span variants={itemVariants} className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-support mb-6 font-medium">
                    Creative Professional
                </motion.span>

                {/* Teks Utama (Besar di Tengah) */}
                <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold leading-[1.2] tracking-tighter uppercase mb-6 text-primary">
                    Hello, I am <br />
                    <span className="italic font-light text-accent drop-shadow-glow-red">
                        {CLIENT_PROFILE.fullName}
                    </span>
                </motion.h1>

                {/* Teks Bawah (Kecil & Elegan) */}
                <motion.p variants={itemVariants} className="mt-4 text-sm md:text-base text-support max-w-lg leading-relaxed font-light tracking-wide">
                    A {CLIENT_PROFILE.major} specialist from {CLIENT_PROFILE.origin}.
                    Focusing on cinematic storytelling through light and frames.
                </motion.p>
            </motion.div>

            {/* Indikator Scroll */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="mt-16 animate-bounce relative z-10"
            >
                <div className="w-[2px] h-16 bg-gradient-to-b from-accent to-transparent rounded-full shadow-[0_0_8px_rgba(225,29,72,0.6)]"></div>
            </motion.div>
        </section>
    );
};