"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ClientCardProps } from "../types";

export const ClientCard: React.FC<ClientCardProps> = React.memo(({
    client,
    variants,
}) => {
    const [hasError, setHasError] = useState(false);
    const hasImage = Boolean(client.logo) && !hasError;

    return (
        <motion.div
            variants={variants}
            whileHover={{ y: -4, scale: 1.06 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            title={client.name}
            aria-label={client.name}
            className="group relative flex items-center justify-center h-20 sm:h-24 md:h-28 w-full p-2 select-none outline-none cursor-pointer bg-transparent"
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
                        unoptimized
                        loading="eager"
                        onError={() => setHasError(true)}
                        className="max-h-14 sm:max-h-16 md:max-h-20 w-auto max-w-[90%] md:max-w-[85%] object-contain select-none pointer-events-none opacity-75 group-hover:opacity-100 group-hover:brightness-110 transition-all duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-center">
                        <span className="text-xs sm:text-sm font-medium tracking-wider text-support group-hover:text-primary transition-colors line-clamp-2 uppercase select-none">
                            {client.name}
                        </span>
                    </div>
                )}
            </div>
        </motion.div>
    );
});

ClientCard.displayName = "ClientCard";

