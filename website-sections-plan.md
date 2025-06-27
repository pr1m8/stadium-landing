# williamastley.dev - Section Structure Plan

## 🏗️ SITE ARCHITECTURE

```
williamastley.dev/
├── / (Homepage - Quick overview)
├── /projects (Main portfolio)
│   ├── /frameworks (Haive, Staiidium)
│   ├── /agents (Interactive demos)
│   └── /open-source (20+ projects)
├── /writing (Technical blog)
├── /about (Personal story)
└── /contact (Get in touch)
```

## 📱 HOMEPAGE STRUCTURE

### Hero Section

```tsx
// Clean, no animations
<div className="max-w-4xl mx-auto py-20">
  <h1 className="text-5xl font-bold mb-4">William Astley</h1>
  <p className="text-xl text-gray-400 mb-8">
    I build AI frameworks that solve real problems
  </p>
  <div className="flex gap-4">
    <Button>View Work</Button>
    <Button variant="outline">About Me</Button>
  </div>
</div>
```

### Featured Projects (3 max)

```tsx
// ui/card-spotlight.tsx for each
<div className="grid md:grid-cols-3 gap-6">
  <ProjectCard
    title="Haive Framework"
    description="Self-modifying AI agents"
    metrics="100+ agents, 75% faster"
    links={{ github, docs, demo }}
  />
  // ... 2 more
</div>
```

### Quick Stats Bar

```tsx
// Simple metrics, no parallax
<div className="grid grid-cols-4 gap-4 py-12 border-y">
  <Stat number="100+" label="Agents Built" />
  <Stat number="20+" label="OSS Projects" />
  <Stat number="$2M+" label="Saved at Corpay" />
  <Stat number="2023" label="YC Finalist" />
</div>
```

## 🎨 PROJECTS PAGE (/projects)

### Navigation Tabs

```tsx
// ui/tabs.tsx
<Tabs defaultValue="frameworks">
  <TabsList>
    <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
    <TabsTrigger value="agents">Agent Demos</TabsTrigger>
    <TabsTrigger value="oss">Open Source</TabsTrigger>
  </TabsList>

  <TabsContent value="frameworks">
    // Full detail cards for Haive & Staiidium
  </TabsContent>

  <TabsContent value="agents">
    // Grid of 10 best agents with "Try It" buttons
  </TabsContent>

  <TabsContent value="oss">// Marquee or grid of smaller cards</TabsContent>
</Tabs>
```

### Framework Cards (Detailed)

```tsx
// For Haive/Staiidium - ui/3d-card.tsx
<FrameworkCard>
  <Badge>Python</Badge>
  <h3>Haive Framework</h3>
  <p>Dynamic AI agents that modify themselves</p>

  <div className="flex gap-2 mt-4">
    {github && <LinkBadge icon={GitHub} href={github} />}
    {pypi && <LinkBadge icon={Package} href={pypi} />}
    {docs && <LinkBadge icon={Book} href={docs} />}
  </div>

  <Metrics>
    <Metric>75% faster development</Metric>
    <Metric>$2M saved at Corpay</Metric>
  </Metrics>

  <Button className="mt-4 w-full">View Live Demo</Button>
</FrameworkCard>
```

### Agent Demo Section

```tsx
// Interactive but contained
<div className="grid md:grid-cols-2 gap-6">
  <AgentCard
    title="Trading Agent"
    type="Financial"
    description="Autonomous trading with self-modification"
    demoType="embedded" // or "external"
  />
  // Show only best 8-10
</div>

// Add filter buttons
<div className="flex gap-2 mb-6">
  <Button size="sm" variant={filter === 'all' ? 'default' : 'outline'}>
    All
  </Button>
  <Button size="sm" variant={filter === 'finance' ? 'default' : 'outline'}>
    Finance
  </Button>
  <Button size="sm" variant={filter === 'gaming' ? 'default' : 'outline'}>
    Gaming
  </Button>
</div>
```

### Open Source Grid

```tsx
// magicui/marquee.tsx OR static grid
// Group by type
const projects = {
  'AI Tools': ['notex-ai', 'agent-logic'],
  'Dev Tools': ['djangomate', 'repo-sanitize'],
  'Finance': ['awt-quant', 'credit-default'],
  'Misc': ['prompt-injections', 'others...']
}

// Either marquee for motion
<Marquee pauseOnHover className="py-4">
  {projects.map(project => (
    <ProjectPill
      name={project.name}
      stars={project.stars}
      link={project.github}
    />
  ))}
</Marquee>

// OR static grid for clarity
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {projects.map(project => (
    <MiniProjectCard {...project} />
  ))}
</div>
```

## 📝 WRITING SECTION (/writing)

### Blog Layout

```tsx
// common/blog/blog-with-search.tsx
// Keep it simple - 4-6 key posts
const posts = [
  {
    title: "Why I Built Haive",
    subtitle: "The architecture overfitting problem",
    date: "2024-01-15",
    readTime: "5 min",
  },
  {
    title: "Leaving Math for AI",
    subtitle: "Best decision I ever made",
    date: "2023-11-20",
    readTime: "3 min",
  },
  // 2-4 more technical posts
];
```

## 👤 ABOUT PAGE (/about)

### Clean Timeline

```tsx
// ui/timeline.tsx - no fancy animations
<Timeline>
  <TimelineItem>
    <TimelineIcon>🎓</TimelineIcon>
    <TimelineContent>
      <h3>2018 - Started Mathematics @ UofT</h3>
      <p>Loved the theory, craved building</p>
    </TimelineContent>
  </TimelineItem>
  // ... more items
</Timeline>

// Add personal touches
<div className="prose prose-invert max-w-none">
  <h2>Philosophy</h2>
  <ul>
    <li>Ship code, not slideware</li>
    <li>Simple solutions to hard problems</li>
    <li>Open source everything</li>
  </ul>
</div>

// Clear CTAs
<div className="flex gap-4 mt-8">
  <DownloadResumeButton />
  <Button variant="outline" asChild>
    <a href="/contact">Get In Touch</a>
  </Button>
</div>
```

## 🎯 KEY DECISIONS

### DO:

- **Separate agent demos** into their own tab/section
- **Group OSS projects** by category
- **Keep homepage light** - just 3 featured projects
- **Use tabs** to organize without overwhelming
- **Add filtering** for agent demos
- **Show metrics** on every project card

### DON'T:

- Put all 100+ agents on one page
- Use heavy parallax on mobile
- Mix personal story with project details
- Auto-play agent demos
- Hide important links in animations

### PROJECT CARD HIERARCHY:

1. **Tier 1**: Haive, Staiidium (full cards with all links)
2. **Tier 2**: Best 10 agents (demo-focused cards)
3. **Tier 3**: OSS projects (compact pills/mini cards)

### NAVIGATION STRATEGY:

```
Homepage (overview) → Projects (organized tabs) → Individual project pages (deep dives)
                  ↓
                About (personal story)
                  ↓
                Contact (clear CTAs)
```

## 🚀 IMPLEMENTATION PRIORITY

### Week 1:

1. Homepage with 3 featured projects
2. About page with timeline
3. Contact with form

### Week 2:

1. Projects page with tabs
2. Framework detail cards
3. OSS project grid/marquee

### Week 3:

1. Agent demo section (pick best 10)
2. Blog with 3-4 posts
3. Individual project pages for Haive/Staiidium

### Week 4:

1. Polish and optimize
2. Add analytics
3. Test on mobile
4. Launch!
