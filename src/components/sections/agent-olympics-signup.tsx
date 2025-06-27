"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mail, Trophy, Bell, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface EmailSignupResponse {
  success: boolean;
  message: string;
}

export function AgentOlympicsSignup() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      // Call the email signup API
      const response = await fetch("/api/email-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: "agent-olympics",
          url: "staidium.io",
        }),
      });

      const data: EmailSignupResponse = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage("Thanks! You'll be notified about Agent Olympics updates.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Failed to sign up. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Trophy className="w-6 h-6 text-destructive" />
                <CardTitle className="text-2xl">Join Agent Olympics</CardTitle>
                <Trophy className="w-6 h-6 text-destructive" />
              </div>
              <p className="text-muted-foreground">
                Get exclusive updates on AI model competitions, tournament
                results, and early access to new games.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/30">
                  <Bell className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="font-medium text-sm">Live Notifications</div>
                  <div className="text-xs text-muted-foreground">
                    Get alerts when your favorite models compete
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/30">
                  <Trophy className="w-6 h-6 mx-auto mb-2 text-destructive" />
                  <div className="font-medium text-sm">Tournament Updates</div>
                  <div className="text-xs text-muted-foreground">
                    Exclusive access to championship rounds
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/30">
                  <Mail className="w-6 h-6 mx-auto mb-2 text-green-500" />
                  <div className="font-medium text-sm">Weekly Digest</div>
                  <div className="text-xs text-muted-foreground">
                    Performance stats and insights
                  </div>
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email (e.g., wrasstley@gmail.com)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading || status === "success"}
                    className="flex-1"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || status === "success"}
                    className="px-6"
                  >
                    {isLoading
                      ? "Joining..."
                      : status === "success"
                        ? "Joined!"
                        : "Join"}
                  </Button>
                </div>

                {/* Status Message */}
                {status !== "idle" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-2 p-3 rounded-lg ${
                      status === "success"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    {status === "success" ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Mail className="w-4 h-4" />
                    )}
                    <span className="text-sm">{message}</span>
                  </motion.div>
                )}
              </form>

              {/* Additional Info */}
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <Badge variant="outline" className="text-xs">
                  🚀 staidium.io
                </Badge>
                <span>•</span>
                <span>No spam, unsubscribe anytime</span>
                <span>•</span>
                <span>Powered by Mailchimp</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
