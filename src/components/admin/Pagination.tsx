import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
  loading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showLoadMore = false,
  onLoadMore,
  loading = false,
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (showLoadMore) {
    return (
      <div className="flex justify-center mt-12">
        <button
          onClick={onLoadMore}
          disabled={loading}
          className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Đang tải...' : 'Xem thêm sản phẩm'}
        </button>
      </div>
    );
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-0">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Trước
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {getVisiblePages().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-sm font-medium text-gray-500">
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Sau
        <ChevronRight className="h-4 w-4 ml-1" />
      </button>
    </div>
  );
};

export default Pagination;
