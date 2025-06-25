"use client";

import { Button } from "@/components/ui/button";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { TextGenerateEffect } from "@/components/ui/simplified-text-generate-effect";
import { SparklesCore } from "@/components/ui/simplified-sparkles";

export default function HeroSection() {
  return (
    <section className="w-full min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Sparkles */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="staidiumSparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleColor="#dc2626" // red-600
          particleDensity={70}
          className="w-full h-full"
        />
      </div>

      {/* Hero Content */}
      <HeroHighlight className="w-full max-w-6xl flex flex-col items-center justify-center text-center gap-8 py-24 px-4 z-10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-black">
          Stop <Highlight>Rewriting</Highlight>.{" "}
          Start <Highlight>Benchmarking</Highlight>.
        </h1>

        <TextGenerateEffect
          words="The competitive platform for AI agent architectures. Write once, run anywhere, benchmark everything."
          className="max-w-3xl mx-auto text-gray-600 text-xl md:text-2xl font-normal"
        />

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mt-12">
          <Button variant="default" size="lg" className="min-w-[200px]">
            Browse Leaderboards
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="min-w-[200px] bg-red-600 hover:bg-red-700 text-white"
          >
            Upload Your Pattern
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-black text-black hover:bg-black hover:text-white min-w-[200px]"
          >
            View Documentation
          </Button>
        </div>
      </HeroHighlight>
    </section>
  );
}