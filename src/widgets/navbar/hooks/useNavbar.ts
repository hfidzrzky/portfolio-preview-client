"use client";

import { useState, useEffect, useCallback } from "react";
import { NAV_LINKS } from "../data/nav-links.data";

export const useNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState<string>("home");

    // Scroll state detection
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Active section spy
    useEffect(() => {
        const handleSpy = () => {
            const scrollPos = window.scrollY + 100;
            for (const link of NAV_LINKS) {
                const el = document.getElementById(link.id);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPos >= top && scrollPos < top + height) {
                        setActiveSection(link.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleSpy, { passive: true });
        return () => window.removeEventListener("scroll", handleSpy);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const toggleMenu = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsOpen(false);
    }, []);

    return {
        isOpen,
        scrolled,
        activeSection,
        toggleMenu,
        closeMenu,
    };
};
