import type { WorkOnSetImage } from "../types";
import wos1 from "@public/work-on-set/wos-1.webp";
import wos2 from "@public/work-on-set/wos-2.webp";
import wos3 from "@public/work-on-set/wos-3.webp";
import wos4 from "@public/work-on-set/wos-4.webp";

export const WORK_ON_SET_IMAGES: WorkOnSetImage[] = [
    {
        id: 1,
        src: wos1,
        alt: "Directing the talent on set",
    },
    {
        id: 2,
        src: wos2,
        alt: "Lighting setup",
    },
    {
        id: 3,
        src: wos3,
        alt: "Camera gear",
    },
    {
        id: 4,
        src: wos4,
        alt: "Reviewing footage",
    },
];
