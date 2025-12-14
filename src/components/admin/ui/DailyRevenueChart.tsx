import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { date: "10 Jan", revenue: 1820 },
  { date: "11 Jan", revenue: 2190 },
  { date: "12 Jan", revenue: 2540 },
  { date: "13 Jan", revenue: 1880 },
  { date: "14 Jan", revenue: 3020 },
  { date: "15 Jan", revenue: 2890 },
  { date: "16 Jan", revenue: 0 },
];

const DailyRevenueChart = () => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="date" stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip />
        <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DailyRevenueChart;
