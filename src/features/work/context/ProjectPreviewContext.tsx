"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import type { Project } from "../types";

export interface ProjectPreviewContextValue {
    isOpen: boolean;
    activeProject: Project | null;
    activeSlideIndex: number;
    openPreview: (project: Project, initialSlideIndex?: number) => void;
    closePreview: () => void;
    nextSlide: () => void;
    prevSlide: () => void;
    setActiveSlideIndex: (index: number) => void;
}

const ProjectPreviewContext = createContext<ProjectPreviewContextValue | undefined>(undefined);

export interface ProjectPreviewProviderProps {
    children: React.ReactNode;
}

export const ProjectPreviewProvider: React.FC<ProjectPreviewProviderProps> = ({ children }) => {
    const [activeProject, setActiveProject] = useState<Project | null>(null);
    const [activeSlideIndex, setActiveSlideIndexState] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openPreview = useCallback((project: Project, initialSlideIndex: number = 0) => {
        if (!project || !project.media || project.media.length === 0) return;
        const validIndex = Math.max(0, Math.min(initialSlideIndex, project.media.length - 1));
        setActiveProject(project);
        setActiveSlideIndexState(validIndex);
        setIsOpen(true);
    }, []);

    const closePreview = useCallback(() => {
        setIsOpen(false);
    }, []);

    const setActiveSlideIndex = useCallback((index: number) => {
        if (!activeProject || !activeProject.media || activeProject.media.length === 0) return;
        const validIndex = Math.max(0, Math.min(index, activeProject.media.length - 1));
        setActiveSlideIndexState(validIndex);
    }, [activeProject]);

    // Fixed pure updater: No side-effects inside state setters, preventing dev-mode double invocation bugs
    const nextSlide = useCallback(() => {
        if (!activeProject || !activeProject.media || activeProject.media.length <= 1) return;
        const total = activeProject.media.length;
        setActiveSlideIndexState((prev) => (prev + 1) % total);
    }, [activeProject]);

    const prevSlide = useCallback(() => {
        if (!activeProject || !activeProject.media || activeProject.media.length <= 1) return;
        const total = activeProject.media.length;
        setActiveSlideIndexState((prev) => (prev === 0 ? total - 1 : prev - 1));
    }, [activeProject]);

    const value = useMemo<ProjectPreviewContextValue>(
        () => ({
            isOpen,
            activeProject,
            activeSlideIndex,
            openPreview,
            closePreview,
            nextSlide,
            prevSlide,
            setActiveSlideIndex,
        }),
        [isOpen, activeProject, activeSlideIndex, openPreview, closePreview, nextSlide, prevSlide, setActiveSlideIndex]
    );

    return (
        <ProjectPreviewContext.Provider value={value}>
            {children}
        </ProjectPreviewContext.Provider>
    );
};

export const useProjectPreview = (): ProjectPreviewContextValue => {
    const context = useContext(ProjectPreviewContext);
    if (!context) {
        throw new Error("useProjectPreview must be used within a ProjectPreviewProvider");
    }
    return context;
};
