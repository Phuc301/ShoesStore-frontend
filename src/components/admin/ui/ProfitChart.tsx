import React from "react";
import { AreaChart, Area, Tooltip, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";

const mockData = {
  weekly: [
    { label: "Mon", profit: 1080 },
    { label: "Tue", profit: 980 },
    { label: "Wed", profit: 1120 },
    { label: "Thu", profit: 1200 },
    { label: "Fri", profit: 1380 },
    { label: "Sat", profit: 1620 },
    { label: "Sun", profit: 1490 },
  ],
  monthly: [
    { label: "Week 1", profit: 4920 },
    { label: "Week 2", profit: 5140 },
    { label: "Week 3", profit: 4640 },
    { label: "Week 4", profit: 4738 },
  ],
  quarterly: [
    { label: "Jan", profit: 19438 },
    { label: "Feb", profit: 20890 },
    { label: "Mar", profit: 23180 },
  ],
  annually: [
    { label: "Q1", profit: 49670 },
    { label: "Q2", profit: 55400 },
    { label: "Q3", profit: 63210 },
    { label: "Q4", profit: 68300 },
  ],
};

const ProfitChart = ({ timeframe }: { timeframe: string }) => {
  const data = mockData[timeframe as keyof typeof mockData];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <CartesianGrid stroke="#eee" />
        <XAxis dataKey="label" stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip />
        <Area type="monotone" dataKey="profit" stroke="#4ade80" fill="#bbf7d0" strokeWidth={3} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ProfitChart;
