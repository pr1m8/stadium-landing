"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameCanvas } from "@/components/games/game-canvas";
import { GameDetail } from "@/components/games/game-detail";
import { AgentOlympics } from "@/components/sections/agent-olympics";
import { AgentOlympicsSignup } from "@/components/sections/agent-olympics-signup";
import { gameData, GameDemo } from "@/lib/data/games";
import { createSampleGames } from "@/lib/csv-parser";
import {
  Play,
  Trophy,
  Users,
  Zap,
  Brain,
  Target,
  ArrowRight,
  Gamepad2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function GamesShowcase() {
  const [selectedGame, setSelectedGame] = useState<GameDemo | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "live" | "details">(
    "overview",
  );

  const featuredGames = gameData.filter((game) => game.featured);
  const liveGames = createSampleGames();

  if (selectedGame && activeTab === "details") {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <GameDetail
            game={selectedGame}
            onBack={() => {
              setSelectedGame(null);
              setActiveTab("overview");
            }}
          />
        </div>
      </section>
    );
  }

  if (activeTab === "live") {
    return (
      <>
        <AgentOlympics />
        <AgentOlympicsSignup />
      </>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Gamepad2 className="w-8 h-8 text-primary" />
            <h2 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              AI Gaming Arena
            </h2>
            <Gamepad2 className="w-8 h-8 text-primary" />
          </div>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience the future of AI competition. Watch intelligent agents
            battle across strategic games, showcasing different reasoning
            approaches and problem-solving styles.
          </p>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Button
              variant={activeTab === "overview" ? "default" : "outline"}
              onClick={() => setActiveTab("overview")}
              className="flex items-center gap-2"
            >
              <Trophy className="w-4 h-4" />
              Games Overview
            </Button>
            <Button
              variant={activeTab === "live" ? "default" : "outline"}
              onClick={() => setActiveTab("live")}
              className="flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Live Competitions
              <Badge variant="destructive" className="ml-1 animate-pulse">
                LIVE
              </Badge>
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {gameData
                  .reduce((sum, game) => sum + game.stats.totalGames, 0)
                  .toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Games Played
              </div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-accent mb-2">
                {gameData.length}
              </div>
              <div className="text-sm text-muted-foreground">Game Types</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-secondary mb-2">6</div>
              <div className="text-sm text-muted-foreground">AI Models</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-destructive mb-2">
                {
                  liveGames.filter(
                    (g) => g.status === "playing" || g.status === "waiting",
                  ).length
                }
              </div>
              <div className="text-sm text-muted-foreground">Live Matches</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Featured Games Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {featuredGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer border-border/50 hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl mb-2">{game.icon}</div>
                    <Badge variant="secondary" className="capitalize">
                      {game.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {game.name}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">
                    {game.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Game Stats */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="font-bold text-lg">
                        {game.stats.totalGames.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Games</div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="font-bold text-lg">
                        {game.stats.avgMovesPerGame}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Avg Moves
                      </div>
                    </div>
                  </div>

                  {/* Top Performers */}
                  <div>
                    <div className="text-sm font-medium mb-2">
                      Top Performers
                    </div>
                    <div className="space-y-1">
                      {Object.entries(game.stats.winRates)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 3)
                        .map(([model, rate]) => (
                          <div
                            key={model}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-muted-foreground">
                              {model}
                            </span>
                            <span className="font-medium">
                              {(rate * 100).toFixed(1)}%
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setSelectedGame(game);
                        setActiveTab("details");
                      }}
                    >
                      <Target className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => setActiveTab("live")}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Watch Live
                    </Button>
                  </div>

                  {/* Sample Game Preview for Tic-Tac-Toe */}
                  {game.id === "tic-tac-toe" && game.demoData.boardState && (
                    <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-2">
                        Sample Game State
                      </div>
                      <div className="grid grid-cols-3 gap-1 w-16 h-16 mx-auto">
                        {game.demoData.boardState
                          .flat()
                          .map((cell: string | null, i: number) => (
                            <div
                              key={i}
                              className="border border-border/50 flex items-center justify-center text-xs font-bold bg-background"
                            >
                              {cell}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-2xl p-8 border border-border/50"
        >
          <h3 className="text-2xl font-bold mb-4">
            Ready to Watch the Competition?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of developers and AI enthusiasts watching real-time
            competitions between the world's most advanced language models.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => setActiveTab("live")}
              className="flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Watch Live Games
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open("https://staidium.io", "_blank")}
              className="flex items-center gap-2"
            >
              <Brain className="w-5 h-5" />
              Visit Staidium.io
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
