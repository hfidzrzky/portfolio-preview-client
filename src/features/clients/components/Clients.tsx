"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/shared/ui";
import { CLIENTS_DATA } from "../data/clients.data";
import { useClientsAnimation } from "../hooks/useClientsAnimation";
import { ClientCard } from "./ClientCard";

export const Clients: React.FC = () => {
    const { headerVariants, containerVariants, itemVariants } = useClientsAnimation();

    return (
        <Section id="clients" hasDivider>
            <motion.div
                variants={headerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
            >
                <SectionHeader
                    badge="Trusted By"
                    title={
                        <span className="italic font-serif">
                            <span className="text-support">Our</span>{" "}
                            <span className="text-primary">Clients</span>
                        </span>
                    }
                    description="Proud to have collaborated with esteemed institutions, government bodies, and creative entities in delivering impactful visual productions."
                    align="center"
                    titleClassName="text-3xl md:text-5xl font-light uppercase tracking-wide text-primary"
                />
            </motion.div>

            {/* Grid Layout: max 5 logos per row on desktop, centered with Framer Motion stagger reveal */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 w-full items-center justify-items-center"
            >
                {CLIENTS_DATA.map((client) => (
                    <ClientCard
                        key={client.id}
                        client={client}
                        variants={itemVariants}
                    />
                ))}
            </motion.div>
        </Section>
    );
};
