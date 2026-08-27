import { Hero } from "@/features/hero";
import { About } from "@/features/about";
import { ProjectGallery, WorkOnSet } from "@/features/work";
import { Clients } from "@/features/clients";
import { Contact } from "@/features/contact";
import { ScrollToTop } from "@/shared/ui";

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
