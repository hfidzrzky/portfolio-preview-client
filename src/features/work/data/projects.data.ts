import type { Project, ProjectRowSection } from "../types";

export const PROJECTS: Project[] = [
    // --- ROW 1 (01 - 06): Volume 01: Commercial & Narrative Films ---
    {
        id: "1",
        title: "Campaign “Yamaha Indonesia”",
        roles: ["Lighting Technician"],
        media: [
            { id: "1-1", type: "video", src: "/selected-works/project-1/slide-1.mp4", alt: "Campaign Yamaha Indonesia Shot 1" },
            { id: "1-2", type: "video", src: "/selected-works/project-1/slide-2.mp4", alt: "Campaign Yamaha Indonesia Shot 2" },
            { id: "1-3", type: "video", src: "/selected-works/project-1/slide-3.mp4", alt: "Campaign Yamaha Indonesia Shot 3" },
        ],
        url: "#",
        fitMode: "contain",
        ambientBackdrop: true,
    },
    {
        id: "2",
        title: "Campaign “South Legend”",
        roles: ["Videographer"],
        media: [
            { id: "2-1", type: "video", src: "/selected-works/project-2/slide-1.mp4", alt: "Campaign South Legend Frame 1" },
            { id: "2-2", type: "video", src: "/selected-works/project-2/slide-2.mp4", alt: "Campaign South Legend Frame 2" },
        ],
        url: "#",
    },
    {
        id: "3",
        title: "Campaign “South Legend”",
        roles: ["Videographer"],
        media: [
            { id: "3-1", type: "video", src: "/selected-works/project-3/slide-1.mp4", alt: "Campaign South Legend Shot 1" },
            { id: "3-2", type: "video", src: "/selected-works/project-3/slide-2.mp4", alt: "Campaign South Legend Shot 2" },
        ],
        url: "#",
    },
    {
        id: "4",
        title: "MV “Tukar Lalu” Bunga Reyza ft Dimansyah Laitupa - Hits Records",
        roles: ["Lighting Technician"],
        media: [
            { id: "4-1", type: "video", src: "/selected-works/project-4/slide-1.mp4", alt: "MV Tukar Lalu Shot 1" },
            { id: "4-2", type: "video", src: "/selected-works/project-4/slide-2.mp4", alt: "MV Tukar Lalu Shot 2" },
        ],
        url: "#",
    },
    {
        id: "5",
        title: "MV “Layang - Layang” Soenji",
        roles: ["Lighting Technician"],
        media: [
            { id: "5-1", type: "video", src: "/selected-works/project-5/slide-1.mp4", alt: "MV Layang - Layang Shot 1" },
            { id: "5-2", type: "video", src: "/selected-works/project-5/slide-2.mp4", alt: "MV Layang - Layang Shot 2" },
            { id: "5-3", type: "video", src: "/selected-works/project-5/slide-3.mp4", alt: "MV Layang - Layang Shot 3" },
        ],
        url: "#",
    },
    {
        id: "6",
        title: "MV “MAMA” 510",
        roles: ["Lighting Technician"],
        media: [
            { id: "6-1", type: "video", src: "/selected-works/project-6/slide-1.mp4", alt: "MV MAMA Shot 1" },
            { id: "6-2", type: "video", src: "/selected-works/project-6/slide-2.mp4", alt: "MV MAMA Shot 2" },
        ],
        url: "#",
    },

    // --- ROW 2 (07 - 12): Volume 02: Motion & Visual Experiments ---
    {
        id: "7",
        title: "Company Profile ITB 1920",
        roles: ["Camera Operator", "Assistant Camera"],
        media: [
            { id: "7-1", type: "video", src: "/selected-works/project-7/slide-1.mp4", alt: "Company Profile ITB 1920 Shot 1" },
        ],
        url: "#",
    },
    {
        id: "8",
        title: "Campaign “InDrive”",
        roles: ["Gaffer"],
        media: [
            { id: "8-1", type: "video", src: "/selected-works/project-8/slide-1.mp4", alt: "Campaign InDrive Shot 1" },
            { id: "8-2", type: "video", src: "/selected-works/project-8/slide-2.mp4", alt: "Campaign InDrive Shot 2" },
        ],
        url: "#",
    },
    {
        id: "9",
        title: "Campaign “SVH”",
        roles: ["Lighting Technician"],
        media: [
            { id: "9-1", type: "video", src: "/selected-works/project-9/slide-1.mp4", alt: "Campaign SVH Clip 1" },
            { id: "9-2", type: "video", src: "/selected-works/project-9/slide-2.mp4", alt: "Campaign SVH Clip 2" },
            { id: "9-3", type: "image", src: "/selected-works/project-9/slide-3.webp", alt: "Campaign SVH Still 3" },
            { id: "9-4", type: "image", src: "/selected-works/project-9/slide-4.webp", alt: "Campaign SVH Still 4" },
            { id: "9-5", type: "image", src: "/selected-works/project-9/slide-5.webp", alt: "Campaign SVH Still 5" },
            { id: "9-6", type: "image", src: "/selected-works/project-9/slide-6.webp", alt: "Campaign SVH Still 6" },
            { id: "9-7", type: "image", src: "/selected-works/project-9/slide-7.webp", alt: "Campaign SVH Still 7" },
            { id: "9-8", type: "image", src: "/selected-works/project-9/slide-8.webp", alt: "Campaign SVH Still 8" },
            { id: "9-9", type: "image", src: "/selected-works/project-9/slide-9.webp", alt: "Campaign SVH Still 9" },
        ],
        url: "#",
    },
    {
        id: "10",
        title: "Short Film Sony “Nanti”",
        roles: ["Gaffer"],
        media: [
            { id: "10-1", type: "video", src: "/selected-works/project-10/slide-1.mp4", alt: "Short Film Sony Nanti Shot 1" },
            { id: "10-2", type: "video", src: "/selected-works/project-10/slide-2.mp4", alt: "Short Film Sony Nanti Shot 2" },
        ],
        url: "#",
    },
    {
        id: "11",
        title: "Campaign “THESILVERSKY”",
        roles: ["Videographer"],
        media: [
            { id: "11-1", type: "video", src: "/selected-works/project-11/slide-1.mp4", alt: "Campaign THESILVERSKY Video 1" },
            { id: "11-2", type: "video", src: "/selected-works/project-11/slide-2.mp4", alt: "Campaign THESILVERSKY Video 2" },
            { id: "11-3", type: "image", src: "/selected-works/project-11/slide-3.webp", alt: "Campaign THESILVERSKY Still 3" },
            { id: "11-4", type: "image", src: "/selected-works/project-11/slide-4.webp", alt: "Campaign THESILVERSKY Still 4" },
        ],
        url: "#",
    },
    {
        id: "12",
        title: "Campaign “Urban Exchange”",
        roles: ["Videographer"],
        media: [
            { id: "12-1", type: "video", src: "/selected-works/project-12/slide-1.mp4", alt: "Campaign Urban Exchange Shot 1" },
            { id: "12-2", type: "video", src: "/selected-works/project-12/slide-2.mp4", alt: "Campaign Urban Exchange Shot 2" },
        ],
        url: "#",
        rotate: -90,
    },

    // --- ROW 3 (13 - 19): Volume 03: Stills & Documentary Frames ---
    {
        id: "13",
        title: "Photoshoot for Brand Fashion “Livehaf”",
        roles: ["Photographer"],
        media: [
            { id: "13-1", type: "image", src: "/selected-works/project-13/slide-1.webp", alt: "Photoshoot Livehaf Still 1" },
            { id: "13-2", type: "image", src: "/selected-works/project-13/slide-2.webp", alt: "Photoshoot Livehaf Still 2" },
            { id: "13-3", type: "image", src: "/selected-works/project-13/slide-3.webp", alt: "Photoshoot Livehaf Still 3" },
            { id: "13-4", type: "image", src: "/selected-works/project-13/slide-4.webp", alt: "Photoshoot Livehaf Still 4" },
        ],
        url: "#",
    },
    {
        id: "14",
        title: "Photoshoot for Brand Fashion “TRISET”",
        roles: ["Gaffer"],
        media: [
            { id: "14-1", type: "image", src: "/selected-works/project-14/slide-1.webp", alt: "Photoshoot TRISET Still 1" },
            { id: "14-2", type: "image", src: "/selected-works/project-14/slide-2.webp", alt: "Photoshoot TRISET Still 2" },
            { id: "14-3", type: "image", src: "/selected-works/project-14/slide-3.webp", alt: "Photoshoot TRISET Still 3" },
            { id: "14-4", type: "image", src: "/selected-works/project-14/slide-4.webp", alt: "Photoshoot TRISET Still 4" },
            { id: "14-5", type: "image", src: "/selected-works/project-14/slide-5.webp", alt: "Photoshoot TRISET Still 5" },
            { id: "14-6", type: "image", src: "/selected-works/project-14/slide-6.webp", alt: "Photoshoot TRISET Still 6" },
            { id: "14-7", type: "image", src: "/selected-works/project-14/slide-7.webp", alt: "Photoshoot TRISET Still 7" },
        ],
        url: "#",
    },
    {
        id: "15",
        title: "Photoshoot for Brand Fashion “Hijacket”",
        roles: ["Photographer"],
        media: [
            { id: "15-1", type: "image", src: "/selected-works/project-15/slide-1.webp", alt: "Photoshoot Hijacket Still 1" },
            { id: "15-2", type: "image", src: "/selected-works/project-15/slide-2.webp", alt: "Photoshoot Hijacket Still 2" },
            { id: "15-3", type: "image", src: "/selected-works/project-15/slide-3.webp", alt: "Photoshoot Hijacket Still 3" },
            { id: "15-4", type: "image", src: "/selected-works/project-15/slide-4.webp", alt: "Photoshoot Hijacket Still 4" },
            { id: "15-5", type: "image", src: "/selected-works/project-15/slide-5.webp", alt: "Photoshoot Hijacket Still 5" },
            { id: "15-6", type: "image", src: "/selected-works/project-15/slide-6.webp", alt: "Photoshoot Hijacket Still 6" },
        ],
        url: "#",
    },
    {
        id: "16",
        title: "Photoshoot for Brand Fashion “Livehaf”",
        roles: ["Photographer"],
        media: [
            { id: "16-1", type: "image", src: "/selected-works/project-16/slide-1.webp", alt: "Photoshoot Livehaf Still 1" },
            { id: "16-2", type: "image", src: "/selected-works/project-16/slide-2.webp", alt: "Photoshoot Livehaf Still 2" },
            { id: "16-3", type: "image", src: "/selected-works/project-16/slide-3.webp", alt: "Photoshoot Livehaf Still 3" },
            { id: "16-4", type: "image", src: "/selected-works/project-16/slide-4.webp", alt: "Photoshoot Livehaf Still 4" },
            { id: "16-5", type: "image", src: "/selected-works/project-16/slide-5.webp", alt: "Photoshoot Livehaf Still 5" },
            { id: "16-6", type: "image", src: "/selected-works/project-16/slide-6.webp", alt: "Photoshoot Livehaf Still 6" },
        ],
        url: "#",
    },
    {
        id: "17",
        title: "Music Video “Rasukma”",
        roles: ["Lighting Technician"],
        media: [
            { id: "17-1", type: "video", src: "/selected-works/project-17/slide-1.mp4", alt: "Music Video Rasukma Clip 1" },
            { id: "17-2", type: "video", src: "/selected-works/project-17/slide-2.mp4", alt: "Music Video Rasukma Clip 2" },
            { id: "17-3", type: "video", src: "/selected-works/project-17/slide-3.mp4", alt: "Music Video Rasukma Clip 3" },
        ],
        url: "#",
    },
    {
        id: "18",
        title: "Short Trip Documentary Bank Indonesia",
        roles: ["Videographer", "Drone Pilot"],
        media: [
            { id: "18-1", type: "video", src: "/selected-works/project-18/slide-1.mp4", alt: "Documentary Bank Indonesia Clip 1" },
            { id: "18-2", type: "video", src: "/selected-works/project-18/slide-2.mp4", alt: "Documentary Bank Indonesia Clip 2" },
            { id: "18-3", type: "video", src: "/selected-works/project-18/slide-3.mp4", alt: "Documentary Bank Indonesia Clip 3" },
        ],
        url: "#",
    },
    {
        id: "19",
        title: "Music Video “Manakala” By Wolza",
        roles: ["Lighting Technician"],
        media: [
            { id: "19-1", type: "video", src: "/selected-works/project-19/slide-1.mp4", alt: "Music Video Manakala Shot 1" },
            { id: "19-2", type: "video", src: "/selected-works/project-19/slide-2.mp4", alt: "Music Video Manakala Shot 2" },
            { id: "19-3", type: "video", src: "/selected-works/project-19/slide-3.mp4", alt: "Music Video Manakala Shot 3" },
        ],
        url: "#",
    },
];

export const PROJECT_ROWS: ProjectRowSection[] = [
    {
        id: "row-1",
        badge: "Selected Works",
        title: "Commercial & Narrative Films",
        projects: PROJECTS.slice(0, 6),
    },
    {
        id: "row-2",
        badge: "Selected Works",
        title: "Motion & Visual Experiments",
        projects: PROJECTS.slice(6, 12),
    },
    {
        id: "row-3",
        badge: "Selected Works",
        title: "Stills & Documentary Frames",
        projects: PROJECTS.slice(12, 19),
    },
];

