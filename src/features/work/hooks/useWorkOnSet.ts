import { useIntersectionObserver } from "@/shared/hooks";

export const useWorkOnSet = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({
        threshold: 0.1,
        rootMargin: "0px 0px -80px 0px",
    });

    return {
        sectionRef,
        isVisible,
    };
};
