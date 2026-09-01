"use client";

import { useState, useMemo } from "react";
import type { Variants } from "framer-motion";
import { WORK_ON_SET_CATEGORIES, WORK_ON_SET_IMAGES } from "../data/work-on-set.data";
import type { WorkOnSetCategory } from "../types";

const INITIAL_VISIBLE_COUNT = 8;

export const useWorkOnSet = () => {
    const [selectedCategory, setSelectedCategory] = useState<WorkOnSetCategory>("all");
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [activeImageId, setActiveImageId] = useState<string | null>(null);

    // Filter images according to active category
    const filteredImages = useMemo(() => {
        if (selectedCategory === "all") {
            return WORK_ON_SET_IMAGES;
        }
        return WORK_ON_SET_IMAGES.filter((img) => img.category === selectedCategory);
    }, [selectedCategory]);

    // Compute category counts for badge counters
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {
            all: WORK_ON_SET_IMAGES.length,
        };
        WORK_ON_SET_IMAGES.forEach((img) => {
            counts[img.category] = (counts[img.category] || 0) + 1;
        });
        return counts;
    }, []);

    // Visible images based on expansion or specific category selection
    const displayedImages = useMemo(() => {
        if (selectedCategory !== "all" || isExpanded) {
            return filteredImages;
        }
        return filteredImages.slice(0, INITIAL_VISIBLE_COUNT);
    }, [filteredImages, selectedCategory, isExpanded]);

    const hasMore = selectedCategory === "all" && filteredImages.length > INITIAL_VISIBLE_COUNT;
    const remainingCount = Math.max(0, filteredImages.length - INITIAL_VISIBLE_COUNT);

    // Handlers
    const handleCategorySelect = (category: WorkOnSetCategory) => {
        setSelectedCategory(category);
        setIsExpanded(false);
    };

    const handleToggleExpand = () => {
        setIsExpanded((prev) => !prev);
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
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.0,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const filterContainerVariants: Variants = {
        hidden: { opacity: 0, y: 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const gridContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.15,
            },
        },
    };

    const cardVariants: Variants = {
        hidden: { 
            opacity: 0, 
            y: 40, 
            scale: 0.94,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return {
        categories: WORK_ON_SET_CATEGORIES,
        selectedCategory,
        categoryCounts,
        displayedImages,
        activeImageId,
        isExpanded,
        hasMore,
        remainingCount,
        handleCategorySelect,
        handleToggleExpand,
        handleCardClick,
        sectionVariants,
        headerVariants,
        filterContainerVariants,
        gridContainerVariants,
        cardVariants,
    };
};
