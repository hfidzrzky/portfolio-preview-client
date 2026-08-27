import { useIntersectionObserver } from "@/shared/hooks";

export const useContactAnimation = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.2 });

    const baseAnimClass = `transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
    }`;

    return {
        sectionRef,
        isVisible,
        baseAnimClass,
    };
};
