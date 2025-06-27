"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GameDemo } from "@/lib/data/games";
import { ArrowLeft, Trophy, Clock, Target, TrendingUp } from "lucide-react";

interface GameDetailProps {
  game: GameDemo;
  onBack?: () => void;
}

export function GameDetail({ game, onBack }: GameDetailProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        {onBack && (
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
        )}
        <div className="flex items-center gap-4">
          <div className="text-6xl">{game.icon}</div>
          <div>
            <h1 className="text-4xl font-bold">{game.name}</h1>
            <p className="text-xl text-muted-foreground">{game.description}</p>
            <Badge className="mt-2 capitalize">{game.category}</Badge>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-3 text-secondary" />
            <div className="text-3xl font-bold">
              {game.stats.totalGames.toLocaleString()}
            </div>
            <div className="text-muted-foreground">Total Games</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 mx-auto mb-3 text-accent" />
            <div className="text-3xl font-bold">
              {game.stats.avgMovesPerGame}
            </div>
            <div className="text-muted-foreground">Avg Moves</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 mx-auto mb-3 text-primary" />
            <div className="text-3xl font-bold">{game.stats.avgDuration}m</div>
            <div className="text-muted-foreground">Avg Duration</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-3 text-destructive" />
            <div className="text-3xl font-bold">
              {game.stats.topPerformers.length}
            </div>
            <div className="text-muted-foreground">Top Models</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Current Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(game.stats.winRates)
                .sort(([, a], [, b]) => b - a)
                .map(([model, rate], index) => (
                  <div
                    key={model}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={index === 0 ? "default" : "secondary"}
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                      >
                        {index + 1}
                      </Badge>
                      <span className="text-lg font-medium">{model}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        {(rate * 100).toFixed(1)}%
                      </div>
                      <div className="w-24 h-3 bg-background rounded-full overflow-hidden">
                        <div
                          className="h-full bg-secondary transition-all duration-700"
                          style={{ width: `${rate * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Results */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Recent Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {game.recentResults.map((result, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-muted/50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-lg">
                        {result.player1}
                      </span>
                      <span className="text-muted-foreground font-medium">
                        vs
                      </span>
                      <span className="font-semibold text-lg">
                        {result.player2}
                      </span>
                    </div>
                    <Badge
                      variant={
                        result.winner === result.player1
                          ? "default"
                          : "secondary"
                      }
                      className="text-sm"
                    >
                      {result.winner} wins
                    </Badge>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    {result.moves && (
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        <span>{result.moves} moves</span>
                      </div>
                    )}
                    {result.duration && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{result.duration}m</span>
                      </div>
                    )}
                    {result.score && (
                      <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        <span>{result.score}</span>
                      </div>
                    )}
                    <span>
                      {new Date(result.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              Load More Matches
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Sample Moves (if available) */}
      {game.demoData.sampleMoves && game.demoData.sampleMoves.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Sample Game Sequence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {game.demoData.sampleMoves.map((move, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {index + 1}. {move}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
