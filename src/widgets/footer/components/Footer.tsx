import React from "react";
import Link from "next/link";
import { FOOTER_DATA } from "../data/footer.data";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-[#070707] border-t border-white/5 py-12 px-6 md:px-16 text-zinc-500">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <Link
                        href="#home"
                        className="text-lg font-bold tracking-tighter transition-all duration-300 flex items-center"
                    >
                        <span className="text-white">ilham</span>
                        <span className="text-accent font-light italic">Hakim.</span>
                    </Link>
                    <p className="text-xs font-light tracking-wide text-zinc-400">
                        {FOOTER_DATA.tagline}
                    </p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-1 text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-500">
                    <p>&copy; {currentYear} {FOOTER_DATA.copyrightName}.</p>
                    <p className="text-zinc-600">All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};
