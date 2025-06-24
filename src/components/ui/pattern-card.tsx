"use client";

import React from "react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Download, CheckCircle, GitFork } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PatternCardProps {
  name: string;
  author: {
    name: string;
    avatar: string;
  };
  frameworks: string[];
  metrics: {
    latency: string;
    cost: string;
    successRate: string;
  };
  downloads: number;
  isVerified?: boolean;
  className?: string;
}

export function PatternCard({
  name,
  author,
  frameworks,
  metrics,
  downloads,
  isVerified = false,
  className,
}: PatternCardProps) {
  return (
    <div
      className={cn(
        "border border-border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow duration-200",
        className,
      )}
    >
      <div className="p-5">
        <div className="flex items-start justify-between">
          {/* Pattern name and verified badge */}
          <h3 className="text-lg font-semibold flex items-center gap-1.5">
            {name}
            {isVerified && (
              <CheckCircle className="h-4 w-4 text-secondary shrink-0" />
            )}
          </h3>

          {/* Downloads */}
          <div className="flex items-center text-xs text-muted-foreground">
            <Download className="mr-1.5 h-3 w-3" />
            <span>{downloads.toLocaleString()}</span>
          </div>
        </div>

        {/* Author info with hover card */}
        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="flex items-center mt-2 text-sm">
              <Avatar className="h-5 w-5 mr-1.5">
                <AvatarImage src={author.avatar} alt={author.name} />
                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-muted-foreground hover:text-foreground transition-colors">
                {author.name}
              </span>
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="w-64">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src={author.avatar} />
                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">{author.name}</h4>
                <p className="text-xs text-muted-foreground">
                  Pattern architect and contributor
                </p>
                <div className="flex items-center pt-1">
                  <span className="text-xs text-muted-foreground">
                    12 patterns uploaded • 4.8k downloads
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>

        {/* Framework badges */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {frameworks.map((framework) => (
            <Badge
              key={framework}
              variant="outline"
              className="text-xs px-2 py-0 h-5"
            >
              {framework}
            </Badge>
          ))}
        </div>

        {/* Performance metrics */}
        <div className="mt-4 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Latency:</span>
            <span className="font-mono">{metrics.latency}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Cost:</span>
            <span className="font-mono">{metrics.cost}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Success Rate:</span>
            <span className="font-mono">{metrics.successRate}</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="border-t border-border p-3 bg-muted/20 flex justify-between">
        <Button variant="ghost" size="sm" className="text-xs h-8 px-2.5">
          <GitFork className="mr-1.5 h-3.5 w-3.5" />
          Fork
        </Button>
        <Button variant="secondary" size="sm" className="text-xs h-8 px-2.5">
          <Download className="mr-1.5 h-3.5 w-3.5" />
          Download
        </Button>
      </div>
    </div>
  );
}
