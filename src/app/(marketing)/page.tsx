import { Hero } from "@/components/features/Hero";
import { About } from "@/components/features/About";
import { ProjectGallery } from "@/components/features/ProjectGallery";
import { WorkOnSet } from "@/components/features/WorkOnSet";
import { Contact } from "@/components/features/Contact";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export default function HomePage() {
    return (
        <div className="flex flex-col">
            <section id="home">
                <Hero />
            </section>

            <section id="about" className="scroll-mt-20">
                <About />
            </section>

            <section id="projects" className="scroll-mt-20">
                <ProjectGallery />
                <WorkOnSet />
            </section>

            <section id="contact" className="scroll-mt-20">
                <Contact />
            </section>

            <ScrollToTop />
        </div>
    );
}