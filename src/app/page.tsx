import { Hero } from "@/features/hero";
import { About } from "@/features/about";
import { ProjectGallery, WorkOnSet } from "@/features/work";
import { Contact } from "@/features/contact";
import { ScrollToTop } from "@/shared/ui";

export default function HomePage() {
    return (
        <main className="flex flex-col bg-dark">
            <Hero />
            <About />
            <ProjectGallery />
            <WorkOnSet />
            <Contact />
            <ScrollToTop />
        </main>
    );
}
