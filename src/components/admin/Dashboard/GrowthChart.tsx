import React from "react";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

interface GrowthPoint {
  day: string;
  growth: number;
}

interface GrowthProps {
  ordersGrowth: GrowthPoint[];
  revenueGrowth: GrowthPoint[];
  productsGrowth: GrowthPoint[];
}

const GrowthChart: React.FC<GrowthProps> = ({
  ordersGrowth,
  revenueGrowth,
  productsGrowth,
}) => {
  const chartData = ordersGrowth.map((o, i) => ({
    day: o.day,
    ordersGrowth: o.growth,
    revenueGrowth: revenueGrowth[i]?.growth,
    productsGrowth: productsGrowth[i]?.growth,
  }));

  return (
    <div className="space-y-4">
      <h4 className="text-md font-semibold text-gray-800">
        Growth Overview (%)
      </h4>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="day" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="ordersGrowth"
            stroke="#f97316"
            strokeWidth={3}
            name="Orders Growth"
          />
          <Line
            type="monotone"
            dataKey="revenueGrowth"
            stroke="#3b82f6"
            strokeWidth={3}
            name="Revenue Growth"
          />
          <Line
            type="monotone"
            dataKey="productsGrowth"
            stroke="#22c55e"
            strokeWidth={3}
            name="Products Growth"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrowthChart;
