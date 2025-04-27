"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Download, Calendar, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { fetchPyPIPackages, type PyPIPackage } from "@/lib/external-services/pypi"

interface PyPIPackagesProps {
    username?: string
    limit?: number
}

export default function PyPIPackages({ username = "pr1m8", limit = 4 }: PyPIPackagesProps) {
    const [packages, setPackages] = useState<PyPIPackage[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getPackages = async () => {
            setLoading(true)
            setError(null)

            try {
                // Always use pr1m8 if no username is provided
                const actualUsername = username || "pr1m8"
                const data = await fetchPyPIPackages(actualUsername, limit)
                setPackages(data)
            } catch (err) {
                console.error("Error fetching PyPI packages:", err)
                setError("Failed to load PyPI packages. Please try again later.")
            } finally {
                setLoading(false)
            }
        }

        getPackages()
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
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
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
                                <Skeleton className="h-6 w-24" />
                                <Skeleton className="h-6 w-24" />
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        )
    }

    if (packages.length === 0) {
        return (
            <Alert className="mt-8">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No packages found</AlertTitle>
                <AlertDescription>No public PyPI packages were found for this user.</AlertDescription>
            </Alert>
        )
    }

    return (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {packages.map((pkg) => (
                <Card key={pkg.name} className="overflow-hidden transition-all hover:shadow-md">
                    <CardHeader className="p-6">
                        <div className="flex items-center justify-between">
                            <Link
                                href={pkg.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl font-semibold hover:text-primary hover:underline"
                            >
                                {pkg.name}
                            </Link>
                            <Badge variant="outline" className="bg-primary/10 text-primary">
                                v{pkg.version}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                        <p className="text-muted-foreground">{pkg.description}</p>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                        <div className="flex w-full justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Download className="h-4 w-4" />
                                <span>{pkg.downloads.toLocaleString()} downloads</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>Updated: {pkg.last_updated}</span>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
