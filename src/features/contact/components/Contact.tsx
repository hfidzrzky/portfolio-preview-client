"use client";

import React from "react";
import Link from "next/link";
import { SOCIAL_LINKS_DATA } from "../data/contact.data";
import { useContactAnimation } from "../hooks/useContactAnimation";
import { SocialIcon } from "./SocialIcon";
import { Section, SectionHeader } from "@/shared/ui";

export const Contact = () => {
    const { sectionRef, baseAnimClass } = useContactAnimation();

    return (
        <Section
            ref={sectionRef}
            id="contact"
            hasDivider
            containerSize="compact"
            className="min-h-[70vh] flex flex-col justify-center"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none bg-radial-[at_bottom_center] from-accent/10 via-dark to-dark" />

            <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center w-full">
                <SectionHeader
                    badge="Get In Touch"
                    title={
                        <>
                            Let&apos;s Create <br />
                            <span className="italic font-light text-support">Together.</span>
                        </>
                    }
                    description="Open for collaborations, freelance projects, or just a friendly chat about cinema and visual storytelling."
                    align="center"
                    badgeClassName={baseAnimClass}
                    titleClassName={`${baseAnimClass} delay-200 text-5xl md:text-7xl lg:text-8xl tracking-tighter`}
                    descriptionClassName={`${baseAnimClass} delay-300 mb-6`}
                />

                <div className={`${baseAnimClass} delay-500 flex flex-wrap justify-center gap-4 md:gap-6`}>
                    {SOCIAL_LINKS_DATA.map((social) => (
                        <Link 
                            key={social.name} 
                            href={social.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 border border-white/10 rounded-full bg-white/5 hover:bg-accent/10 hover:border-accent/50 hover:-translate-y-1 transition-all duration-500 shadow-lg hover:shadow-accent/20"
                        >
                            <span className="text-support group-hover:text-accent transition-colors duration-500">
                                <SocialIcon type={social.type} size={18} />
                            </span>
                            <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-primary group-hover:text-accent transition-colors duration-500">
                                {social.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </Section>
    );
};
