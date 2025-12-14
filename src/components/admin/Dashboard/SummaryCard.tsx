import React from 'react';
import {
  Users,
  ShoppingCart,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency.util';

interface SummaryCardProps {
  data: any;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ data }) => {
  const stats = [
    {
      title: 'Tổng số khách hàng',
      value: data.totalCustomers.current,
      change: data.totalCustomers.changePercent,
      icon: Users,
      bg: 'bg-orange-50',
      iconColor: 'text-orange-500',
    },
    {
      title: 'Khách hàng mới',
      value: data.newCustomers.current,
      change: data.newCustomers.changePercent,
      icon: Users,
      bg: 'bg-blue-50',
      iconColor: 'text-blue-500',
    },
    {
      title: 'Tổng số đơn hàng',
      value: data.orders.current,
      change: data.orders.changePercent,
      icon: ShoppingCart,
      bg: 'bg-green-50',
      iconColor: 'text-green-500',
    },
    {
      title: 'Doanh thu',
      value: formatCurrency(data.revenue.current),
      change: data.revenue.changePercent,
      icon: DollarSign,
      bg: 'bg-purple-50',
      iconColor: 'text-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        const isPositive = item.change >= 0;

        return (
          <div
            key={idx}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              {/* LEFT TEXT */}
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {item.title}
                </p>

                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {item.value}
                </p>

                {/* CHANGE LINE */}
                <div
                  className={`flex items-center mt-1 text-sm whitespace-nowrap ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {isPositive ? (
                    <ArrowUpRight className="w-4 h-4 flex-shrink-0 " />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 flex-shrink-0 " />
                  )}

                  <span className="font-semibold flex-shrink-0 mr-1">
                    {isPositive ? `+${item.change}%` : `${item.change}%`}
                  </span>

                  {/* TEXT ALWAYS SAME LINE */}
                  <span className="text-gray-600 flex-shrink-0">
                    so với tháng trước
                  </span>
                </div>
              </div>

              {/* RIGHT ICON */}
              <div className={`p-3 rounded-full ${item.bg}`}>
                <Icon className={`w-6 h-6 ${item.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCard;
