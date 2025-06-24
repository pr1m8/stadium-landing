"use client";

import { motion } from "framer-motion";
import React, { MouseEvent as ReactMouseEvent, useState } from "react";
import { cn } from "@/lib/utils";

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#262626",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    setMouseX(clientX - left);
    setMouseY(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <div
      className={cn(
        "group/spotlight p-10 rounded-md relative border border-neutral-800 bg-black dark:border-neutral-800",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-md opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          background: isHovering ? color : "transparent",
          maskImage: isHovering
            ? `radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, white, transparent 80%)`
            : "none",
          WebkitMaskImage: isHovering
            ? `radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, white, transparent 80%)`
            : "none",
        }}
      />
      {children}
    </div>
  );
};
