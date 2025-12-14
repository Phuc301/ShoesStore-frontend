import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  title: string;
  value: number;
}

const GrowthCard: React.FC<Props> = ({ title, value }) => {
  const isPositive = value >= 0;

  return (
    <div className="bg-white border rounded-lg p-4 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-xl font-bold">{value.toFixed(1)}%</p>
      </div>

      <div
        className={`p-2 rounded-full ${
          isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
        }`}
      >
        {isPositive ? (
          <TrendingUp className="w-5 h-5" />
        ) : (
          <TrendingDown className="w-5 h-5" />
        )}
      </div>
    </div>
  );
};

export default GrowthCard;
