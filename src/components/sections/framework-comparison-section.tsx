"use client";

import { CodeComparison } from "@/components/magicui/code-comparison";

export default function FrameworkComparisonSection() {
  return (
    <section className="py-16 max-w-5xl mx-auto px-4">
      <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
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

# Compile and run
app = graph.compile()
result = app.invoke({"task": "Analyze market trends"})`}
        code2={`from crewai import Agent, Task, Crew

# Define agents
supervisor = Agent(
    role='Supervisor',
    goal='Coordinate tasks and ensure completion',
    backstory='Expert in task delegation and management',
    verbose=True
)

worker = Agent(
    role='Worker',
    goal='Execute assigned tasks efficiently',
    backstory='Specialized in data analysis and processing',
    verbose=True
)

finalizer = Agent(
    role='Finalizer',
    goal='Compile and format final results',
    backstory='Expert in summarization and reporting',
    verbose=True
)

# Create tasks
analyze_task = Task(
    description='Analyze market trends',
    agent=worker,
    expected_output='Market analysis report'
)

finalize_task = Task(
    description='Compile final report',
    agent=finalizer,
    expected_output='Executive summary',
    context=[analyze_task]
)

# Create crew
crew = Crew(
    agents=[supervisor, worker, finalizer],
    tasks=[analyze_task, finalize_task],
    verbose=True
)

# Execute
result = crew.kickoff()`}
        highlightedLines1={[25, 26, 27, 28, 29]}
        highlightedLines2={[33, 34, 35, 36, 37]}
      />
    </section>
  );
}
