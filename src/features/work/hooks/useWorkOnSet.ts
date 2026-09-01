"use client";

import { useState, useMemo } from "react";
import type { Variants } from "framer-motion";
import { WORK_ON_SET_TABS, WORK_ON_SET_IMAGES } from "../data/work-on-set.data";
import type { WorkOnSetTab } from "../types";

export const useWorkOnSet = () => {
    const [activeTab, setActiveTab] = useState<WorkOnSetTab>("bts-01");
    const [activeImageId, setActiveImageId] = useState<string | null>(null);

    // Filter images according to active tab volume
    const displayedImages = useMemo(() => {
        return WORK_ON_SET_IMAGES.filter((img) => img.tab === activeTab);
    }, [activeTab]);

    // Compute item counts per tab
    const tabCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        WORK_ON_SET_IMAGES.forEach((img) => {
            counts[img.tab] = (counts[img.tab] || 0) + 1;
        });
        return counts;
    }, []);

    // Handlers
    const handleTabSelect = (tab: WorkOnSetTab) => {
        setActiveTab(tab);
        setActiveImageId(null);
    };

    const handleCardClick = (id: string) => {
        setActiveImageId((prevId) => (prevId === id ? null : id));
    };

    // Framer Motion Animation Variants
    const sectionVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const headerVariants: Variants = {
        hidden: { opacity: 0, y: 35 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const filterContainerVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const gridContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.06,
                delayChildren: 0.05,
            },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.15 },
        },
    };

    const cardVariants: Variants = {
        hidden: { 
            opacity: 0, 
            y: 30, 
            scale: 0.96,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
            },
        },
        exit: {
            opacity: 0,
            scale: 0.96,
            transition: { duration: 0.2 },
        },
    };

    return {
        tabs: WORK_ON_SET_TABS,
        activeTab,
        tabCounts,
        displayedImages,
        activeImageId,
        handleTabSelect,
        handleCardClick,
        sectionVariants,
        headerVariants,
        filterContainerVariants,
        gridContainerVariants,
        cardVariants,
    };
};
