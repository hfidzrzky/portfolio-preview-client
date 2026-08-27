"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
    freezeOnceVisible?: boolean;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
    options: UseIntersectionObserverOptions = {}
): [RefObject<T | null>, boolean] {
    const { threshold = 0.1, root = null, rootMargin = "0%", freezeOnceVisible = true } = options;
    const elementRef = useRef<T | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const node = elementRef.current;
        if (!node || typeof IntersectionObserver !== "function") return;

        let isSubscribed = true;

        const observer = new IntersectionObserver(([entry]) => {
            if (!isSubscribed) return;

            const isElementIntersecting = entry.isIntersecting;
            if (isElementIntersecting) {
                setIsVisible(true);
                if (freezeOnceVisible) {
                    observer.disconnect();
                }
            } else if (!freezeOnceVisible) {
                setIsVisible(false);
            }
        }, { threshold, root, rootMargin });

        observer.observe(node);

        return () => {
            isSubscribed = false;
            observer.disconnect();
        };
    }, [threshold, root, rootMargin, freezeOnceVisible]);

    return [elementRef, isVisible];
}
