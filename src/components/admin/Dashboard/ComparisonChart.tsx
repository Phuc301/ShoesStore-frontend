import React from 'react';

interface ComparisonChartProps {
  timeframe: string;
  
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ timeframe }) => {
  const getComparisonData = () => {
    switch (timeframe) {
      case 'weekly':
        return {
          current: [
            { period: 'Mon', revenue: 12500, orders: 45, products: 89 },
            { period: 'Tue', revenue: 14200, orders: 52, products: 98 },
            { period: 'Wed', revenue: 13100, orders: 48, products: 92 },
            { period: 'Thu', revenue: 16800, orders: 61, products: 115 },
            { period: 'Fri', revenue: 15900, orders: 58, products: 108 },
            { period: 'Sat', revenue: 19800, orders: 72, products: 134 },
            { period: 'Sun', revenue: 12700, orders: 46, products: 87 },
          ],
          previous: [
            { period: 'Mon', revenue: 11200, orders: 41, products: 82 },
            { period: 'Tue', revenue: 12800, orders: 47, products: 89 },
            { period: 'Wed', revenue: 11900, orders: 44, products: 85 },
            { period: 'Thu', revenue: 15200, orders: 56, products: 105 },
            { period: 'Fri', revenue: 14500, orders: 53, products: 98 },
            { period: 'Sat', revenue: 17900, orders: 65, products: 122 },
            { period: 'Sun', revenue: 11500, orders: 42, products: 79 },
          ],
        };
      case 'monthly':
        return {
          current: [
            { period: 'Week 1', revenue: 87500, orders: 320, products: 612 },
            { period: 'Week 2', revenue: 105200, orders: 385, products: 734 },
            { period: 'Week 3', revenue: 112800, orders: 412, products: 785 },
            { period: 'Week 4', revenue: 108900, orders: 398, products: 759 },
          ],
          previous: [
            { period: 'Week 1', revenue: 79200, orders: 289, products: 551 },
            { period: 'Week 2', revenue: 95800, orders: 351, products: 668 },
            { period: 'Week 3', revenue: 102400, orders: 374, products: 712 },
            { period: 'Week 4', revenue: 98700, orders: 361, products: 687 },
          ],
        };
      case 'quarterly':
        return {
          current: [
            { period: 'Jan', revenue: 340500, orders: 1247, products: 2378 },
            { period: 'Feb', revenue: 315800, orders: 1156, products: 2201 },
            { period: 'Mar', revenue: 379200, orders: 1389, products: 2645 },
          ],
          previous: [
            { period: 'Jan', revenue: 298700, orders: 1094, products: 2085 },
            { period: 'Feb', revenue: 287400, orders: 1052, products: 2004 },
            { period: 'Mar', revenue: 334200, orders: 1223, products: 2330 },
          ],
        };
      default: 
        return {
          current: [
            {
              period: '2021',
              revenue: 2850000,
              orders: 10450,
              products: 19890,
            },
            {
              period: '2022',
              revenue: 3240000,
              orders: 11890,
              products: 22650,
            },
            {
              period: '2023',
              revenue: 3680000,
              orders: 13520,
              products: 25780,
            },
            {
              period: '2024',
              revenue: 4150000,
              orders: 15240,
              products: 29040,
            },
          ],
          previous: [
            { period: '2020', revenue: 2450000, orders: 8970, products: 17080 },
            {
              period: '2021',
              revenue: 2850000,
              orders: 10450,
              products: 19890,
            },
            {
              period: '2022',
              revenue: 3240000,
              orders: 11890,
              products: 22650,
            },
            {
              period: '2023',
              revenue: 3680000,
              orders: 13520,
              products: 25780,
            },
          ],
        };
    }
  };

  const { current, previous } = getComparisonData();
  const maxRevenue = Math.max(
    ...current.map((d) => d.revenue),
    ...previous.map((d) => d.revenue)
  );

  return (
    <div className="space-y-6">
      {/* Revenue Comparison */}
      <div>
        <h4 className="text-md font-medium text-gray-800 mb-4">
          Revenue Comparison
        </h4>
        <div className="flex items-end justify-between h-32 space-x-1">
          {current.map((item, index) => (
            <div key={index} className="flex-1 flex items-end space-x-1">
              {/* Current Period */}
              <div className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-orange-500 rounded-t transition-all duration-300 hover:bg-orange-600"
                  style={{
                    height: `${(item.revenue / maxRevenue) * 120}px`,
                    minHeight: '4px',
                  }}
                  title={`Current: $${item.revenue.toLocaleString()}`}
                />
              </div>
              {/* Previous Period */}
              <div className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gray-400 rounded-t transition-all duration-300 hover:bg-gray-500"
                  style={{
                    height: `${(previous[index].revenue / maxRevenue) * 120}px`,
                    minHeight: '4px',
                  }}
                  title={`Previous: $${previous[
                    index
                  ].revenue.toLocaleString()}`}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          {current.map((item, index) => (
            <span key={index} className="flex-1 text-center">
              {item.period}
            </span>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Orders Comparison */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="text-sm font-medium text-gray-700 mb-3">
            Orders Growth
          </h5>
          <div className="space-y-2">
            {current.map((item, index) => {
              const growth = (
                ((item.orders - previous[index].orders) /
                  previous[index].orders) *
                100
              ).toFixed(1);
              const isPositive = parseFloat(growth) > 0;

              return (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-600">{item.period}</span>
                  <span
                    className={`font-medium ${
                      isPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {growth}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revenue Growth */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="text-sm font-medium text-gray-700 mb-3">
            Revenue Growth
          </h5>
          <div className="space-y-2">
            {current.map((item, index) => {
              const growth = (
                ((item.revenue - previous[index].revenue) /
                  previous[index].revenue) *
                100
              ).toFixed(1);
              const isPositive = parseFloat(growth) > 0;

              return (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-600">{item.period}</span>
                  <span
                    className={`font-medium ${
                      isPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {growth}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Products Growth */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="text-sm font-medium text-gray-700 mb-3">
            Products Growth
          </h5>
          <div className="space-y-2">
            {current.map((item, index) => {
              const growth = (
                ((item.products - previous[index].products) /
                  previous[index].products) *
                100
              ).toFixed(1);
              const isPositive = parseFloat(growth) > 0;

              return (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-600">{item.period}</span>
                  <span
                    className={`font-medium ${
                      isPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {growth}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span className="text-gray-600">Current Period</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-400 rounded"></div>
          <span className="text-gray-600">Previous Period</span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonChart;
