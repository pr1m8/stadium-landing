# Staidium Landing Page Implementation Guide

## Overview

This document provides comprehensive instructions for building the Staidium landing page - a platform for AI agent architecture benchmarking, competitions, and pattern sharing. The site emphasizes performance comparisons, competitive benchmarking, and making agent architectures portable across frameworks.

## Brand Identity

- **Logo**: Use text logo from `public/assets/`
- **Font**: Satoshi-Variable.ttf (already in `src/assets/fonts/`)
- **Color Scheme**:
  ```css
  --primary: #0070f3 (electric blue) --secondary: #00ff88
    (neon green for success/benchmarks) --accent: #ff0080 (hot pink for CTAs)
    --warning: #ffaa00 (orange for competitions) --dark-bg: #000000
    --light-bg: #ffffff;
  ```

## Page Structure

### 1. Navigation Bar

**Component**: Modify existing nav component
**Location**: `src/components/nav/`

```tsx
// Use sticky header with blur background
<nav className="sticky top-0 z-50 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
  <Logo /> // Text logo
  <NavLinks>- Benchmarks - Patterns - Competitions - Docs - Pricing</NavLinks>
  <Actions>
    - Upload Pattern (button) - Sign In - Theme Switcher (use existing)
  </Actions>
</nav>
```

### 2. Hero Section

**Components**:

- `src/components/ui/hero-highlight.tsx`
- `src/components/ui/text-generate-effect.tsx`
- `src/components/ui/sparkles.tsx`

**Content**:

```
Headline: "Stop Rewriting. Start Benchmarking."
Subheadline: "The competitive platform for AI agent architectures. Write once, run anywhere, benchmark everything."

3 CTAs:
1. "Browse Leaderboards" (primary)
2. "Upload Your Agent" (secondary)
3. "Join Competition" (accent)

Live Stats Bar:
- 2,847 benchmarks run today
- 127 active competitions
- $50K in prizes
```

### 3. Live Benchmarking Demo

**Components**:

- `src/components/ui/terminal.tsx`
- `src/components/magicui/code-comparison.tsx`
- `src/components/ui/chart.tsx`

**Implementation**:

```tsx
// Split screen showing:
// Left: Terminal with live command
$ staidium benchmark supervisor-worker --frameworks all

// Right: Real-time chart updating with results
// Use Chart component with animated data
```

### 4. Competition Section

**Components**:

- `src/components/ui/card-spotlight.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/progress.tsx`
- `src/components/magicui/animated-list.tsx`

**Content**:

```
Title: "Active Competitions"

Card Layout (3 columns):
1. Customer Support Challenge
   - Prize: $10,000
   - Deadline: 7 days
   - 234 submissions
   - Progress bar showing time left

2. Data Analysis Sprint
   - Prize: $5,000
   - Deadline: 14 days
   - 89 submissions
   - Leaderboard preview

3. Multi-Agent Coordination
   - Prize: $15,000
   - Deadline: 21 days
   - 45 submissions
   - "New!" badge
```

### 5. Pattern Marketplace

**Components**:

- `src/components/ui/tabs.tsx`
- `src/components/ui/hover-card.tsx`
- `src/components/magicui/marquee.tsx`

**Tabs**:

1. **Popular** - Most used patterns
2. **New** - Recently uploaded
3. **Trending** - Gaining traction
4. **Certified** - Staidium verified

**Pattern Cards Include**:

- Pattern name
- Author avatar + name
- Framework badges (LangGraph, CrewAI, etc)
- Performance metrics
- Download count
- "Fork" button

### 6. Upload Section

**Components**:

- `src/components/ui/file-upload.tsx`
- `src/components/ui/form.tsx`
- `src/components/ui/dialog.tsx`

**Flow**:

```
1. Drag & drop zone for .yaml files
2. Auto-parse and validate pattern
3. Show preview of pattern structure
4. Add metadata form:
   - Pattern name
   - Description
   - Categories
   - License selection
5. "Run Initial Benchmark" option
```

### 7. Real-time Leaderboard

**Components**:

- `src/components/ui/table.tsx`
- `src/components/magicui/animated-list.tsx`
- `src/components/ui/avatar.tsx`

**Columns**:

- Rank (with change indicator)
- Pattern Name
- Author
- Score (composite)
- Cost/1K
- Latency
- Success Rate
- Last Updated

**Features**:

- Live updates with animation
- Filter by framework
- Sort by any metric
- Export results

### 8. Email Signup

**Components**:

- `src/components/common/contact-form.tsx` (modify)
- `src/components/ui/input.tsx`
- `src/components/ui/button.tsx`

**Content**:

```
Title: "Join the Agent Revolution"
Subtitle: "Get weekly insights on top patterns and upcoming competitions"

Form:
- Email input with validation
- Newsletter preferences checkboxes:
  □ Competition announcements
  □ New pattern alerts
  □ Performance insights
  □ Platform updates

CTA: "Start Competing" (accent color)
```

### 9. Footer

**Components**:

- `src/components/nav/footer.tsx` (existing)
- `src/components/social/social-links.tsx`

**Sections**:

1. Platform
   - About
   - Careers
   - Blog
   - Changelog

2. Developers
   - Documentation
   - API Reference
   - GitHub
   - Discord

3. Legal
   - Terms
   - Privacy
   - License
   - Copyright

4. Social
   - Twitter/X
   - GitHub
   - Discord
   - LinkedIn

## API Endpoints

### 1. `/api/benchmark`

```typescript
POST /api/benchmark
Body: {
  patternId: string
  frameworks: string[]
  options: BenchmarkOptions
}
Response: {
  results: BenchmarkResult[]
  comparison: ComparisonMatrix
}
```

### 2. `/api/patterns`

```typescript
GET /api/patterns?filter=popular&limit=10
POST /api/patterns/upload
GET /api/patterns/:id/download
```

### 3. `/api/competitions`

```typescript
GET /api/competitions/active
POST /api/competitions/:id/submit
GET /api/competitions/:id/leaderboard
```

### 4. `/api/subscribe`

```typescript
POST /api/subscribe
Body: {
  email: string
  preferences: string[]
}
```

## Mobile Responsiveness

### Breakpoints

```css
sm: 640px  // Mobile
md: 768px  // Tablet
lg: 1024px // Desktop
xl: 1280px // Wide
```

### Mobile-First Approach

1. **Navigation**: Hamburger menu on mobile
2. **Hero**: Stack CTAs vertically
3. **Cards**: Single column on mobile, 2 on tablet, 3+ on desktop
4. **Tables**: Horizontal scroll with frozen first column
5. **Terminal**: Reduce font size, maintain functionality

## Copy Guidelines

### Voice & Tone

- **Technical but accessible**: Developers first, but welcoming
- **Action-oriented**: Focus on what users can DO
- **Competitive spirit**: Emphasize leaderboards, rankings, winning
- **Community-driven**: "Built by developers, for developers"

### Key Messages

1. **Portability**: "Write once, run anywhere"
2. **Performance**: "Benchmark everything that matters"
3. **Competition**: "Prove your architecture is best"
4. **Community**: "Join 1000+ agent builders"

### CTAs

- Primary: "Start Benchmarking", "Join Competition", "Upload Pattern"
- Secondary: "Browse Patterns", "View Leaderboard", "Read Docs"
- Social: "Join Discord", "Star on GitHub", "Follow Updates"

## SEO & Meta

### Meta Tags

```html
<title>Staidium - AI Agent Architecture Benchmarking & Competitions</title>
<meta
  name="description"
  content="The competitive platform for AI agent architectures. Benchmark across frameworks, compete for prizes, share patterns. Write once, run anywhere."
/>
<meta property="og:image" content="/og-image.png" />
<!-- Create showcase image -->
```

### Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Staidium",
  "applicationCategory": "DeveloperApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

## Performance Optimizations

1. **Lazy Load**: Pattern cards, leaderboard data
2. **Virtualization**: Long lists using react-window
3. **Code Splitting**: Separate bundles for upload, benchmarking
4. **Image Optimization**: Next.js Image for avatars, logos
5. **API Caching**: SWR for real-time data with smart refetching

## Animation Guidelines

Using existing components:

- **Subtle animations**: Use for micro-interactions
- **Performance**: Disable on `prefers-reduced-motion`
- **Purpose**: Each animation should guide attention
- **Consistency**: Match animation durations (200ms, 300ms, 500ms)

## Legal Considerations

### Copyright Notice

"All uploaded patterns remain property of their creators. Staidium claims no ownership over user-submitted architectures. By uploading, you grant Staidium a license to benchmark and display performance metrics."

### Terms of Use

- Clear licensing options for patterns (MIT, Apache, Proprietary)
- Competition rules and prize distribution
- API usage limits and fair use policy

## Launch Checklist

### Pre-Launch

- [ ] SSL certificate configured
- [ ] Analytics setup (GA4, Mixpanel)
- [ ] Error tracking (Sentry)
- [ ] Email service connected (SendGrid/Resend)
- [ ] GitHub OAuth configured
- [ ] Rate limiting implemented
- [ ] GDPR compliance banner

### Launch Day

- [ ] Social media announcements ready
- [ ] First 10 patterns pre-loaded
- [ ] Demo video recorded
- [ ] Discord server live
- [ ] Monitoring dashboards active

### Post-Launch

- [ ] A/B test CTAs
- [ ] Monitor conversion funnels
- [ ] Gather user feedback
- [ ] Iterate on pattern upload flow
- [ ] Plan first major competition

## Component Usage Map

```
Page Section          -> Components to Use
─────────────────────────────────────────────
Hero                  -> hero-highlight, text-generate-effect, button
Live Demo            -> terminal, code-comparison, chart
Competitions         -> card-spotlight, badge, progress, countdown
Pattern Grid         -> tabs, hover-card, avatar, badge
Upload Modal         -> dialog, file-upload, form, alert
Leaderboard         -> table, animated-list, sparkles (for #1)
Email Signup        -> contact-form, input, checkbox, button
Background Effects  -> particles, shooting-stars, vortex (hero only)
Loading States      -> skeleton, spinner (from kibo-ui)
Success States      -> sonner (toast), alert
```

## Development Workflow

1. Start with mobile layout
2. Add desktop enhancements
3. Implement animations last
4. Test with real data
5. Optimize bundle size
6. Run Lighthouse audits
7. Cross-browser testing
8. Deploy to Vercel

Remember: The goal is to make developers feel like they're joining a movement, not just using a tool. Every interaction should reinforce the competitive, community-driven nature of Staidium.
