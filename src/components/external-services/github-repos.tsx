"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, GitFork, Eye, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { fetchGithubRepos, type GithubRepo } from "@/lib/external-services/github"

interface GithubProjectsProps {
    username: string
    limit?: number
}

export default function GithubProjects({ username, limit = 3 }: GithubProjectsProps) {
    const [repos, setRepos] = useState<GithubRepo[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getRepos = async () => {
            setLoading(true)
            setError(null)

            try {
                const data = await fetchGithubRepos(username, limit)
                setRepos(data)
            } catch (err) {
                console.error("Error fetching GitHub repos:", err)
                setError("Failed to load GitHub repositories. Please try again later.")
            } finally {
                setLoading(false)
            }
        }

        if (username) {
            getRepos()
        } else {
            setLoading(false)
            setError("GitHub username is required to fetch repositories.")
        }
    }, [username, limit])

    if (error) {
        return (
            <Alert variant="destructive" className="mt-8">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )
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
                            <div className="flex w-full justify-between">
                                <Skeleton className="h-8 w-16" />
                                <Skeleton className="h-8 w-16" />
                                <Skeleton className="h-8 w-16" />
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        )
    }

    if (repos.length === 0) {
        return (
            <Alert className="mt-8">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No repositories found</AlertTitle>
                <AlertDescription>No public repositories were found for this user.</AlertDescription>
            </Alert>
        )
    }

    return (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {repos.map((repo) => (
                <Card key={repo.id} className="overflow-hidden transition-all hover:shadow-md">
                    <CardHeader className="p-6">
                        <Link
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl font-semibold hover:text-primary hover:underline"
                        >
                            {repo.name}
                        </Link>
                        <Badge className="mt-1 w-fit">{repo.language}</Badge>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                        <p className="text-muted-foreground">{repo.description}</p>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                        <div className="flex w-full justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4" />
                                <span>{repo.stargazers_count}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <GitFork className="h-4 w-4" />
                                <span>{repo.forks_count}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                <span>{repo.watchers_count}</span>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
