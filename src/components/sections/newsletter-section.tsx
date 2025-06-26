"use client";

import EmailSignup from "@/components/common/email-signup";

export default function NewsletterSection() {
  return (
    <section className="w-full py-24 bg-muted/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Join the Competition
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Stay ahead of the curve with exclusive updates on new competitions, 
              leaderboard changes, and platform features. Be the first to know when 
              new challenges drop.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <EmailSignup
              variant="card"
              title="Never Miss a Beat"
              description="Weekly updates delivered straight to your inbox."
            />
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-secondary mb-2">1000+</div>
              <div className="text-muted-foreground">Active Competitors</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary mb-2">50+</div>
              <div className="text-muted-foreground">Running Competitions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary mb-2">24/7</div>
              <div className="text-muted-foreground">Live Benchmarking</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}