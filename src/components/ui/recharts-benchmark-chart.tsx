"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ChartTooltipContent } from "./chart";

// Initial data
const initialData = [
  {
    name: "Latency",
    langGraph: 3.2,
    crewAI: 4.1,
    autoGen: 2.8,
    llamaIndex: 3.7,
  },
  {
    name: "Cost/1K",
    langGraph: 0.08,
    crewAI: 0.12,
    autoGen: 0.07,
    llamaIndex: 0.09,
  },
  {
    name: "Success Rate",
    langGraph: 0.92,
    crewAI: 0.89,
    autoGen: 0.94,
    llamaIndex: 0.91,
  },
];

// Function to animate data changes
function animateData(data: typeof initialData, iterations = 20) {
  return Array.from({ length: iterations }).map((_, i) => {
    return data.map((item) => ({
      ...item,
      langGraph:
        item.name === "Latency"
          ? parseFloat(
              (item.langGraph + (Math.random() * 0.4 - 0.2)).toFixed(1),
            )
          : item.name === "Cost/1K"
            ? parseFloat(
                (item.langGraph + (Math.random() * 0.03 - 0.015)).toFixed(2),
              )
            : parseFloat(
                (item.langGraph + (Math.random() * 0.04 - 0.02)).toFixed(2),
              ),
      crewAI:
        item.name === "Latency"
          ? parseFloat((item.crewAI + (Math.random() * 0.5 - 0.25)).toFixed(1))
          : item.name === "Cost/1K"
            ? parseFloat(
                (item.crewAI + (Math.random() * 0.04 - 0.02)).toFixed(2),
              )
            : parseFloat(
                (item.crewAI + (Math.random() * 0.05 - 0.025)).toFixed(2),
              ),
      autoGen:
        item.name === "Latency"
          ? parseFloat((item.autoGen + (Math.random() * 0.3 - 0.15)).toFixed(1))
          : item.name === "Cost/1K"
            ? parseFloat(
                (item.autoGen + (Math.random() * 0.02 - 0.01)).toFixed(2),
              )
            : parseFloat(
                (item.autoGen + (Math.random() * 0.03 - 0.015)).toFixed(2),
              ),
      llamaIndex:
        item.name === "Latency"
          ? parseFloat(
              (item.llamaIndex + (Math.random() * 0.4 - 0.2)).toFixed(1),
            )
          : item.name === "Cost/1K"
            ? parseFloat(
                (item.llamaIndex + (Math.random() * 0.03 - 0.015)).toFixed(2),
              )
            : parseFloat(
                (item.llamaIndex + (Math.random() * 0.04 - 0.02)).toFixed(2),
              ),
    }));
  });
}

export default function RechartsBenchmarkChart() {
  const [dataIndex, setDataIndex] = useState(0);
  const [allData, setAllData] = useState<(typeof initialData)[]>([initialData]);

  useEffect(() => {
    // Generate animated data on mount
    setAllData(animateData(initialData));

    // Set up interval to cycle through data
    const interval = setInterval(() => {
      setDataIndex((prev) => (prev + 1) % allData.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [allData.length]);

  const formatTooltipValue = (value: number, name: string) => {
    if (name === "Success Rate") {
      return `${(value * 100).toFixed(0)}%`;
    } else if (name === "Cost/1K") {
      return `$${value.toFixed(2)}`;
    } else {
      return `${value.toFixed(1)}s`;
    }
  };

  const currentData = allData[dataIndex] || initialData;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={currentData}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
        barGap={4}
        barSize={16}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={true}
          vertical={false}
        />
        <XAxis type="number" tickFormatter={(value) => value.toString()} />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 12 }}
          width={90}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;

            return (
              <div className="bg-background border border-border rounded-md p-3 shadow-md">
                <p className="font-medium mb-1">{payload[0]?.payload.name}</p>
                {payload.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: p.color }}
                    />
                    <span>{p.name}: </span>
                    <span className="font-medium">
                      {formatTooltipValue(
                        p.value as number,
                        payload[0]?.payload.name as string,
                      )}
                    </span>
                  </div>
                ))}
              </div>
            );
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          iconSize={8}
        />
        <Bar
          dataKey="langGraph"
          fill="var(--color-langGraph)"
          name="LangGraph"
          radius={[0, 4, 4, 0]}
        />
        <Bar
          dataKey="crewAI"
          fill="var(--color-crewAI)"
          name="CrewAI"
          radius={[0, 4, 4, 0]}
        />
        <Bar
          dataKey="autoGen"
          fill="var(--color-autoGen)"
          name="AutoGen"
          radius={[0, 4, 4, 0]}
        />
        <Bar
          dataKey="llamaIndex"
          fill="var(--color-llamaIndex)"
          name="LlamaIndex"
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
