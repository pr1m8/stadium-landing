"use client";

import { Button } from "@/components/ui/button";
import StaidiumNav from "@/components/nav/staidium-nav";
import StaidiumFooter from "@/components/nav/staidium-footer";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { TextGenerateEffect } from "@/components/ui/simplified-text-generate-effect";
import { SparklesCore } from "@/components/ui/simplified-sparkles";
import { motion } from "framer-motion";
import { Terminal } from "@/components/ui/terminal";
import { CodeComparison } from "@/components/magicui/code-comparison";
import { ChartContainer } from "@/components/ui/chart";
import RechartsBenchmarkChart from "@/components/ui/recharts-benchmark-chart";
import { CardSpotlight } from "@/components/ui/simplified-card-spotlight";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Marquee } from "@/components/magicui/marquee";
import { PatternCard } from "@/components/ui/pattern-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, Sparkles as SparklesIcon } from "lucide-react";

// Leaderboard data
const leaderboardData = [
  {
    name: "Supervisor-Worker",
    author: { name: "Alex Chen", avatar: "/assets/logo.svg" },
    score: "9.8",
    cost: "0.07",
    latency: "2.8",
    successRate: "94",
    lastUpdated: "4h ago",
    change: 0,
    isVerified: true,
  },
  {
    name: "Auto-Routing Agent",
    author: { name: "Maria Rodriguez", avatar: "/assets/logo.svg" },
    score: "9.5",
    cost: "0.09",
    latency: "3.1",
    successRate: "92",
    lastUpdated: "2d ago",
    change: 2,
    isVerified: true,
  },
  {
    name: "Chain-of-Thought",
    author: { name: "Michael Johnson", avatar: "/assets/logo.svg" },
    score: "9.2",
    cost: "0.12",
    latency: "2.5",
    successRate: "88",
    lastUpdated: "5h ago",
    change: -1,
    isVerified: true,
  },
  {
    name: "ReAct with Tools",
    author: { name: "Sophia Kim", avatar: "/assets/logo.svg" },
    score: "9.1",
    cost: "0.09",
    latency: "3.1",
    successRate: "91",
    lastUpdated: "1d ago",
    change: 1,
    isVerified: false,
  },
  {
    name: "Multi-Modal Reasoner",
    author: { name: "David Lee", avatar: "/assets/logo.svg" },
    score: "8.9",
    cost: "0.15",
    latency: "3.6",
    successRate: "93",
    lastUpdated: "12h ago",
    change: 3,
    isVerified: false,
  },
  {
    name: "Retrieval-Augmented Generation",
    author: { name: "Emma Wilson", avatar: "/assets/logo.svg" },
    score: "8.7",
    cost: "0.11",
    latency: "2.9",
    successRate: "89",
    lastUpdated: "3d ago",
    change: 0,
    isVerified: true,
  },
  {
    name: "Tree of Thought",
    author: { name: "James Taylor", avatar: "/assets/logo.svg" },
    score: "8.5",
    cost: "0.13",
    latency: "3.4",
    successRate: "87",
    lastUpdated: "2d ago",
    change: -2,
    isVerified: false,
  },
  {
    name: "Tool-Integrated Agent",
    author: { name: "Olivia Brown", avatar: "/assets/logo.svg" },
    score: "8.3",
    cost: "0.08",
    latency: "3.0",
    successRate: "85",
    lastUpdated: "6h ago",
    change: 1,
    isVerified: false,
  },
  {
    name: "Reflexion Architecture",
    author: { name: "Noah Garcia", avatar: "/assets/logo.svg" },
    score: "8.1",
    cost: "0.10",
    latency: "3.2",
    successRate: "84",
    lastUpdated: "1d ago",
    change: -3,
    isVerified: false,
  },
  {
    name: "Plan-and-Solve",
    author: { name: "Ava Martinez", avatar: "/assets/logo.svg" },
    score: "8.0",
    cost: "0.09",
    latency: "2.7",
    successRate: "82",
    lastUpdated: "4d ago",
    change: 2,
    isVerified: false,
  },
];

export default function StaidiumLandingPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-background text-foreground transition-colors duration-500 ease-in-out">
      {/* Navigation */}
      <StaidiumNav />

      {/* Hero Section with animated components */}
      <section className="w-full min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SparklesCore
            id="staidiumSparkles"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleColor="#0070f3"
            particleDensity={70}
            className="w-full h-full"
          />
        </div>

        <HeroHighlight className="w-full max-w-6xl flex flex-col items-center justify-center text-center gap-8 py-24 px-4 z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            Stop <Highlight className="text-red-600">Rewriting</Highlight>.{" "}
            Start <Highlight className="text-red-600">Benchmarking</Highlight>.
          </h1>

          <TextGenerateEffect
            words="The competitive platform for AI agent architectures. Write once, run anywhere, benchmark everything."
            className="max-w-3xl mx-auto text-gray-600 text-xl md:text-2xl font-normal"
          />

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mt-12">
            <Button variant="default" size="lg" className="min-w-[200px]">
              Browse Leaderboards
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="min-w-[200px] bg-red-600 hover:bg-red-700 text-white"
            >
              Upload Your Agent
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-black text-black hover:bg-black hover:text-white min-w-[200px]"
            >
              Join Competition
            </Button>
          </div>

          {/* Live Stats Bar with animation */}
          <motion.div
            className="w-full max-w-4xl flex flex-col sm:flex-row justify-between items-center mt-12 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-muted/40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <div className="text-center p-4">
              <motion.p
                className="text-3xl font-bold text-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                2,847
              </motion.p>
              <p className="text-sm text-muted-foreground">
                benchmarks run today
              </p>
            </div>
            <div className="text-center p-4">
              <motion.p
                className="text-3xl font-bold text-red-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                127
              </motion.p>
              <p className="text-sm text-muted-foreground">
                active competitions
              </p>
            </div>
            <div className="text-center p-4">
              <motion.p
                className="text-3xl font-bold text-red-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                $50K
              </motion.p>
              <p className="text-sm text-muted-foreground">in prizes</p>
            </div>
          </motion.div>
        </HeroHighlight>
      </section>

      {/* Live Benchmarking Demo Section */}
      <section
        id="benchmarks"
        className="w-full py-24 bg-muted/5 border-y border-border"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Live Benchmarking in Action
            </h2>
            <p className="text-muted-foreground text-lg">
              Watch real-time performance comparisons across multiple
              frameworks. Write your agent architecture once, benchmark it
              everywhere.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Terminal with command */}
            <div className="lg:sticky lg:top-24">
              <Terminal
                title="Staidium CLI"
                command="staidium benchmark supervisor-worker --frameworks all"
                lines={[
                  "Initializing benchmark...",
                  "Loading supervisor-worker pattern from repository...",
                  "Preparing test environments for frameworks:",
                  "  - LangGraph",
                  "  - CrewAI",
                  "  - AutoGen",
                  "  - LlamaIndex",
                  "Running benchmark suite (this may take a few minutes)...",
                  "✓ LangGraph completed in 3.2s",
                  "✓ CrewAI completed in 4.1s",
                  "✓ AutoGen completed in 2.8s",
                  "✓ LlamaIndex completed in 3.7s",
                  "",
                  "Benchmark complete! View detailed results at staidium.ai/results/12345",
                ]}
                lineDelay={800}
                commandDelay={50}
              />
            </div>

            {/* Chart visualization */}
            <div className="bg-card rounded-lg border border-border p-6 h-[400px]">
              <div className="mb-4">
                <h3 className="text-lg font-medium">Performance Comparison</h3>
                <p className="text-sm text-muted-foreground">
                  Supervisor-Worker Pattern
                </p>
              </div>

              <ChartContainer
                className="h-[300px]"
                config={{
                  langGraph: {
                    label: "LangGraph",
                    theme: {
                      light: "#0070f3",
                      dark: "#0070f3",
                    },
                  },
                  crewAI: {
                    label: "CrewAI",
                    theme: {
                      light: "#00ff88",
                      dark: "#00ff88",
                    },
                  },
                  autoGen: {
                    label: "AutoGen",
                    theme: {
                      light: "#ff0080",
                      dark: "#ff0080",
                    },
                  },
                  llamaIndex: {
                    label: "LlamaIndex",
                    theme: {
                      light: "#ffaa00",
                      dark: "#ffaa00",
                    },
                  },
                }}
              >
                <RechartsBenchmarkChart />
              </ChartContainer>
            </div>
          </div>

          {/* Framework Comparison Code */}
          <div className="mt-16 max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">
              Same Pattern, Different Frameworks
            </h3>
            <CodeComparison
              title1="LangGraph Implementation"
              title2="CrewAI Implementation"
              language1="python"
              language2="python"
              code1={`from langgraph.graph import StateGraph
from typing import TypedDict, List

class AgentState(TypedDict):
    task: str
    context: List[str]
    results: List[str]
    
def supervisor(state: AgentState):
    """Decide what to do next based on the state"""
    task = state["task"]
    results = state["results"]
    # Logic to route to worker or finalize
    return "worker" if not results else "finalize"

def worker(state: AgentState):
    """Worker agent executes the task"""
    # Execute task using LLM
    results = execute_task(state["task"], state["context"])
    return {"results": results}

def finalize(state: AgentState):
    """Format final response"""
    return {"final_answer": summarize(state["results"])}

# Build the graph
graph = StateGraph(AgentState)
graph.add_node("supervisor", supervisor)
graph.add_node("worker", worker)
graph.add_node("finalize", finalize)

# Define edges
graph.add_conditional_edges("supervisor", condition_fn=supervisor, 
                           edge_options=["worker", "finalize"])
graph.add_edge("worker", "supervisor")
graph.set_entry_point("supervisor")
graph.set_finish_point("finalize")`}
              code2={`from crewai import Agent, Task, Crew, Process

# Create the supervisor agent
supervisor = Agent(
    role="Supervisor",
    goal="Coordinate task execution and ensure quality",
    backstory="You are an expert project manager",
    allow_delegation=True,
    verbose=True
)

# Create the worker agent
worker = Agent(
    role="Worker",
    goal="Execute assigned tasks effectively",
    backstory="You are a skilled specialist",
    verbose=True
)

# Define tasks
execute_task = Task(
    description="Execute the assigned task",
    agent=worker,
    expected_output="Completed task results"
)

review_task = Task(
    description="Review and finalize the results",
    agent=supervisor,
    expected_output="Final summary and recommendations"
)

# Create a crew with sequential process
crew = Crew(
    agents=[supervisor, worker],
    tasks=[execute_task, review_task],
    process=Process.sequential
)

# Run the crew
result = crew.kickoff(inputs={"task": task, "context": context})`}
              highlightedLines1={[3, 4, 5, 6, 19, 20, 21, 24, 25, 26, 27, 28]}
              highlightedLines2={[
                3, 4, 5, 6, 7, 8, 9, 12, 13, 14, 15, 16, 17, 30, 31, 32,
              ]}
            />
          </div>
        </div>
      </section>

      {/* Competition Section */}
      <section
        id="competitions"
        className="w-full py-24 bg-gradient-to-b from-muted/5 to-muted/20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Active Competitions
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join challenges, benchmark your agent architectures against
              others, and win prizes. Our competitions help push the state of
              the art forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Customer Support Challenge Card */}
            <CardSpotlight
              className="p-6 h-full flex flex-col"
              radius={200}
              color="rgba(255, 0, 128, 0.15)"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Customer Support Challenge
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create the most effective support agent
                  </p>
                </div>
                <Badge variant="default" className="bg-red-600 text-white">
                  $10,000
                </Badge>
              </div>

              <div className="mb-6 flex-1">
                <div className="flex justify-between text-sm mb-2">
                  <span>Deadline: 7 days left</span>
                  <span className="font-medium">234 submissions</span>
                </div>
                <Progress value={30} className="h-1.5 bg-muted" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-black"></div>
                    <span>Response time</span>
                  </div>
                  <span className="font-mono">0.82s</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600"></div>
                    <span>Accuracy</span>
                  </div>
                  <span className="font-mono">88.6%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>User satisfaction</span>
                  </div>
                  <span className="font-mono">4.7/5.0</span>
                </div>
              </div>

              <Button variant="default" className="w-full mt-8">
                Join Challenge
              </Button>
            </CardSpotlight>

            {/* Data Analysis Sprint Card */}
            <CardSpotlight
              className="p-6 h-full flex flex-col"
              radius={200}
              color="rgba(0, 255, 136, 0.15)"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Data Analysis Sprint
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Most efficient data processing agents
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="text-secondary-foreground"
                >
                  $5,000
                </Badge>
              </div>

              <div className="mb-6 flex-1">
                <div className="flex justify-between text-sm mb-2">
                  <span>Deadline: 14 days left</span>
                  <span className="font-medium">89 submissions</span>
                </div>
                <Progress value={50} className="h-1.5 bg-muted" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-black"></div>
                    <span>Processing speed</span>
                  </div>
                  <span className="font-mono">2.1s</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600"></div>
                    <span>Accuracy</span>
                  </div>
                  <span className="font-mono">92.3%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Token efficiency</span>
                  </div>
                  <span className="font-mono">+24%</span>
                </div>
              </div>

              <Button variant="secondary" className="w-full mt-8">
                View Leaderboard
              </Button>
            </CardSpotlight>

            {/* Multi-Agent Coordination Card */}
            <CardSpotlight
              className="p-6 h-full flex flex-col relative"
              radius={200}
              color="rgba(0, 112, 243, 0.15)"
            >
              <div className="absolute -top-2 -right-2">
                <Badge
                  variant="destructive"
                  className="bg-destructive text-white font-semibold"
                >
                  NEW!
                </Badge>
              </div>

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Multi-Agent Coordination
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Build cooperative agent teams
                  </p>
                </div>
                <Badge
                  variant="default"
                  className="bg-primary text-primary-foreground"
                >
                  $15,000
                </Badge>
              </div>

              <div className="mb-6 flex-1">
                <div className="flex justify-between text-sm mb-2">
                  <span>Deadline: 21 days left</span>
                  <span className="font-medium">45 submissions</span>
                </div>
                <Progress value={70} className="h-1.5 bg-muted" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-black"></div>
                    <span>Task completion</span>
                  </div>
                  <span className="font-mono">78.5%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600"></div>
                    <span>Coordination</span>
                  </div>
                  <span className="font-mono">64.2%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Robustness</span>
                  </div>
                  <span className="font-mono">3.8/5.0</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Join Challenge
              </Button>
            </CardSpotlight>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="mx-auto">
              View All Competitions
            </Button>
          </div>
        </div>
      </section>

      {/* Pattern Marketplace */}
      <section
        id="patterns"
        className="w-full py-24 bg-background border-y border-border"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pattern Marketplace
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover, share, and remix agent architecture patterns that work
              across frameworks. Stand on the shoulders of giants.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="popular" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="bg-muted/30">
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="certified">Certified</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="popular" className="space-y-6">
                {/* Pattern Cards - using a grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Pattern Card 1 */}
                  <PatternCard
                    name="Supervisor-Worker"
                    author={{
                      name: "Alex Chen",
                      avatar: "/assets/logo.svg",
                    }}
                    frameworks={["LangGraph", "CrewAI", "AutoGen"]}
                    metrics={{
                      latency: "2.8s",
                      cost: "$0.07/1K",
                      successRate: "94%",
                    }}
                    downloads={1284}
                  />

                  {/* Pattern Card 2 */}
                  <PatternCard
                    name="ReAct with Tools"
                    author={{
                      name: "Sophia Kim",
                      avatar: "/assets/logo.svg",
                    }}
                    frameworks={["LangGraph", "LlamaIndex"]}
                    metrics={{
                      latency: "3.1s",
                      cost: "$0.09/1K",
                      successRate: "91%",
                    }}
                    downloads={892}
                  />

                  {/* Pattern Card 3 */}
                  <PatternCard
                    name="Chain-of-Thought"
                    author={{
                      name: "Michael Johnson",
                      avatar: "/assets/logo.svg",
                    }}
                    frameworks={[
                      "LangGraph",
                      "CrewAI",
                      "AutoGen",
                      "LlamaIndex",
                    ]}
                    metrics={{
                      latency: "2.5s",
                      cost: "$0.12/1K",
                      successRate: "88%",
                    }}
                    downloads={2341}
                    isVerified={true}
                  />
                </div>
              </TabsContent>

              <TabsContent value="new" className="space-y-6">
                {/* Placeholder for new patterns - similar structure */}
                <div className="text-center p-12 border border-dashed rounded-lg border-border">
                  <p className="text-muted-foreground">
                    New patterns will be displayed here
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="trending" className="space-y-6">
                {/* Placeholder for trending patterns - similar structure */}
                <div className="text-center p-12 border border-dashed rounded-lg border-border">
                  <p className="text-muted-foreground">
                    Trending patterns will be displayed here
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="certified" className="space-y-6">
                {/* Placeholder for certified patterns - similar structure */}
                <div className="text-center p-12 border border-dashed rounded-lg border-border">
                  <p className="text-muted-foreground">
                    Certified patterns will be displayed here
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Framework Logos Marquee */}
          <div className="mt-24 overflow-hidden py-6">
            <h3 className="text-center text-sm uppercase text-muted-foreground mb-6 tracking-wider font-semibold">
              Compatible with all major frameworks
            </h3>
            <Marquee className="py-4" pauseOnHover={true}>
              <div className="flex items-center justify-center mx-8">
                <div className="h-12 w-auto px-6 py-2 bg-card rounded-lg flex items-center justify-center border border-border">
                  <span className="font-medium text-foreground">LangGraph</span>
                </div>
              </div>
              <div className="flex items-center justify-center mx-8">
                <div className="h-12 w-auto px-6 py-2 bg-card rounded-lg flex items-center justify-center border border-border">
                  <span className="font-medium text-foreground">CrewAI</span>
                </div>
              </div>
              <div className="flex items-center justify-center mx-8">
                <div className="h-12 w-auto px-6 py-2 bg-card rounded-lg flex items-center justify-center border border-border">
                  <span className="font-medium text-foreground">AutoGen</span>
                </div>
              </div>
              <div className="flex items-center justify-center mx-8">
                <div className="h-12 w-auto px-6 py-2 bg-card rounded-lg flex items-center justify-center border border-border">
                  <span className="font-medium text-foreground">
                    LlamaIndex
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center mx-8">
                <div className="h-12 w-auto px-6 py-2 bg-card rounded-lg flex items-center justify-center border border-border">
                  <span className="font-medium text-foreground">LangChain</span>
                </div>
              </div>
              <div className="flex items-center justify-center mx-8">
                <div className="h-12 w-auto px-6 py-2 bg-card rounded-lg flex items-center justify-center border border-border">
                  <span className="font-medium text-foreground">OpenDevin</span>
                </div>
              </div>
            </Marquee>
          </div>
        </div>
      </section>

      {/* File Upload Section */}
      <section
        id="upload"
        className="w-full py-24 bg-gradient-to-b from-muted/5 to-background"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Upload Your Pattern
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Share your agent architecture patterns with the community. Get
              benchmarked, receive feedback, and gain recognition.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer">
                  <FileUpload />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Upload Pattern</DialogTitle>
                  <DialogDescription>
                    Add metadata to your pattern before uploading. This helps
                    others discover and use your work.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label
                      htmlFor="pattern-name"
                      className="text-right text-sm"
                    >
                      Name
                    </label>
                    <input
                      id="pattern-name"
                      className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="e.g., Supervisor-Worker"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="description" className="text-right text-sm">
                      Description
                    </label>
                    <textarea
                      id="description"
                      className="col-span-3 min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Briefly describe what this pattern does and when to use it..."
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="categories" className="text-right text-sm">
                      Categories
                    </label>
                    <input
                      id="categories"
                      className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="e.g., reasoning, multi-agent, retrieval"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="license" className="text-right text-sm">
                      License
                    </label>
                    <select
                      id="license"
                      className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="mit">MIT License</option>
                      <option value="apache">Apache 2.0</option>
                      <option value="cc">Creative Commons</option>
                      <option value="proprietary">Proprietary</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <div className="text-right text-sm">Options</div>
                    <div className="col-span-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="benchmark"
                          className="h-4 w-4 rounded border-input"
                        />
                        <label htmlFor="benchmark" className="text-sm">
                          Run initial benchmark
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="public"
                          className="h-4 w-4 rounded border-input"
                          defaultChecked
                        />
                        <label htmlFor="public" className="text-sm">
                          Make pattern public
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" className="w-32">
                    Cancel
                  </Button>
                  <Button className="w-32">Upload</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>
                By uploading a pattern, you agree to our{" "}
                <a href="#" className="underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="underline">
                  Community Guidelines
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Leaderboard */}
      <section
        id="leaderboard"
        className="w-full py-24 bg-muted/10 border-y border-border"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Real-time Leaderboard
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See how different agent architectures perform across metrics. The
              competition never ends.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="all">All Frameworks</option>
                  <option value="langGraph">LangGraph</option>
                  <option value="crewAI">CrewAI</option>
                  <option value="autoGen">AutoGen</option>
                  <option value="llamaIndex">LlamaIndex</option>
                </select>
                <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="composite">Composite Score</option>
                  <option value="latency">Latency</option>
                  <option value="cost">Cost/1K</option>
                  <option value="success">Success Rate</option>
                </select>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Export Results
              </Button>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-border">
              <div className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16 text-center">#</TableHead>
                      <TableHead>Pattern Name</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Author
                      </TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Cost/1K
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Latency
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Success Rate
                      </TableHead>
                      <TableHead className="hidden md:table-cell text-right">
                        Last Updated
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaderboardData.map((row, index) => (
                      <TableRow
                        key={index}
                        className={index < 3 ? "bg-muted/30" : ""}
                      >
                        <TableCell className="text-center font-medium">
                          <div className="flex items-center justify-center">
                            {index === 0 && (
                              <SparklesIcon className="h-4 w-4 text-secondary absolute" />
                            )}
                            {index + 1}
                            {row.change && (
                              <span
                                className={`ml-1 text-xs ${row.change > 0 ? "text-secondary" : "text-destructive"}`}
                              >
                                {row.change > 0
                                  ? `↑${row.change}`
                                  : `↓${Math.abs(row.change)}`}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="font-medium">{row.name}</span>
                            {row.isVerified && (
                              <span className="ml-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-secondary"
                                >
                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={row.author.avatar}
                                alt={row.author.name}
                              />
                              <AvatarFallback>
                                {row.author.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{row.author.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{row.score}</span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell font-mono text-sm">
                          ${row.cost}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell font-mono text-sm">
                          {row.latency}s
                        </TableCell>
                        <TableCell className="hidden lg:table-cell font-mono text-sm">
                          {row.successRate}%
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-right text-muted-foreground text-sm">
                          {row.lastUpdated}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between p-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">10</span> of{" "}
                  <span className="font-medium">142</span> patterns
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section
        id="signup"
        className="w-full py-24 bg-gradient-to-b from-background to-muted/5"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join the Agent Revolution
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get weekly insights on top patterns and upcoming competitions.
              Stay ahead of the curve in AI agent development.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <form className="space-y-6 bg-card rounded-lg border border-border p-6 shadow-sm">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-3">
                <div className="text-sm font-medium mb-2">
                  Newsletter preferences
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-start">
                    <input
                      id="competition-announcements"
                      name="newsletter"
                      type="checkbox"
                      className="h-4 w-4 rounded border-input mt-1"
                      defaultChecked
                    />
                    <label
                      htmlFor="competition-announcements"
                      className="ml-2 block text-sm"
                    >
                      Competition announcements
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input
                      id="new-patterns"
                      name="newsletter"
                      type="checkbox"
                      className="h-4 w-4 rounded border-input mt-1"
                      defaultChecked
                    />
                    <label
                      htmlFor="new-patterns"
                      className="ml-2 block text-sm"
                    >
                      New pattern alerts
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input
                      id="performance-insights"
                      name="newsletter"
                      type="checkbox"
                      className="h-4 w-4 rounded border-input mt-1"
                    />
                    <label
                      htmlFor="performance-insights"
                      className="ml-2 block text-sm"
                    >
                      Performance insights
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input
                      id="platform-updates"
                      name="newsletter"
                      type="checkbox"
                      className="h-4 w-4 rounded border-input mt-1"
                    />
                    <label
                      htmlFor="platform-updates"
                      className="ml-2 block text-sm"
                    >
                      Platform updates
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Start Competing
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <StaidiumFooter />
    </div>
  );
}
