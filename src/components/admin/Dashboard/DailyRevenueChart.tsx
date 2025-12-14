import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { formatCurrency } from '@/utils/formatCurrency.util';
import { formatNumber } from '@/utils/formatNumber.util';

interface DailyRevenueProps {
  data: any[];
}

function formatDateToDDMM(dateStr: string) {
  const [year, month, day] = dateStr.split('-');
  return `${day.padStart(2, '0')}/${month.padStart(2, '0')}`;
}

const DailyRevenueChart: React.FC<DailyRevenueProps> = ({ data }) => {
  const formattedData = data.map((item) => ({
    ...item,
    dateLabel: formatDateToDDMM(item.date),
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart
        data={formattedData}
        margin={{ top: 10, right: 20, left: 25, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="dateLabel" stroke="#666" />
        <YAxis tickFormatter={(v) => v.toLocaleString('vi-VN')} />

        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-white shadow-md border border-gray-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-800">{label}</p>
                  <p className="text-orange-600 font-semibold mt-1">
                    Doanh thu: {formatCurrency(payload[0].value)}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />

        <Line
          type="monotone"
          dataKey="totalRevenue"
          stroke="#f97316"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DailyRevenueChart;
