import type { StaticImageData } from "next/image";

export type ProjectMediaType = "image" | "video";

export interface ProjectMediaItem {
    id: string;
    type: ProjectMediaType;
    src: string;
    poster?: string;
    alt?: string;
}

export interface Project {
    id: string;
    title: string;
    roles: string[];
    media: ProjectMediaItem[];
    description: string;
    url: string;
    year?: string;
}

export interface ProjectRowSection {
    id: string;
    badge: string;
    title: string;
    subtitle?: string;
    projects: Project[];
}

export interface WorkOnSetImage {
    id: number | string;
    src: string | StaticImageData;
    alt: string;
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
