import type { StaticImageData } from "next/image";

export type ProjectMediaType = "image" | "video";
export type MediaAspectRatio = "16/9" | "4/5" | "9/16" | "1/1" | "21/9";
export type MediaFitMode = "contain" | "cover";

export interface ProjectMediaItem {
    id: string;
    type: ProjectMediaType;
    src: string;
    poster?: string;
    alt?: string;
    aspectRatio?: MediaAspectRatio;
    fitMode?: MediaFitMode;
}

export interface Project {
    id: string;
    title: string;
    roles: string[];
    media: ProjectMediaItem[];
    description: string;
    url: string;
    year?: string;
    aspectRatio?: MediaAspectRatio;
    fitMode?: MediaFitMode;
    ambientBackdrop?: boolean;
}

export interface ProjectRowSection {
    id: string;
    badge: string;
    title: string;
    projects: Project[];
}

export type WorkOnSetCategory = 'all' | 'directing' | 'gear' | 'lighting' | 'candid' | 'project';

export interface WorkOnSetImage {
    id: string;
    src: string;
    alt: string;
    category: Exclude<WorkOnSetCategory, 'all'>;
    aspectRatio: 'portrait' | 'landscape' | 'vertical' | 'square';
    tag: string;
    caption?: string;
    featured?: boolean;
    width?: number;
    height?: number;
}

export interface ArchivedFrameItem {
    id: string;
    src: string;
    alt?: string;
}

export interface ArchivedRows {
    row1: ArchivedFrameItem[];
    row2: ArchivedFrameItem[];
    row3: ArchivedFrameItem[];
}
