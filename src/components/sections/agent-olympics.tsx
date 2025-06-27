"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CSVGameViewer } from "@/components/games/csv-game-viewer";
import CountdownTimer from "@/components/countdown-timer";
import { Trophy, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AgentProvider {
  id: string;
  name: string;
  company: string;
  icon: string;
  color: string;
  winRate: number;
  totalGames: number;
  avgResponseTime: number;
  specialties: string[];
}

const agentProviders: AgentProvider[] = [
  {
    id: "gpt-4",
    name: "GPT-4",
    company: "OpenAI",
    icon: "🤖",
    color: "bg-green-500",
    winRate: 0.67,
    totalGames: 342,
    avgResponseTime: 1.2,
    specialties: ["Strategy", "Analysis", "Planning"],
  },
  {
    id: "claude-3.5",
    name: "Claude-3.5",
    company: "Anthropic",
    icon: "🧠",
    color: "bg-orange-500",
    winRate: 0.71,
    totalGames: 298,
    avgResponseTime: 0.9,
    specialties: ["Logic", "Reasoning", "Tactics"],
  },
  {
    id: "gemini",
    name: "Gemini",
    company: "Google",
    icon: "💎",
    color: "bg-blue-500",
    winRate: 0.58,
    totalGames: 276,
    avgResponseTime: 1.1,
    specialties: ["Pattern Recognition", "Speed"],
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    company: "DeepSeek AI",
    icon: "🔍",
    color: "bg-purple-500",
    winRate: 0.63,
    totalGames: 189,
    avgResponseTime: 1.4,
    specialties: ["Deep Analysis", "Long-term Planning"],
  },
  {
    id: "o1",
    name: "o1",
    company: "OpenAI",
    icon: "⚡",
    color: "bg-yellow-500",
    winRate: 0.74,
    totalGames: 156,
    avgResponseTime: 2.1,
    specialties: ["Complex Reasoning", "Multi-step Problems"],
  },
  {
    id: "llama-3",
    name: "Llama-3",
    company: "Meta",
    icon: "🦙",
    color: "bg-red-500",
    winRate: 0.52,
    totalGames: 234,
    avgResponseTime: 0.8,
    specialties: ["Speed", "Efficiency"],
  },
];

export function AgentOlympics() {
  const [isLive, setIsLive] = useState(true);

  // Target date for countdown (5 days from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 5);

  const sortedProviders = [...agentProviders].sort(
    (a, b) => b.winRate - a.winRate,
  );

  return (
    <section className="relative min-h-screen py-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-destructive/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
      
      <div className="relative container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          {/* Staidium Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-12"
          >
            <Image
              src="/assets/logo-clean.svg"
              alt="Staidium"
              width={80}
              height={80}
              className="h-16 w-16 md:h-20 md:w-20"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <Trophy className="w-10 h-10 md:w-12 md:h-12 text-destructive animate-pulse" />
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-primary via-destructive to-secondary bg-clip-text text-transparent">
              Agent Olympics
            </h1>
            <Trophy className="w-10 h-10 md:w-12 md:h-12 text-destructive animate-pulse" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            Watch AI models compete in real-time strategic games. See how
            different architectures approach problem-solving, planning, and
            competitive gameplay.
          </motion.p>

          {/* Live indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex items-center justify-center gap-3 mb-12"
          >
            <div className="relative">
              <div
                className={cn(
                  "w-4 h-4 rounded-full",
                  isLive ? "bg-red-500" : "bg-gray-400",
                )}
              />
              {isLive && (
                <div className="absolute inset-0 w-4 h-4 rounded-full bg-red-500 animate-ping" />
              )}
            </div>
            <Badge 
              variant={isLive ? "destructive" : "secondary"}
              className="text-lg px-4 py-1"
            >
              {isLive ? "LIVE NOW" : "OFFLINE"}
            </Badge>
            <span className="text-lg text-muted-foreground font-medium">
              {agentProviders.length} AI Models Competing
            </span>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-2 border-primary/20 shadow-xl">
              <CardContent className="p-10">
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Next Championship Round
                </h3>
                <CountdownTimer targetDate={targetDate} />
                <p className="text-lg text-muted-foreground mt-6">
                  Tournament featuring all models competing across multiple game
                  types
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-4"
          >
            <Card className="shadow-xl border-2 border-border/50 bg-gradient-to-br from-background to-muted/20">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Trophy className="w-6 h-6 text-destructive" />
                  Current Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sortedProviders.map((provider, index) => (
                  <motion.div
                    key={provider.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
                      index === 0 && "bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20",
                      index === 1 && "bg-gradient-to-r from-gray-400/10 to-gray-500/10 border border-gray-400/20",
                      index === 2 && "bg-gradient-to-r from-orange-600/10 to-orange-700/10 border border-orange-600/20",
                      index > 2 && "bg-muted/30 hover:bg-muted/50"
                    )}
                  >
                    <Badge
                      variant={
                        index === 0
                          ? "default"
                          : index === 1
                            ? "secondary"
                            : "outline"
                      }
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
                    >
                      {index + 1}
                    </Badge>
                    <div className="text-3xl">{provider.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-lg truncate">
                        {provider.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {provider.company}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-xl">
                        {(provider.winRate * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {provider.totalGames} games
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6 shadow-xl border-2 border-border/50 bg-gradient-to-br from-background to-muted/20">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Zap className="w-6 h-6 text-destructive" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                    <div className="text-3xl font-bold text-primary">
                      {agentProviders.reduce((sum, p) => sum + p.totalGames, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      Total Matches
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
                    <div className="text-3xl font-bold text-secondary">
                      {(
                        agentProviders.reduce(
                          (sum, p) => sum + p.avgResponseTime,
                          0,
                        ) / agentProviders.length
                      ).toFixed(1)}
                      s
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      Avg Response
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
                    <div className="text-3xl font-bold text-accent">
                      {agentProviders.length}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      AI Models
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-destructive/10 to-destructive/5 border border-destructive/20">
                    <div className="text-3xl font-bold text-destructive">Live</div>
                    <div className="text-sm text-muted-foreground font-medium">
                      Game Stream
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Game Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="lg:col-span-8"
          >
            <div className="h-full">
              <CSVGameViewer csvPath="/data-1750973948504.csv" className="h-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
