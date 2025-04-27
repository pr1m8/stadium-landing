export interface DocProject {
    name: string
    description: string
    url: string
    version: string
    last_updated: string
    language: string
  }
  
  // Hardcoded projects for pr1m8
  const PR1M8_PROJECTS: DocProject[] = [
    {
      name: "Neural Architecture Search Framework",
      description: "Documentation for the NAS framework including tutorials, API reference, and examples.",
      url: "https://nas-framework.readthedocs.io/",
      version: "2.3",
      last_updated: "2025-03-15",
      language: "Python",
    },
    {
      name: "Time Series Transformer",
      description: "Comprehensive guide to using transformer models for time series forecasting.",
      url: "https://ts-transformer.readthedocs.io/",
      version: "1.8",
      last_updated: "2025-03-01",
      language: "Python",
    },
    {
      name: "Reinforcement Learning for Risk",
      description: "Documentation for implementing RL in financial risk management applications.",
      url: "https://rl-risk.readthedocs.io/",
      version: "1.2",
      last_updated: "2025-02-20",
      language: "Python",
    },
    {
      name: "Multi-modal Fusion Architecture",
      description: "Guide to combining data from multiple modalities for comprehensive AI understanding.",
      url: "https://multimodal-fusion.readthedocs.io/",
      version: "0.9",
      last_updated: "2025-02-10",
      language: "Python",
    },
    {
      name: "Dynamic RAG Framework",
      description: "Documentation for the Dynamic Retrieval Augmented Generation framework.",
      url: "https://dynamic-rag.readthedocs.io/",
      version: "0.8",
      last_updated: "2025-03-05",
      language: "Python",
    },
  ]
  
  export async function fetchReadTheDocs(username = "pr1m8", limit = 3): Promise<DocProject[]> {
    // Default to pr1m8 if no username is provided
    if (!username) {
      username = "pr1m8"
    }
  
    // For pr1m8, return the hardcoded projects
    if (username === "pr1m8" || username === "wrastley") {
      return PR1M8_PROJECTS.slice(0, limit)
    }
  
    // For other usernames, we could implement a real API call if needed
    // For now, just return an empty array
    return []
  }
  