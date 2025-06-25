"use client";

import StaidiumNav from "@/components/nav/staidium-nav";
import StaidiumFooter from "@/components/nav/staidium-footer";
import HeroSection from "@/components/sections/hero-section";
import BenchmarkingSection from "@/components/sections/benchmarking-section";
import StatsSection from "@/components/sections/stats-section";
import FrameworkComparisonSection from "@/components/sections/framework-comparison-section";

// Import other sections as we create them
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CardSpotlight } from "@/components/ui/simplified-card-spotlight";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { CheckCircle, SparklesIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Leaderboard data
const leaderboardData = [
  {
    name: "Supervisor-Worker",
    author: { name: "Alex Chen", avatar: "/assets/logo.svg" },
    score: "9.8",
    cost: "0.07",
    latency: "2.8",
    successRate: "94",
    lastUpdated: "4h ago",
    change: 0,
    isVerified: true,
  },
  // ... rest of the data
];

export default function StaidiumLandingPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-white text-black">
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

      {/* Competition Section - Will refactor next */}
      <section
        id="competitions"
        className="w-full py-24 bg-gray-50 border-y border-black"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
              Active Competitions
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Compete with the best AI engineers worldwide. Submit your patterns
              and win prizes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Competition Cards */}
            <CardSpotlight className="bg-white border-2 border-black p-6">
              <div className="mb-4">
                <Badge className="bg-red-600 text-white">
                  🏆 $5,000 Prize
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-2 text-black">
                Multi-Agent Orchestration Challenge
              </h3>
              <p className="text-gray-600 mb-4">
                Design the most efficient multi-agent system for complex task
                decomposition.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Time Left</span>
                  <span className="font-semibold text-black">14 days</span>
                </div>
                <Progress value={65} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Participants</span>
                  <span className="font-semibold text-black">1,247</span>
                </div>
              </div>
              <Button className="w-full mt-4 bg-black text-white hover:bg-gray-800">
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