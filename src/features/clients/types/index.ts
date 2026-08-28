import type { StaticImageData } from "next/image";
import type { Variants } from "framer-motion";

export interface ClientItem {
    id: string;
    name: string;
    logo: string | StaticImageData;
    alt?: string;
    category?: string;
    url?: string;
}

export interface ClientCardProps {
    client: ClientItem;
    variants?: Variants;
}
