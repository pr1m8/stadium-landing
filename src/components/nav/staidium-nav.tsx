"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme/simple-theme-switcher";

const navLinks = [
  { href: "#benchmarks", label: "Benchmarks" },
  { href: "#patterns", label: "Patterns" },
  { href: "#competitions", label: "Competitions" },
  { href: "#docs", label: "Docs" },
  { href: "#pricing", label: "Pricing" },
];

export default function StaidiumNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to change navbar style when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-black"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image 
              src="/assets/staidium-text-logo.svg" 
              alt="Staidium" 
              width={120} 
              height={40}
              className="h-8 w-auto invert"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-black hover:text-red-600 transition-colors duration-200 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button className="bg-white text-black border-2 border-black hover:bg-red-600 hover:text-white hover:border-red-600 dark:bg-black dark:text-white dark:border-white dark:hover:bg-red-600" size="sm">
            Upload Pattern
          </Button>
          <Button className="bg-black text-white hover:bg-red-600 dark:bg-white dark:text-black dark:hover:bg-red-600 dark:hover:text-white" size="sm">
            Sign In
          </Button>
          <div className="border-l border-border pl-4">
            <ThemeSwitcher />
          </div>
        </div>

        {/* Mobile Navigation Button */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeSwitcher />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-black">
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-black hover:text-red-600 py-2 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2 border-t border-border">
              <Button className="w-full bg-white text-black border-2 border-black hover:bg-red-600 hover:text-white hover:border-red-600" size="sm">
                Upload Pattern
              </Button>
              <Button className="w-full bg-black text-white hover:bg-red-600" size="sm">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
