"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Volume2,
  VolumeX,
  Trophy,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface GameMove {
  id: string;
  player: string;
  move: any;
  boardState: any;
  timestamp: number;
  analysis?: string;
}

export interface GameState {
  id: string;
  name: string;
  players: string[];
  moves: GameMove[];
  currentMoveIndex: number;
  status: "waiting" | "playing" | "paused" | "finished";
  winner?: string;
  boardSize?: { width: number; height: number };
  gameType: "tic-tac-toe" | "chess" | "checkers" | "custom";
}

interface GameCanvasProps {
  game: GameState;
  onMoveChange?: (moveIndex: number) => void;
  onGameStateChange?: (status: GameState["status"]) => void;
  autoPlay?: boolean;
  playbackSpeed?: number;
  showControls?: boolean;
  showAnalysis?: boolean;
  className?: string;
}

export function GameCanvas({
  game,
  onMoveChange,
  onGameStateChange,
  autoPlay = false,
  playbackSpeed = 1000,
  showControls = true,
  showAnalysis = true,
  className,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentMove, setCurrentMove] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  const drawTicTacToeBoard = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      board: any[][],
      canvasWidth: number,
      canvasHeight: number,
    ) => {
      const cellSize = Math.min(canvasWidth, canvasHeight) / 3.5;
      const offsetX = (canvasWidth - cellSize * 3) / 2;
      const offsetY = (canvasHeight - cellSize * 3) / 2;

      // Clear canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Set styles
      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 4;
      ctx.font = `bold ${cellSize * 0.7}px Inter, system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Draw grid
      for (let i = 1; i < 3; i++) {
        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(offsetX + i * cellSize, offsetY);
        ctx.lineTo(offsetX + i * cellSize, offsetY + cellSize * 3);
        ctx.stroke();

        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY + i * cellSize);
        ctx.lineTo(offsetX + cellSize * 3, offsetY + i * cellSize);
        ctx.stroke();
      }

      // Draw X's and O's
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const cell = board[row]?.[col];
          if (cell) {
            const x = offsetX + col * cellSize + cellSize / 2;
            const y = offsetY + row * cellSize + cellSize / 2;

            if (cell === "X") {
              ctx.strokeStyle = "#3b82f6";
              ctx.lineWidth = cellSize * 0.1;
              ctx.lineCap = "round";
              const padding = cellSize * 0.25;
              ctx.beginPath();
              ctx.moveTo(x - cellSize / 2 + padding, y - cellSize / 2 + padding);
              ctx.lineTo(x + cellSize / 2 - padding, y + cellSize / 2 - padding);
              ctx.moveTo(x + cellSize / 2 - padding, y - cellSize / 2 + padding);
              ctx.lineTo(x - cellSize / 2 + padding, y + cellSize / 2 - padding);
              ctx.stroke();
            } else {
              ctx.strokeStyle = "#ef4444";
              ctx.lineWidth = cellSize * 0.1;
              ctx.beginPath();
              ctx.arc(x, y, cellSize * 0.35, 0, 2 * Math.PI);
              ctx.stroke();
            }
          }
        }
      }
    },
    [],
  );

  const drawCustomBoard = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      boardState: any,
      canvasWidth: number,
      canvasHeight: number,
    ) => {
      // Clear canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Default visualization for unknown game types
      ctx.fillStyle = "#1f2937";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.fillStyle = "#f9fafb";
      ctx.font = "24px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `${game.gameType.toUpperCase()} Game`,
        canvasWidth / 2,
        canvasHeight / 2 - 20,
      );

      ctx.font = "16px Arial";
      ctx.fillText(
        `Move ${currentMove + 1} of ${game.moves.length}`,
        canvasWidth / 2,
        canvasHeight / 2 + 20,
      );
    },
    [game.gameType, currentMove, game.moves.length],
  );

  const renderBoard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const move = game.moves[currentMove];
    const boardState = move?.boardState;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    switch (game.gameType) {
      case "tic-tac-toe":
        drawTicTacToeBoard(
          ctx,
          boardState || [[], [], []],
          canvasWidth,
          canvasHeight,
        );
        break;
      default:
        drawCustomBoard(ctx, boardState, canvasWidth, canvasHeight);
        break;
    }
  }, [
    currentMove,
    game.moves,
    game.gameType,
    drawTicTacToeBoard,
    drawCustomBoard,
  ]);

  useEffect(() => {
    renderBoard();
  }, [renderBoard]);

  useEffect(() => {
    if (isPlaying && currentMove < game.moves.length - 1) {
      intervalRef.current = setInterval(() => {
        setCurrentMove((prev) => {
          const nextMove = prev + 1;
          if (nextMove >= game.moves.length - 1) {
            setIsPlaying(false);
            onGameStateChange?.("finished");
          }
          onMoveChange?.(nextMove);
          return nextMove;
        });
      }, playbackSpeed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [
    isPlaying,
    currentMove,
    game.moves.length,
    playbackSpeed,
    onMoveChange,
    onGameStateChange,
  ]);

  const handlePlayPause = () => {
    if (currentMove >= game.moves.length - 1) {
      setCurrentMove(0);
    }
    setIsPlaying(!isPlaying);
    onGameStateChange?.(isPlaying ? "paused" : "playing");
  };

  const handleReset = () => {
    setCurrentMove(0);
    setIsPlaying(false);
    onMoveChange?.(0);
    onGameStateChange?.("waiting");
  };

  const handleNext = () => {
    if (currentMove < game.moves.length - 1) {
      const nextMove = currentMove + 1;
      setCurrentMove(nextMove);
      onMoveChange?.(nextMove);
    }
  };

  const currentMoveData = game.moves[currentMove];

  return (
    <div className={cn("h-full flex flex-col", className)}>
      <Card className="h-full flex flex-col shadow-xl border-2 border-border/50">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">{game.name}</CardTitle>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-sm px-3 py-1">
                {game.gameType.toUpperCase()}
              </Badge>
              <Badge
                variant={
                  game.status === "playing"
                    ? "destructive"
                    : game.status === "finished"
                      ? "secondary"
                      : "default"
                }
                className="text-sm px-3 py-1"
              >
                {game.status === "playing" && (
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1" />
                )}
                {game.status.toUpperCase()}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-6 text-base text-muted-foreground mt-2">
            <span className="font-medium">{game.players.join(" vs ")}</span>
            {game.winner && (
              <>
                <span className="text-border">•</span>
                <span className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="font-bold">Winner: {game.winner}</span>
                </span>
              </>
            )}
            <span className="ml-auto font-medium">
              Move {currentMove + 1} / {game.moves.length}
            </span>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col space-y-6 pb-6">
          {/* Canvas Container */}
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="relative w-full max-w-[500px] aspect-square">
              <canvas
                ref={canvasRef}
                width={500}
                height={500}
                className="w-full h-full border-2 border-border rounded-xl bg-gradient-to-br from-background to-muted/20 shadow-inner"
              />
            </div>
          </div>

            {/* Controls */}
            {showControls && (
              <div className="flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="default"
                  onClick={handleReset}
                  disabled={currentMove === 0 && !isPlaying}
                  className="w-12 h-12"
                >
                  <RotateCcw className="w-5 h-5" />
                </Button>
                <Button
                  variant={isPlaying ? "destructive" : "default"}
                  size="default"
                  onClick={handlePlayPause}
                  disabled={game.moves.length === 0}
                  className="w-14 h-14"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  onClick={handleNext}
                  disabled={currentMove >= game.moves.length - 1}
                  className="w-12 h-12"
                >
                  <SkipForward className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-12 h-12"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </Button>
              </div>
            )}

            {/* Progress bar */}
            <div className="space-y-3">
              <div className="relative w-full bg-secondary/20 rounded-full h-3 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-destructive rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: `${((currentMove + 1) / game.moves.length) * 100}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground font-medium">
                <span>Move {currentMove + 1}</span>
                <span>{Math.round(((currentMove + 1) / game.moves.length) * 100)}%</span>
                <span>Total: {game.moves.length}</span>
              </div>
            </div>

            {/* Current move analysis */}
            {showAnalysis && currentMoveData && (
              <Card className="bg-gradient-to-r from-muted/30 to-muted/10 border-2 border-border/50">
                <CardContent className="pt-6 pb-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg flex items-center gap-2">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center font-bold",
                          currentMoveData.player === "X" ? "bg-blue-500 text-white" : "bg-red-500 text-white"
                        )}>
                          {currentMoveData.player}
                        </div>
                        Player {currentMoveData.player}'s Move
                      </span>
                      <Badge variant="outline" className="text-sm px-3 py-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(
                          currentMoveData.timestamp,
                        ).toLocaleTimeString()}
                      </Badge>
                    </div>
                    {currentMoveData.analysis && (
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {currentMoveData.analysis}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
