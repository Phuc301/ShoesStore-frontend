import React, { useState, useEffect } from 'react';
import type { Product } from '@/interfaces/admin/ProductManagement/product.interface';
import { fetchProducts } from '@/api';
import { formatCurrency } from '@/utils/formatCurrency.util';
import { ArchiveRestoreIcon, RefreshCcw } from 'lucide-react';
import { formatDate } from '@/utils/formatDate.util';
import Pagination from '../Pagination';
import Loading from '@/components/common/Loading';

interface DeletedProductsModalProps {
  isOpen: boolean;
  handleToggleStatus: (id: number) => void;
  onClose: () => void;
}

const DeletedProductsModal: React.FC<DeletedProductsModalProps> = ({
  isOpen,
  onClose,
  handleToggleStatus,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(6);
  const [totalItems, setTotalItems] = useState(0);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value);
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit,
        isDeleted: 'true',
      };

      const data = await fetchProducts(params);
      const activeProducts = data.data;

      setProducts(activeProducts);
      setTotalItems(data.pagination.total || 0);
      setTotalPages(data.pagination.totalPages || 1);

    } catch (err: any) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setError(null);
      loadProducts();
    }
  }, [isOpen, currentPage, limit]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-overlay bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header của modal */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Sản phẩm đã xóa</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold transition-colors"
          >
            ×
          </button>
        </div>

        <div className="flex justify-between items-end px-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Hiển thị mỗi trang:</span>
            <select
              value={limit}
              onChange={handleLimitChange}
              className="border rounded-md px-2 py-1 text-sm "
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-600">
              trong tổng số {totalItems}
            </span>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>}
          {!loading && !error && products.length === 0 && (
            <p className="text-center text-gray-500">Chưa xóa sản phẩm nào.</p>
          )}
          {!loading && !error && products.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sản phẩm
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giá
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày xóa
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Khôi phục
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.productId} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(product.basePrice)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {formatDate(product.updatedAt)}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 max-w-xs truncate">
                        <button
                          onClick={() => handleToggleStatus(product.productId)}
                          className="p-1 text-gray-400 hover:text-purple-500 transition-colors"
                        >
                          <RefreshCcw className="w-4 h-4" />{' '}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Loading show={loading} />
    </div>
  );
};

export default DeletedProductsModal;
