import type { Variants } from "framer-motion";

export interface ClientItem {
    id: string;
    name: string;
    logo: string;
    alt?: string;
    category?: string;
    url?: string;
}

export interface ClientCardProps {
    client: ClientItem;
    variants?: Variants;
}
