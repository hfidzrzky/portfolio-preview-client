import type { StaticImageData } from "next/image";

export interface Project {
    id: string;
    title: string;
    roles: string[];
    thumbnail: string;
    description: string;
    year: string;
    category: string;
    url: string;
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
