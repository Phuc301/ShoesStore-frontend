import React from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

const mockData = {
  monthly: [
    { label: "Week 1", orders: 294 },
    { label: "Week 2", orders: 302 },
    { label: "Week 3", orders: 286 },
    { label: "Week 4", orders: 294 },
  ],
  weekly: [
    { label: "Mon", orders: 42 },
    { label: "Tue", orders: 39 },
    { label: "Wed", orders: 44 },
    { label: "Thu", orders: 41 },
    { label: "Fri", orders: 56 },
    { label: "Sat", orders: 61 },
    { label: "Sun", orders: 51 },
  ],

  quarterly: [
    { label: "Month 1", orders: 42 },
    { label: "Month 2", orders: 39 },
    { label: "Month 3", orders: 44 },
  ],

  annually: [
    { label: "Q1", orders: 42 },
    { label: "Q2", orders: 39 },
    { label: "Q3", orders: 44 },
    { label: "Q4", orders: 41 },
  ],
};

const OrdersChart = ({ timeframe }: { timeframe: string }) => {
  const data = mockData[timeframe as keyof typeof mockData] || mockData.monthly;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid stroke="#eee" />
        <XAxis dataKey="label" stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip />
        <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default OrdersChart;
