import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const mockData = {
  monthly: [
    { label: "Week 1", productsSold: 610 },
    { label: "Week 2", productsSold: 650 },
    { label: "Week 3", productsSold: 595 },
    { label: "Week 4", productsSold: 620 },
  ],
  weekly: [
    { label: "Mon", productsSold: 98 },
    { label: "Tue", productsSold: 102 },
    { label: "Wed", productsSold: 110 },
    { label: "Thu", productsSold: 95 },
    { label: "Fri", productsSold: 143 },
    { label: "Sat", productsSold: 168 },
    { label: "Sun", productsSold: 149 },
  ],

  quarterly: [
    { label: "Month 1", orders: 42 },
    { label: "Month 2", orders: 39 },
    { label: "Month 3", orders: 44 },
  ],

  annually: [
    { label: "Q1", profit: 49670 },
    { label: "Q2", profit: 55400 },
    { label: "Q3", profit: 63210 },
    { label: "Q4", profit: 68300 },
  ],
};

const ProductsSoldChart = ({ timeframe }: { timeframe: string }) => {
  const data = mockData[timeframe as keyof typeof mockData];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid stroke="#eee" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="productsSold" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProductsSoldChart;
