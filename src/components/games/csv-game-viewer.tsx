"use client";

import React, { useState, useEffect } from "react";
import { LiveGameStream } from "./live-game-stream";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileUp, Database, RefreshCw, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface CSVGameViewerProps {
  csvPath?: string;
  className?: string;
}

export function CSVGameViewer({
  csvPath = "/data-1750973948504.csv",
  className,
}: CSVGameViewerProps) {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalRecords: 0,
    uniqueGames: 0,
    timeRange: { start: "", end: "" },
  });

  const loadCSVData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // For demo purposes, we'll use the parsed data structure
      // In production, you'd fetch and parse the actual CSV file
      const demoData = generateDemoCSVData();

      setCsvData(demoData);

      // Calculate stats
      const uniqueThreads = new Set(demoData.map((d) => d.thread_id));
      const timestamps = demoData.map((d) => new Date(d.created_at).getTime());

      setStats({
        totalRecords: demoData.length,
        uniqueGames: uniqueThreads.size,
        timeRange: {
          start: new Date(Math.min(...timestamps)).toLocaleString(),
          end: new Date(Math.max(...timestamps)).toLocaleString(),
        },
      });
    } catch (err) {
      setError("Failed to load CSV data");
      console.error("Error loading CSV:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCSVData();
  }, [csvPath]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split("\n");
        const headers = lines[0]
          .split(",")
          .map((h) => h.replace(/"/g, "").trim());

        const data = lines
          .slice(1)
          .filter((line) => line.trim())
          .map((line) => {
            const values = line.match(/(".*?"|[^,]+)/g) || [];
            const record: any = {};
            headers.forEach((header, index) => {
              let value = values[index] || "";
              // Remove quotes and parse JSON if needed
              value = value.replace(/^"|"$/g, "");
              if (header === "checkpoint" || header === "metadata") {
                try {
                  record[header] = JSON.parse(value);
                } catch {
                  record[header] = value;
                }
              } else {
                record[header] = value;
              }
            });
            return record;
          });

        setCsvData(data);

        // Update stats
        const uniqueThreads = new Set(data.map((d) => d.thread_id));
        const timestamps = data.map((d) => new Date(d.created_at).getTime());

        setStats({
          totalRecords: data.length,
          uniqueGames: uniqueThreads.size,
          timeRange: {
            start: new Date(Math.min(...timestamps)).toLocaleString(),
            end: new Date(Math.max(...timestamps)).toLocaleString(),
          },
        });
      } catch (err) {
        setError("Failed to parse CSV file");
        console.error("Error parsing CSV:", err);
      }
    };

    reader.readAsText(file);
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="p-8 text-center">
          <RefreshCw className="w-8 h-8 mx-auto mb-4 animate-spin text-primary" />
          <p>Loading game data...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-8 h-8 mx-auto mb-4 text-destructive" />
          <p className="text-destructive">{error}</p>
          <Button onClick={loadCSVData} className="mt-4">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("h-full flex flex-col", className)}>
      {/* Header Controls */}
      <Card className="mb-8 shadow-xl border-2 border-border/50 bg-gradient-to-br from-background to-muted/20">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center justify-between text-2xl">
            <span className="flex items-center gap-3">
              <Database className="w-6 h-6 text-primary" />
              Live Match Data
            </span>
            <Badge 
              variant={csvData.length > 0 ? "default" : "secondary"}
              className="text-sm px-3 py-1"
            >
              {csvData.length > 0 ? "STREAMING" : "DEMO MODE"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
              >
                <RefreshCw className="w-6 h-6 mx-auto mb-2 text-primary animate-spin" />
                <div className="text-3xl font-bold text-primary">{stats.totalRecords}</div>
                <div className="text-sm font-medium text-muted-foreground">
                  Total Records
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20"
              >
                <div className="text-3xl font-bold text-secondary">{stats.uniqueGames}</div>
                <div className="text-sm font-medium text-muted-foreground">
                  Active Games
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20"
              >
                <div className="text-xl font-bold text-accent mb-1">Live Updates</div>
                <div className="text-sm text-muted-foreground">
                  {stats.timeRange.start && (
                    <>
                      {new Date(stats.timeRange.start).toLocaleTimeString()}
                      {" → "}
                      {new Date(stats.timeRange.end).toLocaleTimeString()}
                    </>
                  )}
                </div>
              </motion.div>
            </div>

            {/* File Upload */}
            <div className="flex items-center gap-4 mt-6">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload">
                <Button variant="outline" size="lg" asChild>
                  <span className="flex items-center gap-2 cursor-pointer">
                    <FileUp className="w-5 h-5" />
                    Upload Match Data
                  </span>
                </Button>
              </label>
              <Button
                variant="default"
                size="lg"
                onClick={loadCSVData}
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Refresh Stream
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Game Stream */}
      <div className="flex-1">
        <LiveGameStream csvData={csvData} className="h-full" />
      </div>
    </div>
  );
}

// Generate demo CSV data that matches the structure
function generateDemoCSVData() {
  const games = [
    {
      thread_id: "90cc5538-ff54-45dc-a86d-608447588a27",
      players: ["GPT-4", "Claude-3.5"],
    },
    {
      thread_id: "4e273219-22c5-4965-826f-1b857de839ba",
      players: ["Gemini", "DeepSeek"],
    },
    {
      thread_id: "7a8b9c0d-1e2f-3g4h-5i6j-7k8l9m0n1o2p",
      players: ["OpenAI o1", "Llama-3"],
    },
    {
      thread_id: "8b9c0d1e-2f3g-4h5i-6j7k-8l9m0n1o2p3q",
      players: ["Claude-3.5", "DeepSeek"],
    },
    {
      thread_id: "9c0d1e2f-3g4h-5i6j-7k8l-9m0n1o2p3q4r",
      players: ["GPT-4", "Gemini"],
    },
  ];

  const data: any[] = [];

  games.forEach((game, gameIndex) => {
    const baseTime = Date.now() - gameIndex * 3600000; // Space games 1 hour apart

    // Initialize game
    data.push({
      thread_id: game.thread_id,
      checkpoint_ns: "",
      checkpoint_id: `checkpoint-${gameIndex}-0`,
      parent_checkpoint_id: null,
      type: null,
      checkpoint: JSON.stringify({
        v: 3,
        id: `checkpoint-${gameIndex}-0`,
        ts: new Date(baseTime).toISOString(),
      }),
      metadata: JSON.stringify({
        step: 0,
        writes: {
          initialize: {
            turn: "X",
            board: [
              [null, null, null],
              [null, null, null],
              [null, null, null],
            ],
            winner: null,
            player_X: game.players[0],
            player_O: game.players[1],
            game_status: "ongoing",
          },
        },
      }),
      created_at: new Date(baseTime).toISOString(),
    });

    // Add some moves
    const moves = [
      {
        row: 0,
        col: 0,
        player: "X",
        board: [
          ["X", null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      {
        row: 1,
        col: 1,
        player: "O",
        board: [
          ["X", null, null],
          [null, "O", null],
          [null, null, null],
        ],
      },
      {
        row: 0,
        col: 2,
        player: "X",
        board: [
          ["X", null, "X"],
          [null, "O", null],
          [null, null, null],
        ],
      },
      {
        row: 0,
        col: 1,
        player: "O",
        board: [
          ["X", "O", "X"],
          [null, "O", null],
          [null, null, null],
        ],
      },
      {
        row: 2,
        col: 0,
        player: "X",
        board: [
          ["X", "O", "X"],
          [null, "O", null],
          ["X", null, null],
        ],
      },
    ];

    moves.forEach((move, moveIndex) => {
      data.push({
        thread_id: game.thread_id,
        checkpoint_ns: "",
        checkpoint_id: `checkpoint-${gameIndex}-${moveIndex + 1}`,
        parent_checkpoint_id: `checkpoint-${gameIndex}-${moveIndex}`,
        type: null,
        checkpoint: JSON.stringify({
          v: 3,
          id: `checkpoint-${gameIndex}-${moveIndex + 1}`,
          ts: new Date(baseTime + (moveIndex + 1) * 2000).toISOString(),
        }),
        metadata: JSON.stringify({
          step: moveIndex + 1,
          writes: {
            make_move: {
              turn: moveIndex % 2 === 0 ? "O" : "X",
              board: move.board,
              winner: null,
              game_status: "ongoing",
              move_history: [
                {
                  kwargs: {
                    row: move.row,
                    col: move.col,
                    player: move.player,
                  },
                },
              ],
            },
          },
        }),
        created_at: new Date(baseTime + (moveIndex + 1) * 2000).toISOString(),
      });
    });
  });

  return data;
}
