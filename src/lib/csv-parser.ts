import { GameMove, GameState } from "@/components/games/game-canvas";

export interface CSVGameRecord {
  thread_id: string;
  checkpoint_ns: string;
  checkpoint_id: string;
  parent_checkpoint_id: string | null;
  type: string | null;
  checkpoint: string;
  metadata: string;
  created_at: string;
}

export interface ParsedTicTacToeMove {
  player: "X" | "O";
  row: number;
  col: number;
  boardState: (string | null)[][];
  winner?: string;
  gameStatus: string;
}

export function parseCSVCheckpointData(checkpoint: string): any {
  try {
    return JSON.parse(checkpoint);
  } catch {
    return null;
  }
}

export function parseCSVMetadata(metadata: string): any {
  try {
    return JSON.parse(metadata);
  } catch {
    return null;
  }
}

export function extractTicTacToeGameFromCSV(
  records: CSVGameRecord[],
): GameState[] {
  const gamesByThread = new Map<string, CSVGameRecord[]>();

  // Group records by thread_id
  records.forEach((record) => {
    if (!gamesByThread.has(record.thread_id)) {
      gamesByThread.set(record.thread_id, []);
    }
    gamesByThread.get(record.thread_id)!.push(record);
  });

  const games: GameState[] = [];

  gamesByThread.forEach((threadRecords, threadId) => {
    // Sort by created_at to get chronological order
    threadRecords.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );

    const moves: GameMove[] = [];
    let gameStatus = "ongoing";
    let winner: string | undefined;
    let players = ["Player 1", "Player 2"];

    threadRecords.forEach((record, index) => {
      const metadata = parseCSVMetadata(record.metadata);
      if (!metadata || !metadata.writes) return;

      // Extract move data from the writes
      const writes = metadata.writes;
      if (writes.make_move) {
        const moveData = writes.make_move;
        const board = moveData.board;
        const turn = moveData.turn;
        const moveHistory = moveData.move_history;

        if (moveHistory && moveHistory.length > 0) {
          const lastMove = moveHistory[moveHistory.length - 1];
          if (lastMove.kwargs) {
            moves.push({
              id: `${threadId}-${index}`,
              player: lastMove.kwargs.player,
              move: {
                row: lastMove.kwargs.row,
                col: lastMove.kwargs.col,
              },
              boardState: board,
              timestamp: new Date(record.created_at).getTime(),
              analysis: `${lastMove.kwargs.player} plays at (${lastMove.kwargs.row}, ${lastMove.kwargs.col})`,
            });
          }
        }

        if (moveData.game_status) {
          gameStatus = moveData.game_status;
        }
        if (moveData.winner) {
          winner = moveData.winner;
        }

        // Try to extract player names
        if (writes.initialize) {
          const initData = writes.initialize;
          if (initData.player_X && initData.player_O) {
            players = [initData.player_X, initData.player_O];
          }
        }
      }
    });

    if (moves.length > 0) {
      games.push({
        id: threadId,
        name: `Tic-Tac-Toe Game ${games.length + 1}`,
        players,
        moves,
        currentMoveIndex: 0,
        status: gameStatus === "ongoing" ? "waiting" : "finished",
        winner,
        gameType: "tic-tac-toe",
      });
    }
  });

  return games;
}

// Create sample games from our existing CSV structure
export function createSampleGames(): GameState[] {
  // Sample tic-tac-toe games based on the CSV structure we saw
  return [
    {
      id: "sample-1",
      name: "GPT-4 vs Claude-3.5",
      players: ["GPT-4", "Claude-3.5"],
      moves: [
        {
          id: "move-1",
          player: "X",
          move: { row: 0, col: 0 },
          boardState: [
            ["X", null, null],
            [null, null, null],
            [null, null, null],
          ],
          timestamp: Date.now() - 8000,
          analysis: "GPT-4 opens with corner strategy",
        },
        {
          id: "move-2",
          player: "O",
          move: { row: 0, col: 1 },
          boardState: [
            ["X", "O", null],
            [null, null, null],
            [null, null, null],
          ],
          timestamp: Date.now() - 7000,
          analysis: "Claude-3.5 blocks adjacent corner",
        },
        {
          id: "move-3",
          player: "X",
          move: { row: 0, col: 2 },
          boardState: [
            ["X", "O", "X"],
            [null, null, null],
            [null, null, null],
          ],
          timestamp: Date.now() - 6000,
          analysis: "GPT-4 continues top row pressure",
        },
        {
          id: "move-4",
          player: "O",
          move: { row: 1, col: 1 },
          boardState: [
            ["X", "O", "X"],
            [null, "O", null],
            [null, null, null],
          ],
          timestamp: Date.now() - 5000,
          analysis: "Claude-3.5 takes center position",
        },
        {
          id: "move-5",
          player: "X",
          move: { row: 2, col: 0 },
          boardState: [
            ["X", "O", "X"],
            [null, "O", null],
            ["X", null, null],
          ],
          timestamp: Date.now() - 4000,
          analysis: "GPT-4 sets up diagonal threat",
        },
        {
          id: "move-6",
          player: "O",
          move: { row: 2, col: 2 },
          boardState: [
            ["X", "O", "X"],
            [null, "O", null],
            ["X", null, "O"],
          ],
          timestamp: Date.now() - 3000,
          analysis: "Claude-3.5 blocks diagonal",
        },
        {
          id: "move-7",
          player: "X",
          move: { row: 1, col: 0 },
          boardState: [
            ["X", "O", "X"],
            ["X", "O", null],
            ["X", null, "O"],
          ],
          timestamp: Date.now() - 2000,
          analysis: "GPT-4 wins with left column!",
        },
      ],
      currentMoveIndex: 0,
      status: "finished",
      winner: "X",
      gameType: "tic-tac-toe",
    },
    {
      id: "sample-2",
      name: "Gemini vs DeepSeek",
      players: ["Gemini", "DeepSeek"],
      moves: [
        {
          id: "move-1",
          player: "X",
          move: { row: 1, col: 1 },
          boardState: [
            [null, null, null],
            [null, "X", null],
            [null, null, null],
          ],
          timestamp: Date.now() - 6000,
          analysis: "Gemini starts with center control",
        },
        {
          id: "move-2",
          player: "O",
          move: { row: 0, col: 0 },
          boardState: [
            ["O", null, null],
            [null, "X", null],
            [null, null, null],
          ],
          timestamp: Date.now() - 5000,
          analysis: "DeepSeek takes corner position",
        },
        {
          id: "move-3",
          player: "X",
          move: { row: 2, col: 2 },
          boardState: [
            ["O", null, null],
            [null, "X", null],
            [null, null, "X"],
          ],
          timestamp: Date.now() - 4000,
          analysis: "Gemini creates diagonal threat",
        },
        {
          id: "move-4",
          player: "O",
          move: { row: 0, col: 2 },
          boardState: [
            ["O", null, "O"],
            [null, "X", null],
            [null, null, "X"],
          ],
          timestamp: Date.now() - 3000,
          analysis: "DeepSeek blocks and threatens",
        },
        {
          id: "move-5",
          player: "X",
          move: { row: 0, col: 1 },
          boardState: [
            ["O", "X", "O"],
            [null, "X", null],
            [null, null, "X"],
          ],
          timestamp: Date.now() - 2000,
          analysis: "Gemini blocks top row",
        },
      ],
      currentMoveIndex: 0,
      status: "finished",
      winner: "X",
      gameType: "tic-tac-toe",
    },
    {
      id: "sample-3",
      name: "OpenAI o1 vs Anthropic Claude",
      players: ["OpenAI o1", "Anthropic Claude"],
      moves: [
        {
          id: "move-1",
          player: "X",
          move: { row: 0, col: 1 },
          boardState: [
            [null, "X", null],
            [null, null, null],
            [null, null, null],
          ],
          timestamp: Date.now() - 5000,
          analysis: "o1 opens with edge strategy",
        },
        {
          id: "move-2",
          player: "O",
          move: { row: 1, col: 1 },
          boardState: [
            [null, "X", null],
            [null, "O", null],
            [null, null, null],
          ],
          timestamp: Date.now() - 4000,
          analysis: "Claude secures center",
        },
        {
          id: "move-3",
          player: "X",
          move: { row: 2, col: 1 },
          boardState: [
            [null, "X", null],
            [null, "O", null],
            [null, "X", null],
          ],
          timestamp: Date.now() - 3000,
          analysis: "o1 threatens middle column",
        },
        {
          id: "move-4",
          player: "O",
          move: { row: 1, col: 0 },
          boardState: [
            [null, "X", null],
            ["O", "O", null],
            [null, "X", null],
          ],
          timestamp: Date.now() - 2000,
          analysis: "Claude blocks column threat",
        },
      ],
      currentMoveIndex: 0,
      status: "playing",
      gameType: "tic-tac-toe",
    },
  ];
}
