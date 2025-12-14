import React from 'react';
import { Search, Calendar } from 'lucide-react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
interface SearchAndFilterProps {
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  statusOptions: string[];
  statusCount: any;
  onSelectStatus: (status: string) => void;
  getStatusIcon: (status: string) => React.ReactNode;

  setDataFilter: (filter: string) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;

  dateFilter?: string;
  selectedStartDate?: string;
  selectedEndDate?: string;
}

const statusColorMap: Record<string, { normal: string; active: string }> = {
  Pending: {
    normal: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    active: 'bg-yellow-300 text-yellow-900 border-yellow-500 shadow-md',
  },
  Processing: {
    normal: 'bg-blue-100 text-blue-700 border-blue-200',
    active: 'bg-blue-300 text-blue-900 border-blue-500 shadow-md',
  },
  Confirmed: {
    normal: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    active: 'bg-indigo-300 text-indigo-900 border-indigo-500 shadow-md',
  },
  Shipping: {
    normal: 'bg-purple-100 text-purple-700 border-purple-200',
    active: 'bg-purple-300 text-purple-900 border-purple-500 shadow-md',
  },
  Delivered: {
    normal: 'bg-green-100 text-green-700 border-green-200',
    active: 'bg-green-300 text-green-900 border-green-500 shadow-md',
  },
  Cancelled: {
    normal: 'bg-red-100 text-red-700 border-red-200',
    active: 'bg-red-300 text-red-900 border-red-500 shadow-md',
  },
  Returned: {
    normal: 'bg-orange-100 text-orange-700 border-orange-200',
    active: 'bg-orange-300 text-orange-900 border-orange-500 shadow-md',
  },
  Failed: {
    normal: 'bg-gray-200 text-gray-700 border-gray-300',
    active: 'bg-gray-400 text-gray-900 border-gray-600 shadow-md',
  },
  'Tất cả đơn hàng': {
    normal: 'bg-gray-100 text-gray-700 border-gray-200',
    active: 'bg-gray-300 text-gray-900 border-gray-500 shadow-md',
  },
};

const mapStatusVN: Record<string, string> = {
  pending: 'Chờ xử lý',
  processing: 'Đang xử lý',
  confirmed: 'Đã xác nhận',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy',
  returned: 'Đã trả hàng',
  failed: 'Thất bại',
};

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  // searchTerm,
  // setSearchTerm,
  selectedStatus,
  statusCount,
  statusOptions,
  onSelectStatus,
  getStatusIcon,

  setDataFilter,
  setStartDate,
  setEndDate,

  dateFilter,
  selectedStartDate,
  selectedEndDate,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3 shadow-sm">
      {/* Search + Date Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-5">
        {/* FILTER WRAPPER */}
        <div className="flex flex-col gap-3">
          {/* FILTER BUTTONS */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: 'Hôm nay', value: 'today' },
              { label: 'Hôm qua', value: 'yesterday' },
              { label: 'Tuần này', value: 'thisWeek' },
              { label: 'Tháng này', value: 'thisMonth' },
              { label: 'Khoảng thời gian', value: 'range' },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setDataFilter(item.value)}
                className={`px-3 py-2 rounded-lg border text-sm transition ${
                  dateFilter === item.value
                    ? 'bg-orange-500 text-white border-orange-600'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div
              className={`${dateFilter === 'range' ? 'block' : 'hidden'} ml-4 `}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                {/* TỪ NGÀY */}
                <div className="flex-1">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <ReactDatePicker
                      selected={
                        selectedStartDate
                          ? new Date(selectedStartDate + 'T00:00:00')
                          : null
                      }
                      onChange={(date) => {
                        if (!date) return setStartDate('');
                        const formatted = date.toISOString().split('T')[0];
                        setStartDate(formatted);

                        if (
                          selectedEndDate &&
                          new Date(formatted) > new Date(selectedEndDate)
                        ) {
                          setEndDate(formatted);
                        }
                      }}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Từ ngày . . ."
                      isClearable
                      maxDate={
                        selectedEndDate
                          ? new Date(selectedEndDate + 'T00:00:00')
                          : undefined
                      }
                      className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg w-full
                       focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer"
                    />
                  </div>
                </div>

                <span>---</span>

                {/* ĐẾN NGÀY */}
                <div className="flex-1">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <ReactDatePicker
                      selected={
                        selectedEndDate
                          ? new Date(selectedEndDate + 'T00:00:00')
                          : null
                      }
                      onChange={(date) => {
                        if (!date) return setEndDate('');
                        const formatted = date.toISOString().split('T')[0];
                        setEndDate(formatted);

                        if (
                          selectedStartDate &&
                          new Date(formatted) < new Date(selectedStartDate)
                        ) {
                          setStartDate(formatted);
                        }
                      }}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Đến ngày . . ."
                      isClearable
                      minDate={
                        selectedStartDate
                          ? new Date(selectedStartDate + 'T00:00:00')
                          : undefined
                      }
                      className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg w-full
                       focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {statusOptions.map((status) => {
          const isActive = selectedStatus === status.toLowerCase();
          return (
            <button
              key={status}
              onClick={() => onSelectStatus(status.toLowerCase())}
              className={`rounded-lg px-3 py-3 border flex items-center gap-3 transition 
                hover:opacity-90 ${
                  isActive
                    ? statusColorMap[status].active
                    : statusColorMap[status].normal
                }`}
            >
              <div className="flex-shrink-0">
                {getStatusIcon(status.toLowerCase())}
              </div>

              <div className="text-left">
                <p className="text-lg font-bold leading-none">
                  {statusCount[status.toLowerCase()]}
                </p>
                <p className="text-xs opacity-90">{mapStatusVN[status.toLowerCase()] || "Tất cả đơn hàng"}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SearchAndFilter;
