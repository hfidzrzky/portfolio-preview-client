"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ClientCardProps } from "../types";

export const ClientCard: React.FC<ClientCardProps> = ({
    client,
    variants,
}) => {
    const isStatic = typeof client.logo !== "string";

    return (
        <motion.div
            variants={variants}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            title={client.name}
            aria-label={client.name}
            className="group relative flex items-center justify-center h-20 sm:h-24 md:h-28 w-full p-2 select-none outline-none cursor-pointer"
        >
            <div className="relative w-full h-full flex items-center justify-center">
                {isStatic ? (
                    <Image
                        src={client.logo}
                        alt={client.alt || client.name}
                        placeholder="blur"
                        draggable={false}
                        className="max-h-14 sm:max-h-16 md:max-h-20 w-auto max-w-[90%] md:max-w-[85%] object-contain select-none pointer-events-none"
                    />
                ) : (
                    <Image
                        src={client.logo}
                        alt={client.alt || client.name}
                        width={200}
                        height={100}
                        draggable={false}
                        className="max-h-14 sm:max-h-16 md:max-h-20 w-auto max-w-[90%] md:max-w-[85%] object-contain select-none pointer-events-none"
                    />
                )}
            </div>
        </motion.div>
    );
};
