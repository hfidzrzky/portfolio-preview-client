import { useIntersectionObserver } from "@/shared/hooks";

export const useWorkOnSet = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 });

    return {
        sectionRef,
        isVisible,
    };
};
