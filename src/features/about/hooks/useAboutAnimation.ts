import type { Variants } from "framer-motion";

export const useAboutAnimation = () => {
    const leftContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            }
        }
    };

    const rightContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.4,
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return {
        leftContainerVariants,
        rightContainerVariants,
        itemVariants,
    };
};
