"use client";

import { Terminal } from "@/components/ui/terminal";
import { ChartContainer } from "@/components/ui/chart";
import RechartsBenchmarkChart from "@/components/ui/recharts-benchmark-chart";

export default function BenchmarkingSection() {
  return (
    <section
      id="benchmarks"
      className="w-full py-24 bg-muted/10 border-y border-border"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Live Benchmarking in Action
          </h2>
          <p className="text-muted-foreground text-lg">
            Watch real-time performance comparisons across multiple frameworks.
            Write your agent architecture once, benchmark it everywhere.
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
            <ChartContainer config={{}}>
              <RechartsBenchmarkChart />
            </ChartContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
