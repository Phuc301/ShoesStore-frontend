import React from 'react';
import ProductRow from './ProductRow';
import type { Product } from '../../../interfaces/admin/ProductManagement/product.interface';

interface ProductsTableProps {
  products: Product[];
  categoryMap: Record<number, string>;
  handleViewDetail: (product: Product) => void;
  handleEditProduct: (product: Product) => void;
  handleToggleStatus: (id: number) => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  categoryMap,
  handleViewDetail,
  handleEditProduct,
  handleToggleStatus,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-3">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Sản phẩm
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Danh mục
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Đơn giá
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Tình trạng kho
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Đánh giá
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <ProductRow
                key={product.productId}
                product={product}
                categoryMap={categoryMap}
                handleViewDetail={handleViewDetail}
                handleEditProduct={handleEditProduct}
                handleToggleStatus={handleToggleStatus}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
