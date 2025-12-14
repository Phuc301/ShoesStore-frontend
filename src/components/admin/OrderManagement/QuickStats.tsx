import React from "react";

interface QuickStatsProps {
  orders: any[];
  statusOptions: string[];
  selectedStatus: string;
  onSelectStatus: (status: string) => void;
  getStatusIcon: (status: string) => React.ReactNode;
}

const countOrdersByStatus = (orders: any[], status: string) =>
  status === "Tất cả trạng thái"
    ? orders.length
    : orders.filter(
        (o) =>
          o.status &&
          o.status.toLowerCase().trim() === status.toLowerCase().trim()
      ).length;
const statusColorMap: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Processing: "bg-blue-100 text-blue-700 border-blue-300",
  Confirmed: "bg-indigo-100 text-indigo-700 border-indigo-300",
  Shipping: "bg-purple-100 text-purple-700 border-purple-300",
  Delivered: "bg-green-100 text-green-700 border-green-300",
  Cancelled: "bg-red-100 text-red-700 border-red-300",
  Returned: "bg-orange-100 text-orange-700 border-orange-300",
  Failed: "bg-gray-200 text-gray-700 border-gray-400",
  "Tất cả trạng thái": "bg-gray-100 text-gray-700 border-gray-300",
};

const QuickStats: React.FC<QuickStatsProps> = ({
  orders,
  statusOptions,
  selectedStatus,
  onSelectStatus,
  getStatusIcon,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-2">

      {statusOptions.map((status) => {
        const isActive = selectedStatus === status;
        const count = countOrdersByStatus(orders, status);

        return (
          <button
            key={status}
            onClick={() => onSelectStatus(status)}
            className={`
              rounded-lg p-4 border flex items-center space-x-3 text-left transition
              ${isActive
                ? statusColorMap[status] + " shadow-md scale-[1.02]"
                : "bg-white border-gray-200 hover:bg-gray-50"}
            `}
          >
            {getStatusIcon(status)}

            <div>
              <p
                className={`text-2xl font-bold ${
                  isActive ? "" : "text-gray-800"
                }`}
              >
                {count}
              </p>
              <p className={`text-sm ${isActive ? "" : "text-gray-600"}`}>
                {status}
              </p>
            </div>
          </button>
        );
      })}

    </div>
  );
};

export default QuickStats;
