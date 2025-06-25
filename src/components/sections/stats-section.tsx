"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "24,532",
    label: "Agent Patterns",
    trend: "+12% this month",
    color: "text-black"
  },
  {
    value: "1.2M",
    label: "Benchmarks Run",
    trend: "+45% this week",
    color: "text-red-600"
  },
  {
    value: "142",
    label: "Active Competitions",
    trend: "8 ending soon",
    color: "text-red-600"
  },
  {
    value: "89ms",
    label: "Avg. Response Time",
    trend: "-15% improvement",
    color: "text-black"
  }
];

export default function StatsSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {stat.trend}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}