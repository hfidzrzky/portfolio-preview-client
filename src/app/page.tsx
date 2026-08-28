import dynamic from "next/dynamic";
import { Hero } from "@/features/hero";
import { About } from "@/features/about";

const ProjectGallery = dynamic(
    () => import("@/features/work").then((mod) => mod.ProjectGallery)
);
const WorkOnSet = dynamic(
    () => import("@/features/work").then((mod) => mod.WorkOnSet)
);
const Clients = dynamic(
    () => import("@/features/clients").then((mod) => mod.Clients)
);
const Contact = dynamic(
    () => import("@/features/contact").then((mod) => mod.Contact)
);
const ScrollToTop = dynamic(
    () => import("@/shared/ui").then((mod) => mod.ScrollToTop)
);

export default function HomePage() {
    return (
        <div className="flex flex-col w-full bg-dark">
            <Hero />
            <About />
            <ProjectGallery />
            <WorkOnSet />
            <Clients />
            <Contact />
            <ScrollToTop />
        </div>
    );
}
