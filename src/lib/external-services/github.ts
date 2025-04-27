export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string;
  updated_at: string;
}

export async function fetchGithubRepos(
  username: string,
  limit = 3,
): Promise<GithubRepo[]> {
  console.log("Fetching GitHub repos for:", username || "no username provided");

  // Always return fallback data if username is empty
  if (!username) {
    console.warn("GitHub username is empty, using fallback data");
    return getFallbackRepos();
  }

  try {
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    console.log("GitHub token available:", !!token);

    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Portfolio-Website",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}`;
    console.log("Fetching from URL:", apiUrl);

    const response = await fetch(apiUrl, { headers });

    if (!response.ok) {
      console.warn(
        `GitHub API error: ${response.status}. Using fallback data.`,
      );
      return getFallbackRepos();
    }

    const data = await response.json();
    console.log(`Successfully fetched ${data.length} repositories`);
    return data as GithubRepo[];
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return getFallbackRepos();
  }
}

// Always provide fallback data
function getFallbackRepos(): GithubRepo[] {
  console.log("Using fallback repository data");
  return [
    {
      id: 1,
      name: "Haive",
      description: "Open AI agent framework for autonomous reasoning",
      html_url: "#",
      stargazers_count: 245,
      forks_count: 32,
      watchers_count: 15,
      language: "Python",
      updated_at: "2023-04-15T12:45:30Z",
    },
    {
      id: 2,
      name: "LangGraph",
      description: "Recursive reasoning engines for LLM applications",
      html_url: "#",
      stargazers_count: 189,
      forks_count: 27,
      watchers_count: 12,
      language: "TypeScript",
      updated_at: "2023-05-20T09:12:45Z",
    },
    {
      id: 3,
      name: "Staidium",
      description: "AI-powered sports analytics platform",
      html_url: "#",
      stargazers_count: 132,
      forks_count: 18,
      watchers_count: 9,
      language: "JavaScript",
      updated_at: "2023-06-10T15:30:22Z",
    },
    {
      id: 4,
      name: "AgentGames",
      description: "Competitive AI environments for agent training",
      html_url: "#",
      stargazers_count: 98,
      forks_count: 14,
      watchers_count: 7,
      language: "Python",
      updated_at: "2023-07-05T11:20:15Z",
    },
    {
      id: 5,
      name: "Checkpointer",
      description: "State management system for AI agents",
      html_url: "#",
      stargazers_count: 76,
      forks_count: 9,
      watchers_count: 5,
      language: "TypeScript",
      updated_at: "2023-08-12T14:45:30Z",
    },
    {
      id: 6,
      name: "GraphTransformer",
      description: "Graph-based LLM architecture for complex reasoning",
      html_url: "#",
      stargazers_count: 112,
      forks_count: 16,
      watchers_count: 8,
      language: "Python",
      updated_at: "2023-09-18T10:15:45Z",
    },
  ];
}
