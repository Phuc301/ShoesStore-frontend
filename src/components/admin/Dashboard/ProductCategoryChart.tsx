import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Props {
  data: { label: string; value: number }[];
}

const generateColor = (index: number, total: number) => {
  const hue = (index * (360 / total)) % 360; 
  return `hsl(${hue}, 70%, 55%)`;
};

const ProductCategoryChart: React.FC<Props> = ({ data }) => {
  const dynamicColors = data.map((_, i) => generateColor(i, data.length));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={(value) => (
            <span className="text-sm text-gray-700">{value}</span>
          )}
        />

        <Pie
          data={data}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="45%"
          outerRadius={110}
          label
        >
          {data.map((entry, idx) => (
            <Cell key={idx} fill={dynamicColors[idx]} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ProductCategoryChart;
