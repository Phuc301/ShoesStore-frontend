import React from "react";

interface DataPoint {
  label: string;
  revenue: number;
  profit: number;
  orders: number;
}

interface ComparisonProps {
  current: DataPoint[];
  previous: DataPoint[];
}

const ComparisonChart: React.FC<ComparisonProps> = ({ current, previous }) => {
  const maxRevenue = Math.max(
    ...current.map((d) => d.revenue),
    ...previous.map((d) => d.revenue)
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <h4 className="text-md font-semibold text-gray-800">
        Revenue Comparison: Current vs Previous
      </h4>

      {/* Chart */}
      <div className="flex items-end justify-between h-36 space-x-1">
        {current.map((item, index) => (
          <div key={index} className="flex-1 flex items-end space-x-1">
            {/* Current */}
            <div className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-orange-500 rounded-t hover:bg-orange-600 transition"
                style={{
                  height: `${(item.revenue / maxRevenue) * 120}px`,
                  minHeight: "4px",
                }}
                title={`Current: $${item.revenue.toLocaleString()}`}
              />
            </div>

            {/* Previous */}
            <div className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gray-400 rounded-t hover:bg-gray-500 transition"
                style={{
                  height: `${
                    (previous[index].revenue / maxRevenue) * 120
                  }px`,
                  minHeight: "4px",
                }}
                title={`Previous: $${previous[index].revenue.toLocaleString()}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        {current.map((item, index) => (
          <span key={index} className="flex-1 text-center">
            {item.label}
          </span>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 text-sm mt-3">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span className="text-gray-600">Current</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-400 rounded"></div>
          <span className="text-gray-600">Previous</span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonChart;
