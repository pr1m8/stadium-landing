"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type CountdownTimerProps = {
  targetDate: Date;
  showLogo?: boolean;
  logoSize?: number;
};

export default function CountdownTimer({
  targetDate,
  showLogo = false,
  logoSize = 80,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Then set up interval
    const timer = setInterval(calculateTimeLeft, 1000);

    // Clean up interval
    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="space-y-6">
      {showLogo && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex justify-center"
        >
          <Image
            src="/assets/logo-clean.svg"
            alt="Staidium Logo"
            width={logoSize}
            height={logoSize}
            className="filter brightness-0 invert"
            priority
          />
        </motion.div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.7, type: "spring" }}
          >
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm rounded-2xl p-6 border border-primary/30 shadow-xl">
              <motion.div 
                className="text-5xl sm:text-6xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text text-center"
                key={unit.value}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {unit.value.toString().padStart(2, "0")}
              </motion.div>
              <div className="text-sm sm:text-base text-muted-foreground font-medium uppercase tracking-wider mt-2 text-center">
                {unit.label}
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl blur-xl -z-10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-500" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
