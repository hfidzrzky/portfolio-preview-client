"use client";

import { useState, useMemo, useCallback } from "react";
import type { Variants } from "framer-motion";
import { WORK_ON_SET_TABS, WORK_ON_SET_IMAGES } from "../data/work-on-set.data";
import type { WorkOnSetTab } from "../types";

export const useWorkOnSet = () => {
    const [activeTab, setActiveTab] = useState<WorkOnSetTab>("bts-01");

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

    // Handlers memoized with useCallback
    const handleTabSelect = useCallback((tab: WorkOnSetTab) => {
        setActiveTab(tab);
    }, []);

    // Framer Motion Animation Variants - High Performance & Non-blocking
    const sectionVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.05,
            },
        },
    };

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

    const filterContainerVariants: Variants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const gridContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delayChildren: 0.02,
            },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.12 },
        },
    };

    const cardVariants: Variants = {
        hidden: { 
            opacity: 0, 
            y: 16, 
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
            },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.1 },
        },
    };

    return {
        tabs: WORK_ON_SET_TABS,
        activeTab,
        tabCounts,
        displayedImages,
        handleTabSelect,
        sectionVariants,
        headerVariants,
        filterContainerVariants,
        gridContainerVariants,
        cardVariants,
    };
};
