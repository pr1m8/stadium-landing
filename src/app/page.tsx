"use client";

import { useTheme } from "@/components/theme/theme-provider";
import { useEffect, useState } from "react";

import { DownloadResumeButton } from "@/components/common/download-resume-button";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-background text-foreground transition-colors duration-500 ease-in-out">
      {mounted && (
        <div className="fixed top-2 left-2 text-xs bg-muted px-2 py-1 rounded">
          Theme: {theme}
        </div>
      )}

      <section className="w-full max-w-4xl flex flex-col items-center justify-center text-center gap-8 py-24 px-4">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Hi, I'm Will Astley
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
          Building AI agents, architectures, and solving complex technical challenges.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <DownloadResumeButton />
          <Button variant="secondary" asChild>
            <a href="#projects">View Projects</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
