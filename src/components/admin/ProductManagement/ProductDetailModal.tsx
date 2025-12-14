import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { formatDate } from '@/utils/formatDate.util';
import ProductReviews from '@/components/user/product/ProductReviews';
import { fetchProductBySlug } from '@/api';
import type { ProductDetail } from '@/interfaces/admin/ProductManagement/product.interface';

interface ProductDetailModalProps {
  open: boolean;
  onClose: () => void;
  product: any | null;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  open,
  onClose,
  product,
}) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [productSlug, setProductSlug] = useState<ProductDetail | null>(null);

  const getProductDetail = async (slug: string) => {
    try {
      const res = await fetchProductBySlug(slug);
      setProductSlug(res.data);
    } catch (err) {
      console.error('Error fetching product detail:', err);
    }
  };

  useEffect(() => {
    if (product) {
      const fv = product.variants?.[0];
      setSelectedColor(fv?.color || '');
      setSelectedSize(fv?.sizes?.[0]?.size || '');
    }
  }, [product]);

  useEffect(() => {
    if (product?.slug) getProductDetail(product.slug);
  }, [product]);

  if (!open || !product) return null;

  const selectedVariant = product.variants.find(
    (v: any) => v.color === selectedColor
  );

  const selectedSku =
    selectedVariant?.sizes?.find((s: any) => s.size === selectedSize)?.sku ||
    selectedVariant?.sku ||
    'N/A';

  return (
    <div className="fixed inset-0 bg-overlay z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[92vh] overflow-y-auto p-6 animate-fadeIn">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Chi tiết sản phẩm
          </h2>
          <p className="text-sm text-gray-600">
            <strong>Ngày tạo:</strong> {formatDate(product.createdAt)}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Cập nhật:</strong> {formatDate(product.updatedAt)}
          </p>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT — GALLERY */}
          <div>
            <img
              src={selectedVariant?.images?.[0] || '/default_product_img.png'}
              alt={product.name}
              className="w-full h-80 object-cover rounded-lg border shadow-sm"
              onError={(e) =>
                (e.currentTarget.src = '/default_product_img.png')
              }
            />

            {/* Thumbnails */}
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {product.variants?.map((variant: any, idx: number) =>
                variant.images?.map((img: string, i: number) => (
                  <img
                    key={idx * 10 + i}
                    src={img}
                    className={`w-20 h-20 rounded-lg object-cover cursor-pointer border shadow-sm transition ${
                      variant.color === selectedColor
                        ? 'border-orange-500'
                        : 'border-gray-300'
                    }`}
                    onClick={() => setSelectedColor(variant.color)}
                    onError={(e) =>
                      (e.currentTarget.src = '/default_product_img.png')
                    }
                  />
                ))
              )}
            </div>
          </div>

          {/* RIGHT — INFO */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {product.name}
            </h3>
            <p className="text-gray-500 mb-4">{product.brand}</p>

            {/* PRICE */}
            <p className="text-3xl font-semibold text-orange-600 mb-8">
              {product.basePrice.toLocaleString()}₫
            </p>

            {/* COLOR SELECTION */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-600 mb-2">Màu sắc</p>
              <div className="flex gap-2 flex-wrap">
                {product.variants?.map((v: any) => (
                  <button
                    key={v.color}
                    onClick={() => {
                      setSelectedColor(v.color);
                      setSelectedSize(v.sizes?.[0]?.size || '');
                    }}
                    className={`px-3 py-1 rounded-lg border text-sm transition ${
                      selectedColor === v.color
                        ? 'border-orange-500 text-orange-600 bg-orange-50'
                        : 'border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {v.color}
                  </button>
                ))}
              </div>
            </div>

            {/* SIZE SELECTION */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-600 mb-2">Kích cỡ</p>
              <div className="flex gap-2 flex-wrap">
                {selectedVariant?.sizes?.map((s: any) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s.size)}
                    className={`px-3 py-1 rounded-lg border text-sm transition ${
                      selectedSize === s.size
                        ? 'border-orange-500 text-orange-600 bg-orange-50'
                        : 'border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>

            {/* SKU */}
            <div className="mb-8">
              <p className="text-sm font-medium text-gray-600">SKU</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {selectedSku}
              </p>
            </div>

            {/* DESCRIPTION */}
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">
                Mô tả sản phẩm
              </p>
              <p className="text-gray-700 leading-relaxed text-sm">
                {product.description || 'Không có mô tả.'}
              </p>
            </div>
          </div>

          {/* REVIEWS */}
          {productSlug && (
            <div className="col-span-2">
              <ProductReviews
                productId={productSlug.productId}
                averageRating={productSlug.reviewStats.averageRating}
                totalReviews={productSlug.reviewStats.totalReviews}
                reviewByGuest={productSlug.reviewStats.byUserType.guest}
                reviewByUser={productSlug.reviewStats.byUserType.user}
                ratingDistribution={productSlug.reviewStats.ratingDistribution}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
