"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Trophy, Clock, Target } from "lucide-react";
import { GameDemo, getFeaturedGames } from "@/lib/data/games";

export function GameShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredGames = useMemo(() => getFeaturedGames(), []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredGames.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + featuredGames.length) % featuredGames.length,
    );
  };

  const currentGame = featuredGames[currentIndex];

  if (!currentGame) return null;

  return (
    <section id="games" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            AI Models Competing in Real Games
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch leading AI models battle it out across different competitive
            environments. See strategy, adaptation, and intelligence in action.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Game Display */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Game Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{currentGame.icon}</div>
                <div>
                  <h3 className="text-3xl font-bold">{currentGame.name}</h3>
                  <p className="text-muted-foreground">
                    {currentGame.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Trophy className="w-6 h-6 mx-auto mb-2 text-secondary" />
                    <div className="text-2xl font-bold">
                      {currentGame.stats.totalGames.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Games Played
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Target className="w-6 h-6 mx-auto mb-2 text-accent" />
                    <div className="text-2xl font-bold">
                      {currentGame.stats.avgMovesPerGame}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Avg Moves
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">
                      {currentGame.stats.avgDuration}m
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Avg Duration
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Win Rates */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Current Leaderboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(currentGame.stats.winRates)
                      .sort(([, a], [, b]) => b - a)
                      .map(([model, rate], index) => (
                        <div
                          key={model}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={index === 0 ? "default" : "secondary"}
                            >
                              #{index + 1}
                            </Badge>
                            <span className="font-medium">{model}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">
                              {(rate * 100).toFixed(1)}%
                            </div>
                            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-secondary transition-all duration-500"
                                style={{ width: `${rate * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Recent Results */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold">Recent Matches</h4>
              <div className="space-y-3">
                {currentGame.recentResults.slice(0, 5).map((result, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{result.player1}</span>
                        <span className="text-muted-foreground">vs</span>
                        <span className="font-medium">{result.player2}</span>
                      </div>
                      <Badge
                        variant={
                          result.winner === result.player1
                            ? "default"
                            : "secondary"
                        }
                      >
                        {result.winner} wins
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {result.moves && <span>{result.moves} moves</span>}
                      {result.duration && <span>{result.duration}m</span>}
                      {result.score && <span>{result.score}</span>}
                      <span>
                        {new Date(result.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>

              <Button className="w-full" variant="outline">
                View All {currentGame.name} Matches
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={featuredGames.length <= 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex gap-2">
              {featuredGames.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-secondary" : "bg-muted"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={featuredGames.length <= 1}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Game Selection Tabs */}
          <div className="flex justify-center gap-2 mt-8 flex-wrap">
            {featuredGames.map((game, index) => (
              <Button
                key={game.id}
                variant={index === currentIndex ? "default" : "outline"}
                onClick={() => setCurrentIndex(index)}
                className="flex items-center gap-2"
              >
                <span>{game.icon}</span>
                <span>{game.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
