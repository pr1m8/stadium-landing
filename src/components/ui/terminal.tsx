"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface TerminalProps {
  className?: string;
  lines?: string[];
  command?: string;
  commandDelay?: number;
  lineDelay?: number;
  prompt?: string;
  showCursor?: boolean;
  autoStart?: boolean;
  title?: string;
  variant?: "default" | "minimal";
}

export const Terminal: React.FC<TerminalProps> = ({
  className,
  lines = [],
  command = "",
  commandDelay = 100,
  lineDelay = 1000,
  prompt = "$",
  showCursor = true,
  autoStart = true,
  title = "Terminal",
  variant = "default",
}) => {
  const [displayedCommand, setDisplayedCommand] = useState("");
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [showCommand, setShowCommand] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [commandDone, setCommandDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to simulate typing
  useEffect(() => {
    if (!autoStart || !command) return;

    const timeout = setTimeout(() => {
      setShowCommand(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, [autoStart, command]);

  // Type command character by character
  useEffect(() => {
    if (!showCommand || !command) return;

    setIsTyping(true);
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= command.length) {
        setDisplayedCommand(command.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        setCommandDone(true);
      }
    }, commandDelay);

    return () => clearInterval(typingInterval);
  }, [command, commandDelay, showCommand]);

  // Display lines after command is typed
  useEffect(() => {
    if (!commandDone || lines.length === 0) return;

    let lineIndex = 0;

    const lineInterval = setInterval(() => {
      if (lineIndex < lines.length) {
        setVisibleLines((prev) => [...prev, lines[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(lineInterval);
      }
    }, lineDelay);

    return () => clearInterval(lineInterval);
  }, [commandDone, lineDelay, lines]);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedCommand, visibleLines]);

  const renderCursor = () => {
    if (!showCursor || !isTyping) return null;

    return (
      <span className="inline-block w-2 h-4 bg-primary animate-blink ml-0.5" />
    );
  };

  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden",
        variant === "default" ? "border border-border shadow-md" : "",
        className,
      )}
    >
      {variant === "default" && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted/40 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-destructive opacity-70"></div>
            <div className="h-3 w-3 rounded-full bg-primary/80 opacity-70"></div>
            <div className="h-3 w-3 rounded-full bg-secondary/80 opacity-70"></div>
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            {title}
          </div>
          <div className="w-16"></div> {/* Spacer for balance */}
        </div>
      )}

      <div
        ref={containerRef}
        className={cn(
          "font-mono text-sm p-4 bg-black text-gray-200 max-h-96 overflow-auto",
          variant === "minimal" ? "rounded-lg" : "",
        )}
      >
        {showCommand && (
          <div className="flex">
            <span className="text-green-400 mr-2">{prompt}</span>
            <span>{displayedCommand}</span>
            {renderCursor()}
          </div>
        )}

        <AnimatePresence>
          {visibleLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1"
            >
              {line}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
