"use client";

import React from "react";
import { cn } from "@/lib/utils";

type SparkleProps = {
  size: number;
  color: string;
  style: React.CSSProperties;
};

const Sparkle = ({ size, color, style }: SparkleProps) => {
  return (
    <div
      style={{
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        background: color,
        borderRadius: "50%",
        boxShadow: `0 0 ${size / 2}px ${color}`,
        animation: "sparkle 1.5s ease-in-out infinite",
        opacity: 0,
        ...style,
      }}
    />
  );
};

export const SparklesCore = ({
  id,
  className,
  background = "transparent",
  minSize = 1,
  maxSize = 3,
  particleColor = "#ffffff",
  particleDensity = 120,
}: {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleColor?: string;
  particleDensity?: number;
}) => {
  const sparkles = React.useMemo(() => {
    const numParticles = particleDensity;
    return Array.from({ length: numParticles }).map((_, i) => {
      const size = Math.random() * (maxSize - minSize) + minSize;
      return {
        id: i,
        size,
        color: particleColor,
        style: {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
        },
      };
    });
  }, [minSize, maxSize, particleColor, particleDensity]);

  return (
    <div
      id={id}
      className={cn("relative w-full h-full", className)}
      style={{ background }}
    >
      <style jsx global>{`
        @keyframes sparkle {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
      {sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.id}
          size={sparkle.size}
          color={sparkle.color}
          style={sparkle.style}
        />
      ))}
    </div>
  );
};
