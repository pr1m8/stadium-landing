"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmailSignupProps {
  className?: string;
  variant?: "inline" | "card";
  title?: string;
  description?: string;
}

export default function EmailSignup({
  className,
  variant = "inline",
  title = "Stay Updated",
  description = "Get notified about new competitions, patterns, and platform updates.",
}: EmailSignupProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Basic email validation
      if (!email || !email.includes("@")) {
        throw new Error("Please enter a valid email address");
      }

      // TODO: Replace with actual API call to Supabase/Mailchimp
      const response = await fetch("/api/email-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe. Please try again.");
      }

      setIsSubmitted(true);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 text-secondary p-4 rounded-lg bg-secondary/10 border border-secondary/20",
          className
        )}
      >
        <CheckCircle className="h-5 w-5" />
        <span className="font-medium">Thanks for subscribing!</span>
      </div>
    );
  }

  const content = (
    <>
      <div className={variant === "card" ? "text-center mb-6" : "mb-4"}>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              disabled={isSubmitting}
            />
          </div>
          <Button type="submit" disabled={isSubmitting || !email.trim()}>
            {isSubmitting ? "..." : "Subscribe"}
          </Button>
        </div>
        {error && <p className="text-destructive text-sm">{error}</p>}
      </form>

      <p className="text-xs text-muted-foreground mt-3">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </>
  );

  if (variant === "card") {
    return (
      <div
        className={cn(
          "bg-background border border-border rounded-lg p-6 shadow-sm",
          className
        )}
      >
        {content}
      </div>
    );
  }

  return <div className={cn("space-y-4", className)}>{content}</div>;
}