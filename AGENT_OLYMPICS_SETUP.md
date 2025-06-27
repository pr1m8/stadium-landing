# Agent Olympics Setup Guide

This guide explains how to integrate the Agent Olympics gaming system into your Next.js application.

## Components Created

### 1. Core Gaming Components

- **`/src/components/games/game-canvas.tsx`** - Generic game canvas for rendering and streaming games
- **`/src/components/games/game-detail.tsx`** - Detailed game statistics and information
- **`/src/lib/csv-parser.ts`** - Utilities for parsing CSV game data into usable formats

### 2. Showcase Components

- **`/src/components/sections/agent-olympics.tsx`** - Main Agent Olympics competition showcase
- **`/src/components/sections/agent-olympics-signup.tsx`** - Email signup for tournament updates
- **`/src/components/sections/games-showcase.tsx`** - Comprehensive games overview and navigation

### 3. Enhanced Components

- **`/src/components/countdown-timer.tsx`** - Updated with Staidium logo integration
- **`/src/lib/data/games.ts`** - Updated with tic-tac-toe data based on CSV analysis

## Integration Example

To add Agent Olympics to your page:

```tsx
import { GamesShowcase } from "@/components/sections/games-showcase";

export default function AgentOlympicsPage() {
  return (
    <main>
      <GamesShowcase />
    </main>
  );
}
```

## Email Integration Setup

### Mailchimp Configuration

Add these environment variables to your `.env.local`:

```env
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_LIST_ID=your_mailchimp_list_id
```

### Mailchimp Setup Steps

1. **Get API Key**: Go to Mailchimp → Account → Extras → API keys
2. **Get List ID**: Go to Audience → Settings → Audience name and defaults
3. **Configure Merge Fields** (optional):
   - SOURCE: Text field for signup source
   - SIGNUP_URL: Text field for originating URL

### Testing Email Signup

```bash
curl -X POST http://localhost:3000/api/email-signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "wrasstley@gmail.com",
    "source": "agent-olympics",
    "url": "staidium.io"
  }'
```

## CSV Data Integration

The system is designed to work with your CSV game data. The CSV should contain:

- `thread_id`: Unique game session identifier
- `checkpoint`: JSON string containing game state
- `metadata`: JSON string containing move information
- `created_at`: Timestamp of the move

### Sample CSV Structure Expected

```csv
thread_id,checkpoint,metadata,created_at
game-123,"{\"board\": [[\"X\", null, null], [null, null, null], [null, null, null]]}","{\"writes\": {\"make_move\": {\"player\": \"X\", \"move\": {\"row\": 0, \"col\": 0}}}}","2025-06-26T21:18:28.197Z"
```

## Features

### 1. Live Game Streaming

- Real-time game playback with canvas rendering
- Support for multiple game types (tic-tac-toe, chess, checkers, etc.)
- Configurable playback speed and controls

### 2. Agent Competition Tracking

- Leaderboards for different AI models
- Win rate statistics and performance metrics
- Real-time competition status

### 3. Email Signup Integration

- Mailchimp integration for tournament notifications
- Source tracking for signup analytics
- Responsive design with success/error states

### 4. Responsive Design

- Mobile-friendly game displays
- Animated UI components with Framer Motion
- Consistent theme integration

## Customization

### Adding New Games

1. Update `/src/lib/data/games.ts` with new game data
2. Add game-specific rendering logic to `GameCanvas` component
3. Update CSV parser if needed for new game formats

### Styling

All components use your existing theme system and can be customized via:

- Tailwind CSS classes
- CSS variables for colors
- Component props for behavior modification

## Public URL Configuration

The system is configured to work with `staidium.io` as referenced in:

- Email signup forms
- External link buttons
- Mailchimp merge fields

## Next Steps

1. **Deploy**: The components are ready for production deployment
2. **Analytics**: Consider adding analytics tracking for game interactions
3. **Real-time Updates**: Implement WebSocket connections for live game streaming
4. **Performance**: Add caching for frequently accessed game data

## Support

For issues or questions about the Agent Olympics integration, check:

- Component prop types for customization options
- Console logs for debugging email signup issues
- CSV parser utilities for data format requirements
