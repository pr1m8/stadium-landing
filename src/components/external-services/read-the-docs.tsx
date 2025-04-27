"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen,
  AlertCircle,
  ExternalLink,
  Code,
  FileCode,
  Database,
} from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  fetchReadTheDocs,
  type DocProject,
} from "@/lib/external-services/read-the-docs";

interface ReadTheDocsProps {
  username: string;
  limit?: number;
}

export default function ReadTheDocs({ username, limit = 3 }: ReadTheDocsProps) {
  const [projects, setProjects] = useState<DocProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProjects = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchReadTheDocs(username, limit);
        setProjects(data);
      } catch (err) {
        console.error("Error fetching ReadTheDocs projects:", err);
        setError(
          "Failed to load documentation projects. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      getProjects();
    } else {
      setLoading(false);
      setError("Username is required to fetch documentation projects.");
    }
  }, [username, limit]);

  // Function to get the appropriate icon based on project name or language
  const getProjectIcon = (project: DocProject) => {
    const name = project.name.toLowerCase();
    const language = project.language.toLowerCase();

    if (name.includes("rag") || name.includes("retrieval")) {
      return <Database className="h-6 w-6 text-primary" />;
    } else if (language === "python") {
      return <FileCode className="h-6 w-6 text-primary" />;
    } else {
      return <Code className="h-6 w-6 text-primary" />;
    }
  };

  if (error) {
    return (
      <Alert variant="destructive" className="mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {Array.from({ length: limit }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="p-6">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="mt-2 h-4 w-1/4" />
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <Skeleton className="h-16 w-full" />
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <Alert className="mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No documentation found</AlertTitle>
        <AlertDescription>
          No documentation projects were found for this user.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      {projects.map((project) => (
        <Card
          key={project.name}
          className="overflow-hidden transition-all hover:shadow-md"
        >
          <CardHeader className="p-6">
            <div className="flex items-start gap-4">
              {getProjectIcon(project)}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <Badge>{project.language}</Badge>
                  <span className="text-xs text-muted-foreground">
                    v{project.version}
                  </span>
                </div>
              </div>
            </div>
            {/* Added tagline for each project */}
            <p className="mt-2 text-sm text-muted-foreground">
              {project.name.includes("Neural")
                ? "Automate neural network design for optimal performance."
                : project.name.includes("Time Series")
                  ? "Advanced forecasting with transformer architecture."
                  : project.name.includes("Risk")
                    ? "Robust risk assessment for financial applications."
                    : project.name.includes("Fusion")
                      ? "Combine multiple data types for comprehensive AI understanding."
                      : project.name.includes("RAG")
                        ? "Smart document retrieval that adapts to your needs."
                        : "Comprehensive documentation and examples."}
            </p>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <p className="text-muted-foreground">{project.description}</p>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <Button asChild variant="outline" className="w-full gap-2">
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BookOpen className="h-4 w-4" />
                <span>View Documentation</span>
                <ExternalLink className="ml-auto h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
