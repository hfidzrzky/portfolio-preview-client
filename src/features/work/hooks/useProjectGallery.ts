import { useState, useRef, useEffect } from "react";
import { useIntersectionObserver } from "@/shared/hooks";
import { PROJECTS } from "../data/projects.data";

export const useProjectGallery = (itemsPerPage = 6) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isCardsVisible, setIsCardsVisible] = useState(true);

    const [sectionRef, isMarqueeVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 });
    const [galleryRef, isGalleryVisible] = useIntersectionObserver<HTMLDivElement>({
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
    });

    const pageTransitionTimerRef = useRef<NodeJS.Timeout | null>(null);

    const totalPages = Math.ceil(PROJECTS.length / itemsPerPage);

    const currentProjects = PROJECTS.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages || page === currentPage) return;

        setIsCardsVisible(false);
        if (pageTransitionTimerRef.current) {
            clearTimeout(pageTransitionTimerRef.current);
        }

        pageTransitionTimerRef.current = setTimeout(() => {
            setCurrentPage(page);
            setIsCardsVisible(true);
            if (galleryRef.current) {
                const yOffset = -100;
                const y = galleryRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
            }
        }, 300);
    };

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (pageTransitionTimerRef.current) {
                clearTimeout(pageTransitionTimerRef.current);
            }
        };
    }, []);

    return {
        currentPage,
        totalPages,
        currentProjects,
        isCardsVisible,
        isMarqueeVisible,
        isGalleryVisible,
        sectionRef,
        galleryRef,
        handlePageChange,
    };
};
