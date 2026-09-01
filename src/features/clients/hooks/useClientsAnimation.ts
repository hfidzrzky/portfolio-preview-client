import type { Variants } from "framer-motion";

export const useClientsAnimation = () => {
    const headerVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.04,
                delayChildren: 0.08,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 16, scale: 0.96 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return {
        headerVariants,
        containerVariants,
        itemVariants,
    };
};
