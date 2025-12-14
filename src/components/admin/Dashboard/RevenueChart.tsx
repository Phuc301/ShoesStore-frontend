import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const mockData = {
  weekly: [
    { label: "Mon", value: 4200 },
    { label: "Tue", value: 3900 },
    { label: "Wed", value: 4500 },
    { label: "Thu", value: 4700 },
    { label: "Fri", value: 5100 },
    { label: "Sat", value: 6100 },
    { label: "Sun", value: 5600 },
  ],
  monthly: [
    { label: "Week 1", value: 18120 },
    { label: "Week 2", value: 19480 },
    { label: "Week 3", value: 18290 },
    { label: "Week 4", value: 18030 },
  ],
  quarterly: [
    { label: "Jan", value: 73920 },
    { label: "Feb", value: 81200 },
    { label: "Mar", value: 69000 },
  ],
  annually: [
    { label: "Q1", value: 182140 },
    { label: "Q2", value: 209770 },
    { label: "Q3", value: 241930 },
    { label: "Q4", value: 260480 },
  ],
};

const RevenueChart = ({ timeframe }: { timeframe: string }) => {
  const data = mockData[timeframe as keyof typeof mockData];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid vertical={false} stroke="#eee" />
        <XAxis dataKey="label" stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip />
        <Bar dataKey="value" fill="#f97316" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;
