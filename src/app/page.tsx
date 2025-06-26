"use client";

import StaidiumNav from "@/components/nav/staidium-nav";
import StaidiumFooter from "@/components/nav/staidium-footer";
import HeroSection from "@/components/sections/hero-section";
import BenchmarkingSection from "@/components/sections/benchmarking-section";
import StatsSection from "@/components/sections/stats-section";
import FrameworkComparisonSection from "@/components/sections/framework-comparison-section";
import NewsletterSection from "@/components/sections/newsletter-section";
import { SimpleCanvas } from "@/components/sections/simple-canvas";
import { GameShowcase } from "@/components/sections/game-showcase";

// Import UI components used in the competition section
import { CardSpotlight } from "@/components/ui/simplified-card-spotlight";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function StaidiumLandingPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-background text-foreground">
      {/* Navigation */}
      <StaidiumNav />

      {/* Hero Section */}
      <HeroSection />

      {/* Live Benchmarking Demo */}
      <BenchmarkingSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Framework Comparison */}
      <FrameworkComparisonSection />

      {/* Game Showcase */}
      <GameShowcase />

      {/* Newsletter Signup */}
      <NewsletterSection />

      {/* Competition Section - Will refactor next */}
      <section
        id="competitions"
        className="w-full py-24 bg-muted/10 border-y border-border"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Active Competitions
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Compete with the best AI engineers worldwide. Submit your patterns
              and win prizes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Competition Cards */}
            <CardSpotlight className="bg-card border border-border p-6">
              <div className="mb-4">
                <Badge className="bg-secondary text-secondary-foreground">
                  🏆 $5,000 Prize
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">
                Multi-Agent Orchestration Challenge
              </h3>
              <p className="text-muted-foreground mb-4">
                Design the most efficient multi-agent system for complex task
                decomposition.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time Left</span>
                  <span className="font-semibold text-foreground">14 days</span>
                </div>
                <Progress value={65} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Participants</span>
                  <span className="font-semibold text-foreground">1,247</span>
                </div>
              </div>
              <Button className="w-full mt-4" variant="default">
                Join Competition
              </Button>
            </CardSpotlight>

            {/* More competition cards would go here */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <StaidiumFooter />
    </div>
  );
}