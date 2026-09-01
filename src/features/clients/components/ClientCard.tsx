"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ClientCardProps } from "../types";

export const ClientCard: React.FC<ClientCardProps> = ({
    client,
    variants,
}) => {
    const [hasError, setHasError] = useState(false);
    const hasImage = Boolean(client.logo) && !hasError;

    return (
        <motion.div
            variants={variants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            title={client.name}
            aria-label={client.name}
            className="group relative flex items-center justify-center h-20 sm:h-24 md:h-28 w-full p-2 select-none outline-none cursor-pointer"
        >
            <div className="relative w-full h-full flex items-center justify-center">
                {hasImage ? (
                    <Image
                        src={client.logo!}
                        alt={client.alt || client.name}
                        width={200}
                        height={100}
                        sizes="(max-width: 640px) 140px, (max-width: 1024px) 180px, 200px"
                        draggable={false}
                        onError={() => setHasError(true)}
                        className="max-h-14 sm:max-h-16 md:max-h-20 w-auto max-w-[90%] md:max-w-[85%] object-contain select-none pointer-events-none transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] px-3 py-2 text-center group-hover:border-accent group-hover:bg-white/[0.08] transition-all duration-300 shadow-sm">
                        <span className="text-xs sm:text-sm font-medium tracking-wider text-primary group-hover:text-primary transition-colors line-clamp-2 uppercase select-none">
                            {client.name}
                        </span>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

