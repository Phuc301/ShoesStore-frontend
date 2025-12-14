import React from 'react';
import { Tag, Percent, Calendar } from 'lucide-react';

interface PromotionStatsProps {
  countActive?: number;
  countUsage?: number;
  countExpired?: number;
}

const PromotionStats: React.FC<PromotionStatsProps> = ({
  countActive,
  countUsage,
  countExpired,
}) => {
  const stats = [
    {
      icon: <Tag className="w-4 h-4 text-green-500" />,
      value: countActive,
      label: 'Khả dụng',
      bg: 'bg-green-50',
    },
    {
      icon: <Percent className="w-4 h-4 text-blue-500" />,
      value: countUsage,
      label: 'Tổng lượt dùng',
      bg: 'bg-blue-50',
    },
    {
      icon: <Calendar className="w-4 h-4 text-orange-500" />,
      value: countExpired,
      label: 'Đã hết hạn',
      bg: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border p-3 flex items-center gap-3"
        >
          <div className={`p-2 rounded-md ${item.bg}`}>{item.icon}</div>

          <div className="leading-tight">
            <p className="text-base font-semibold text-gray-800">
              {item.value}
            </p>
            <p className="text-xs text-gray-600">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromotionStats;
