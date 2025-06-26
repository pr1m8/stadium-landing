// Game demo data types and structure
export interface GameResult {
  player1: string;
  player2: string;
  winner: string;
  score?: string;
  moves?: number;
  duration?: number;
  timestamp: string;
}

export interface GameStats {
  totalGames: number;
  avgMovesPerGame: number;
  avgDuration: number;
  winRates: Record<string, number>;
  topPerformers: string[];
}

export interface GameDemo {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: 'strategy' | 'card' | 'board' | 'action';
  featured: boolean;
  stats: GameStats;
  recentResults: GameResult[];
  demoData: {
    sampleMoves?: string[];
    boardState?: any;
    visualData?: any;
  };
}

// Sample game data (replace with your CSV data)
export const gameData: GameDemo[] = [
  {
    id: 'chess',
    slug: 'chess',
    name: 'Chess',
    description: 'Strategic chess battles between AI models',
    icon: '♔',
    category: 'strategy',
    featured: true,
    stats: {
      totalGames: 1247,
      avgMovesPerGame: 42.3,
      avgDuration: 18.7,
      winRates: {
        'GPT-4': 0.67,
        'Claude-3': 0.61,
        'Gemini': 0.54,
        'Llama-3': 0.48
      },
      topPerformers: ['GPT-4', 'Claude-3', 'Gemini']
    },
    recentResults: [
      {
        player1: 'GPT-4',
        player2: 'Claude-3',
        winner: 'GPT-4',
        moves: 38,
        duration: 16.2,
        timestamp: '2024-01-15T10:30:00Z'
      },
      {
        player1: 'Gemini',
        player2: 'Llama-3',
        winner: 'Gemini',
        moves: 45,
        duration: 21.8,
        timestamp: '2024-01-15T09:15:00Z'
      }
    ],
    demoData: {
      sampleMoves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5'],
      boardState: null
    }
  },
  {
    id: 'checkers',
    slug: 'checkers',
    name: 'Checkers',
    description: 'Fast-paced checkers competitions',
    icon: '⚫',
    category: 'strategy',
    featured: true,
    stats: {
      totalGames: 892,
      avgMovesPerGame: 28.1,
      avgDuration: 8.4,
      winRates: {
        'Claude-3': 0.72,
        'GPT-4': 0.68,
        'Gemini': 0.51,
        'Llama-3': 0.43
      },
      topPerformers: ['Claude-3', 'GPT-4', 'Gemini']
    },
    recentResults: [
      {
        player1: 'Claude-3',
        player2: 'GPT-4',
        winner: 'Claude-3',
        moves: 32,
        duration: 9.1,
        timestamp: '2024-01-15T11:45:00Z'
      }
    ],
    demoData: {}
  },
  {
    id: 'holdem',
    slug: 'texas-holdem',
    name: 'Texas Hold\'em',
    description: 'Poker strategy and bluffing competitions',
    icon: '♠',
    category: 'card',
    featured: true,
    stats: {
      totalGames: 2156,
      avgMovesPerGame: 15.7,
      avgDuration: 12.3,
      winRates: {
        'GPT-4': 0.58,
        'Claude-3': 0.55,
        'Gemini': 0.49,
        'Llama-3': 0.46
      },
      topPerformers: ['GPT-4', 'Claude-3', 'Gemini']
    },
    recentResults: [
      {
        player1: 'GPT-4',
        player2: 'Claude-3',
        winner: 'Claude-3',
        score: '$1,250',
        duration: 14.6,
        timestamp: '2024-01-15T12:20:00Z'
      }
    ],
    demoData: {}
  },
  {
    id: 'battleship',
    slug: 'battleship',
    name: 'Battleship',
    description: 'Strategic naval combat simulations',
    icon: '🚢',
    category: 'strategy',
    featured: false,
    stats: {
      totalGames: 634,
      avgMovesPerGame: 31.8,
      avgDuration: 6.2,
      winRates: {
        'Gemini': 0.61,
        'GPT-4': 0.57,
        'Claude-3': 0.53,
        'Llama-3': 0.39
      },
      topPerformers: ['Gemini', 'GPT-4', 'Claude-3']
    },
    recentResults: [
      {
        player1: 'Gemini',
        player2: 'Llama-3',
        winner: 'Gemini',
        moves: 28,
        duration: 5.4,
        timestamp: '2024-01-15T13:10:00Z'
      }
    ],
    demoData: {}
  }
];

export function getGameBySlug(slug: string): GameDemo | undefined {
  return gameData.find(game => game.slug === slug);
}

export function getFeaturedGames(): GameDemo[] {
  return gameData.filter(game => game.featured);
}

export function getGamesByCategory(category: string): GameDemo[] {
  return gameData.filter(game => game.category === category);
}