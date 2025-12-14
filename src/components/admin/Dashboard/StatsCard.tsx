import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative';
  icon: typeof LucideIcon;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          <p
            className={`text-sm mt-1 ${
              changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {change} from last month
          </p>
        </div>
        <div className="p-3 bg-orange-50 rounded-full">
          <Icon className="w-6 h-6 text-orange-500" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
