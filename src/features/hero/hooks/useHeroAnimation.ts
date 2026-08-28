import type { Variants } from "framer-motion";

export const useHeroAnimation = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0.9 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.05,
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0.9, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return {
        containerVariants,
        itemVariants,
    };
};
