export type ProjectMediaType = "image" | "video";
export type MediaAspectRatio = "16/9" | "4/5" | "9/16" | "1/1" | "21/9";
export type MediaFitMode = "contain" | "cover";
export type MediaRotation = 90 | -90 | 180 | 270;

export interface ProjectMediaItem {
    id: string;
    type: ProjectMediaType;
    src: string;
    poster?: string;
    alt?: string;
    aspectRatio?: MediaAspectRatio;
    fitMode?: MediaFitMode;
    rotate?: MediaRotation;
}

export interface Project {
    id: string;
    title: string;
    roles: string[];
    media: ProjectMediaItem[];
    description?: string;
    url: string;
    year?: string;
    aspectRatio?: MediaAspectRatio;
    fitMode?: MediaFitMode;
    rotate?: MediaRotation;
    ambientBackdrop?: boolean;
}

export interface ProjectRowSection {
    id: string;
    badge: string;
    title: string;
    projects: Project[];
}

export type WorkOnSetTab = 'bts-01' | 'bts-02' | 'bts-03';
export type WorkOnSetCategory = 'all' | 'directing' | 'gear' | 'lighting' | 'candid' | 'project';

export interface WorkOnSetImage {
    id: string;
    src: string;
    alt: string;
    tab: WorkOnSetTab;
    category?: Exclude<WorkOnSetCategory, 'all'>;
    aspectRatio: 'portrait' | 'landscape' | 'vertical' | 'square';
    tag?: string;
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
