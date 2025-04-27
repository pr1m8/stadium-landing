// src/app/page.tsx

import { DownloadResumeButton } from "@/components/common/download-resume-button";
import { Button } from "@/components/ui/button";
import { HeroHighlight } from "@/components/ui/hero-highlight"; // You have some nice magicui / hero ui stuff
import { Spotlight } from "@/components/ui/spotlight"; // optional extra effect

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center gap-10 py-20">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Hi, I'm Will Astley
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
          Building agents, AI architectures, and solving complex technical
          challenges.
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <DownloadResumeButton />
          {/* Example: View Projects button */}
          <Button variant="secondary" asChild>
            <a href="#projects">View Projects</a>
          </Button>
        </div>
      </div>

      {/* (Optional) Spotlight animation under Hero */}
      {/* <Spotlight className="absolute inset-0 z-[-1]" /> */}

      {/* Projects Section */}
      <div id="projects" className="w-full max-w-6xl mt-24 space-y-10">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Selected Projects
        </h2>

        {/* Insert Project Cards Component here (coming next) */}
        {/* <ProjectsGrid /> */}
      </div>

      {/* Contact Section */}
      <div
        id="contact"
        className="w-full max-w-2xl mt-24 text-center space-y-6"
      >
        <h2 className="text-3xl font-bold tracking-tight">Let's Connect</h2>
        <p className="text-muted-foreground">
          Feel free to reach out about opportunities, projects, or
          collaborations.
        </p>

        {/* Contact Button (can link to email or open a form) */}
        <Button variant="outline" asChild>
          <a href="mailto:your.email@example.com">Get in Touch</a>
        </Button>
      </div>
    </section>
  );
}
