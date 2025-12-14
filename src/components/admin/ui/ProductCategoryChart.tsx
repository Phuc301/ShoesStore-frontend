import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#f97316", "#0ea5e9", "#4ade80", "#a855f7", "#f43f5e"];

const data = [
  { label: "Sneakers", value: 42 },
  { label: "Sandals", value: 18 },
  { label: "Boots", value: 13 },
  { label: "Slip-ons", value: 10 },
  { label: "Running Shoes", value: 17 },
];

const ProductCategoryChart = () => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((entry, idx) => (
            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ProductCategoryChart;
