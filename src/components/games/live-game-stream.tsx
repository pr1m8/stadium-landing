"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GameCanvas, GameState } from "./game-canvas";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Zap,
  Activity,
  Brain,
  Trophy,
  Clock,
  Target,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface GameRecord {
  thread_id: string;
  checkpoint_ns: string;
  checkpoint_id: string;
  parent_checkpoint_id: string | null;
  type: string | null;
  checkpoint: any;
  metadata: any;
  created_at: string;
  board?: any[][];
  turn?: string;
  winner?: string;
  game_status?: string;
  move?: { row: number; col: number; player: string };
}

interface LiveGameStreamProps {
  csvData?: GameRecord[];
  className?: string;
}

// Parse the checkpoint and metadata JSON strings
function parseGameRecord(record: any): GameRecord {
  try {
    const checkpoint =
      typeof record.checkpoint === "string"
        ? JSON.parse(record.checkpoint)
        : record.checkpoint;

    const metadata =
      typeof record.metadata === "string"
        ? JSON.parse(record.metadata)
        : record.metadata;

    // Extract game state from metadata writes
    let board = null;
    let turn = null;
    let winner = null;
    let game_status = null;
    let move = null;

    if (metadata?.writes?.make_move) {
      const moveData = metadata.writes.make_move;
      board = moveData.board;
      turn = moveData.turn;
      winner = moveData.winner;
      game_status = moveData.game_status;

      if (moveData.move_history && moveData.move_history.length > 0) {
        const lastMove =
          moveData.move_history[moveData.move_history.length - 1];
        if (lastMove.kwargs) {
          move = {
            row: lastMove.kwargs.row,
            col: lastMove.kwargs.col,
            player: lastMove.kwargs.player,
          };
        }
      }
    }

    return {
      ...record,
      checkpoint,
      metadata,
      board,
      turn,
      winner,
      game_status,
      move,
    };
  } catch (error) {
    console.error("Error parsing game record:", error);
    return record;
  }
}

// Group records by thread_id to create games
function createGamesFromRecords(records: GameRecord[]): GameState[] {
  const gamesByThread = new Map<string, GameRecord[]>();

  // Group by thread_id
  records.forEach((record) => {
    const parsed = parseGameRecord(record);
    if (!gamesByThread.has(parsed.thread_id)) {
      gamesByThread.set(parsed.thread_id, []);
    }
    gamesByThread.get(parsed.thread_id)!.push(parsed);
  });

  // Convert to GameState format
  const games: GameState[] = [];
  let gameIndex = 0;

  gamesByThread.forEach((threadRecords, threadId) => {
    // Sort by created_at
    threadRecords.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );

    // Extract moves
    const moves = threadRecords
      .filter((r) => r.move && r.board)
      .map((r, idx) => ({
        id: `${threadId}-move-${idx}`,
        player: r.move!.player,
        move: { row: r.move!.row, col: r.move!.col },
        boardState: r.board!,
        timestamp: new Date(r.created_at).getTime(),
        analysis: `${r.move!.player} plays at (${r.move!.row}, ${r.move!.col})`,
      }));

    if (moves.length > 0) {
      const lastRecord = threadRecords[threadRecords.length - 1];
      const players = extractPlayers(threadRecords);

      games.push({
        id: threadId,
        name: `Game ${gameIndex + 1}: ${players.join(" vs ")}`,
        players,
        moves,
        currentMoveIndex: 0,
        status: lastRecord.game_status === "ongoing" ? "waiting" : "finished",
        winner: lastRecord.winner,
        gameType: "tic-tac-toe",
      });

      gameIndex++;
    }
  });

  return games;
}

// Extract player names from game records
function extractPlayers(records: GameRecord[]): string[] {
  // Look for player initialization
  for (const record of records) {
    if (record.metadata?.writes?.initialize) {
      const init = record.metadata.writes.initialize;
      if (init.player_X && init.player_O) {
        return [init.player_X, init.player_O];
      }
    }
  }

  // Default to model names based on game patterns
  const gamePatterns = [
    ["GPT-4", "Claude-3.5"],
    ["Gemini", "DeepSeek"],
    ["OpenAI o1", "Llama-3"],
    ["Claude-3.5", "GPT-4"],
    ["DeepSeek", "Gemini"],
  ];

  return gamePatterns[Math.floor(Math.random() * gamePatterns.length)];
}

export function LiveGameStream({ csvData, className }: LiveGameStreamProps) {
  const [games, setGames] = useState<GameState[]>([]);
  const [selectedGameIndex, setSelectedGameIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1500);
  const [liveMatchCount, setLiveMatchCount] = useState(3);

  // Initialize games from CSV data or use demo data
  useEffect(() => {
    if (csvData && csvData.length > 0) {
      const parsedGames = createGamesFromRecords(csvData);
      setGames(parsedGames);
    } else {
      // Use demo games if no CSV data
      setGames(createDemoGames());
    }
  }, [csvData]);

  // Auto-cycle through games
  useEffect(() => {
    if (!isAutoPlaying || games.length <= 1) return;

    const interval = setInterval(() => {
      setSelectedGameIndex((prev) => (prev + 1) % games.length);
    }, 15000); // Switch games every 15 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, games.length]);

  const currentGame = games[selectedGameIndex];

  const handleGameSelect = (index: number) => {
    setSelectedGameIndex(index);
    setIsAutoPlaying(false);
  };

  const handlePreviousGame = () => {
    setSelectedGameIndex((prev) => (prev === 0 ? games.length - 1 : prev - 1));
    setIsAutoPlaying(false);
  };

  const handleNextGame = () => {
    setSelectedGameIndex((prev) => (prev + 1) % games.length);
    setIsAutoPlaying(false);
  };

  if (games.length === 0) {
    return (
      <Card className={cn("p-8 text-center", className)}>
        <CardContent>
          <Activity className="w-12 h-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
          <p className="text-muted-foreground">Loading game streams...</p>
        </CardContent>
      </Card>
    );
  }

  // Simulate live matches
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMatchCount((prev) => Math.floor(Math.random() * 5) + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("space-y-8", className)}>
      {/* Header Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="h-full bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="pt-8 pb-8 text-center">
              <Activity className="w-8 h-8 mx-auto mb-3 text-primary" />
              <div className="text-4xl font-bold text-primary mb-1">{games.length}</div>
              <div className="text-sm font-medium text-muted-foreground">Total Games</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="h-full bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="relative">
                <Zap className="w-8 h-8 mx-auto mb-3 text-destructive" />
                <div className="absolute top-0 right-1/2 translate-x-1/2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </div>
              </div>
              <div className="text-4xl font-bold text-destructive mb-1">
                {liveMatchCount}
              </div>
              <div className="text-sm font-medium text-muted-foreground">Live Matches</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="h-full bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
            <CardContent className="pt-8 pb-8 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-3 text-secondary" />
              <div className="text-4xl font-bold text-secondary mb-1">
                {games.filter((g) => g.status === "finished").length}
              </div>
              <div className="text-sm font-medium text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="h-full bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
            <CardContent className="pt-8 pb-8 text-center">
              <Brain className="w-8 h-8 mx-auto mb-3 text-accent" />
              <div className="text-4xl font-bold text-accent mb-1">
                {games.reduce((sum, g) => sum + g.moves.length, 0)}
              </div>
              <div className="text-sm font-medium text-muted-foreground">Total Moves</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Game List */}
        <Card className="lg:col-span-4 shadow-xl border-2 border-border/50">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center justify-between text-2xl">
              <span className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-primary" />
                Live Matches
              </span>
              <Badge 
                variant={isAutoPlaying ? "destructive" : "secondary"}
                className="text-sm px-3 py-1"
              >
                {isAutoPlaying ? "AUTO" : "MANUAL"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-3">
                {games.map((game, index) => (
                  <motion.button
                    key={game.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleGameSelect(index)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border-2 transition-all duration-300",
                      selectedGameIndex === index
                        ? "border-primary bg-gradient-to-r from-primary/10 to-primary/5 shadow-lg scale-[1.02]"
                        : "border-border hover:border-primary/50 hover:bg-muted/30 hover:shadow-md",
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-base">{game.name}</span>
                      <Badge
                        variant={
                          game.status === "finished"
                            ? "secondary"
                            : game.status === "playing"
                              ? "destructive"
                              : "default"
                        }
                        className="text-xs px-2 py-0.5"
                      >
                        {game.status === "playing" && (
                          <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1" />
                        )}
                        {game.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        <span className="font-medium">{game.moves.length} moves</span>
                      </div>
                      {game.winner && (
                        <>
                          <span className="text-border">•</span>
                          <div className="flex items-center gap-1">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            <span className="font-bold">{game.winner}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </ScrollArea>

            {/* Playback Controls */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="default"
                  onClick={handlePreviousGame}
                  className="w-12 h-12"
                >
                  <SkipBack className="w-5 h-5" />
                </Button>
                <Button
                  variant={isAutoPlaying ? "destructive" : "default"}
                  size="default"
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="w-12 h-12"
                >
                  {isAutoPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="default" 
                  onClick={handleNextGame}
                  className="w-12 h-12"
                >
                  <SkipForward className="w-5 h-5" />
                </Button>
              </div>

              <div className="px-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">
                    Speed
                  </label>
                  <span className="text-sm font-bold text-primary">
                    {playbackSpeed / 1000}s
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="3000"
                  step="250"
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                  className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${((playbackSpeed - 500) / 2500) * 100}%, hsl(var(--secondary)) ${((playbackSpeed - 500) / 2500) * 100}%, hsl(var(--secondary)) 100%)`
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Canvas */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {currentGame && (
              <motion.div
                key={currentGame.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <div className="h-full flex flex-col">
                  <GameCanvas
                    game={currentGame}
                    autoPlay={true}
                    playbackSpeed={playbackSpeed}
                    showControls={true}
                    showAnalysis={true}
                    onGameStateChange={(status) => {
                      if (status === "finished" && isAutoPlaying) {
                        setTimeout(() => {
                          handleNextGame();
                        }, 3000);
                      }
                    }}
                    className="flex-1"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Create demo games if no CSV data provided
function createDemoGames(): GameState[] {
  const demoGames: GameState[] = [
    {
      id: "demo-1",
      name: "Game 1: GPT-4 vs Claude-3.5",
      players: ["GPT-4", "Claude-3.5"],
      moves: [
        {
          id: "d1-m1",
          player: "X",
          move: { row: 0, col: 0 },
          boardState: [
            ["X", null, null],
            [null, null, null],
            [null, null, null],
          ],
          timestamp: Date.now() - 7000,
          analysis: "GPT-4 opens with corner strategy",
        },
        {
          id: "d1-m2",
          player: "O",
          move: { row: 1, col: 1 },
          boardState: [
            ["X", null, null],
            [null, "O", null],
            [null, null, null],
          ],
          timestamp: Date.now() - 6000,
          analysis: "Claude-3.5 takes center control",
        },
        {
          id: "d1-m3",
          player: "X",
          move: { row: 0, col: 2 },
          boardState: [
            ["X", null, "X"],
            [null, "O", null],
            [null, null, null],
          ],
          timestamp: Date.now() - 5000,
          analysis: "GPT-4 threatens top row",
        },
        {
          id: "d1-m4",
          player: "O",
          move: { row: 0, col: 1 },
          boardState: [
            ["X", "O", "X"],
            [null, "O", null],
            [null, null, null],
          ],
          timestamp: Date.now() - 4000,
          analysis: "Claude-3.5 blocks the threat",
        },
        {
          id: "d1-m5",
          player: "X",
          move: { row: 2, col: 0 },
          boardState: [
            ["X", "O", "X"],
            [null, "O", null],
            ["X", null, null],
          ],
          timestamp: Date.now() - 3000,
          analysis: "GPT-4 creates diagonal opportunity",
        },
        {
          id: "d1-m6",
          player: "O",
          move: { row: 2, col: 1 },
          boardState: [
            ["X", "O", "X"],
            [null, "O", null],
            ["X", "O", null],
          ],
          timestamp: Date.now() - 2000,
          analysis: "Claude-3.5 wins with middle column!",
        },
      ],
      currentMoveIndex: 0,
      status: "finished",
      winner: "O",
      gameType: "tic-tac-toe",
    },
    {
      id: "demo-2",
      name: "Game 2: Gemini vs DeepSeek",
      players: ["Gemini", "DeepSeek"],
      moves: [
        {
          id: "d2-m1",
          player: "X",
          move: { row: 1, col: 1 },
          boardState: [
            [null, null, null],
            [null, "X", null],
            [null, null, null],
          ],
          timestamp: Date.now() - 5000,
          analysis: "Gemini starts with center",
        },
        {
          id: "d2-m2",
          player: "O",
          move: { row: 0, col: 0 },
          boardState: [
            ["O", null, null],
            [null, "X", null],
            [null, null, null],
          ],
          timestamp: Date.now() - 4000,
          analysis: "DeepSeek takes corner",
        },
        {
          id: "d2-m3",
          player: "X",
          move: { row: 2, col: 2 },
          boardState: [
            ["O", null, null],
            [null, "X", null],
            [null, null, "X"],
          ],
          timestamp: Date.now() - 3000,
          analysis: "Gemini creates diagonal threat",
        },
      ],
      currentMoveIndex: 0,
      status: "playing",
      gameType: "tic-tac-toe",
    },
    {
      id: "demo-3",
      name: "Game 3: OpenAI o1 vs Llama-3",
      players: ["OpenAI o1", "Llama-3"],
      moves: [
        {
          id: "d3-m1",
          player: "X",
          move: { row: 0, col: 1 },
          boardState: [
            [null, "X", null],
            [null, null, null],
            [null, null, null],
          ],
          timestamp: Date.now() - 4000,
          analysis: "o1 opens with edge play",
        },
        {
          id: "d3-m2",
          player: "O",
          move: { row: 1, col: 1 },
          boardState: [
            [null, "X", null],
            [null, "O", null],
            [null, null, null],
          ],
          timestamp: Date.now() - 3000,
          analysis: "Llama-3 secures center",
        },
      ],
      currentMoveIndex: 0,
      status: "waiting",
      gameType: "tic-tac-toe",
    },
  ];

  return demoGames;
}
