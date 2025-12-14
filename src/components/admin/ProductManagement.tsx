import React, { useEffect, useState } from 'react';
import Header from './ProductManagement/Header';
import SearchAndFilter from './ProductManagement/SearchAndFilter';
import ProductsTable from './ProductManagement/ProductTable';
import Pagination from './Pagination';
import ProductModal from './ProductManagement/ProductModal';
import DeletedProductsModal from './ProductManagement/DeletedProductsModal';
import ProductDetailModal from './ProductManagement/ProductDetailModal';
import type { Product } from '../../interfaces/admin/ProductManagement/product.interface';
import type { Category } from '../../interfaces/admin/ProductManagement/category.interface';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  toggleStatus,
} from '../../api/product.api';
import { fetchCategories } from '../../api/category.api';
import Toast from '../common/Toast';
import Loading from '../common/Loading';
import { uploadImageProduct, uploadProductVariants } from '@/api';

const ProductManagement: React.FC = () => {
  //main states
  const [products, setProducts] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  //Editing states
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  //Search and filter states
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('Tất cả danh mục');
  const [selectedBrand, setBrand] = useState('Tất cả thương hiệu');
  const [sortBy, setSortBy] = useState(0);
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [color, setColor] = useState('');
  const [stockStatus, setStockStatus] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(6);

  //mocklist
  const [availableColors] = useState([
    'Black',
    'White',
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Brown',
    'Gray',
    'Navy',
  ]);
  const [availableBrands] = useState([
    'Nike',
    'Adidas',
    'Puma',
    'Vans',
    'Under Armour',
    'New Balance',
    'Reebok',
    'ASICS',
    'Converse',
    'Skechers',
    'Balenciaga',
    'Gucci',
    'Prada',
    'Anti-slip',
    
  ]);

  const loadProducts = async () => {
    try {
      // setLoading(true);
      const params = {
        page: currentPage,
        limit,
        minPrice,
        maxPrice,
        sortBy,
        brand:
          selectedBrand !== 'Tất cả thương hiệu' ? selectedBrand : undefined,
        search: debouncedSearch || undefined,
        category:
          selectedCategory !== 'Tất cả danh mục'
            ? selectedCategory.toLowerCase()
            : 'Tất cả danh mục',
        isDeleted: 'false',
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

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      const categories = data.data || data;

      const allCategories = [
        { categoryId: 0 as any, name: 'Tất cả danh mục' },
        ...categories,
      ];

      const map: Record<number, string> = {};
      categories.forEach((c: Category) => {
        map[Number(c.categoryId)] = c.name;
      });

      setCategoriesList(allCategories);
      setCategoryMap(map);

    } catch (err: any) {
      setError(err.message || 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    debouncedSearch,
    selectedCategory,
    limit,
    minPrice,
    maxPrice,
    sortBy,
    selectedBrand,
  ]);

  useEffect(() => {
    loadProducts();
  }, [
    debouncedSearch,
    selectedCategory,
    currentPage,
    limit,
    minPrice,
    maxPrice,
    sortBy,
    selectedBrand,
  ]);

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleOpenDeletedModal = () => setIsDeletedModalOpen(true);
  const handleCloseDeletedModal = () => setIsDeletedModalOpen(false);

  interface VariantFile {
    color: string;
    imageFiles: File[];
    imageRemoved?: string[];
  }

  const variantFormDataBuilder = (
    editingProduct: Product,
    variantFiles: VariantFile[]
  ): FormData | null => {
    const formData = new FormData();
    formData.append('uploadType', 'variants');
    formData.append('productId', editingProduct.productId.toString());
    let hasChange = false;
    const globalToDeleteSet = new Set<string>();
    const normalizeUrl = (u: string) => (u ? u.toString().trim() : '');
    const getFilenameFromUrl = (u: string) => {
      try {
        const parsed = new URL(u);
        const parts = parsed.pathname.split('/');
        return parts[parts.length - 1];
      } catch {
        const parts = u.split('/');
        return parts[parts.length - 1] || u;
      }
    };

    for (const variant of editingProduct.variants) {
      const match = variantFiles.find(
        (vf) =>
          vf.color?.toLowerCase().trim() === variant.color?.toLowerCase().trim()
      );
      if (!match) continue;
      const originalUrls = (variant.images || []).map(normalizeUrl);
      const remainingUrls = (match.imageRemoved || []).map(normalizeUrl);
      const toDeleteList = remainingUrls;
      const newFiles = (match.imageFiles || []).filter(
        (f) => f instanceof File
      );
      const originalFileNames = new Set(originalUrls.map(getFilenameFromUrl));
      const filteredNewFiles = newFiles.filter(
        (file) => !originalFileNames.has(file.name)
      );

      if (toDeleteList.length > 0 || filteredNewFiles.length > 0) {
        hasChange = true;
        toDeleteList.forEach((url) => {
          const norm = normalizeUrl(url);
          if (!globalToDeleteSet.has(norm)) {
            globalToDeleteSet.add(norm);
            formData.append('toDelete', norm);
          }
        });
        filteredNewFiles.forEach((file) => {
          formData.append(`variantFiles[${variant.sku}][]`, file);
        });
      }
    }
    return hasChange ? formData : null;
  };
  const handleSave = async (
    formData: Product,
    variantFiles: any,
    imageFileProduct?: File
  ) => {
    try {
      setLoading(true);
      if (editingProduct) {
        // Update product
        if (!formData.imageProduct) {
          setToast({
            message: 'Vui lòng chọn ảnh cho sản phẩm',
            type: 'error',
          });
          return;
        }
        // Update image product
        if (
          formData.imageProduct !== editingProduct.imageProduct &&
          imageFileProduct
        ) {
          const imgForm = new FormData();
          imgForm.append('product', imageFileProduct);
          imgForm.append('uploadType', 'product');
          imgForm.append('toDelete', editingProduct.imageProduct);
          imgForm.append('productId', editingProduct.productId.toString());
          uploadImageProduct(imgForm);
        }
        const response = await updateProduct(
          editingProduct.productId.toString(),
          formData
        );
        if (response) {
          // Update variant Urls
          const variantFormData = variantFormDataBuilder(
            editingProduct,
            variantFiles
          );
          if (variantFormData) {
            uploadProductVariants(variantFormData);
          }
        }
      } else {
        if (!imageFileProduct) {
          setToast({
            message: 'Vui lòng chọn ảnh cho sản phẩm',
            type: 'error',
          });
          return;
        }
        // Create product
        const response = await createProduct(formData);
        // Add image product
        if (response && imageFileProduct) {
          const imgForm = new FormData();
          imgForm.append('product', imageFileProduct);
          imgForm.append('uploadType', 'product');
          imgForm.append('productId', response.productId.toString());
          uploadImageProduct(imgForm);
        }
        // Add variants
        if (response) {
          const formDataVariants = new FormData();
          formDataVariants.append('uploadType', 'variants');
          formDataVariants.append('productId', response.productId.toString());
          response.variants.forEach((variant: any) => {
            const match = variantFiles.find(
              (vf: any) =>
                vf.color?.toLowerCase().trim() ===
                variant.color?.toLowerCase().trim()
            );

            if (match && match.imageFiles?.length > 0 && variant.sku) {
              match.imageFiles.forEach((file: File) => {
                formDataVariants.append(`variantFiles[${variant.sku}][]`, file);
              });
            }
          });
          uploadProductVariants(formDataVariants);
        }
      }
      setShowModal(false);
      setToast({
        message: 'Thao tác thành công',
        type: 'success',
      });
      await loadProducts();
    } catch (err: any) {
      setError(err.message || 'Failed to save product');
      setToast({
        message: 'Thao tác thất bại',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  const handleViewDetail = (product: Product) => {
    setDetailProduct(product);
    setShowDetailModal(true);
  };

  const handleToggleStatus = async (id: number) => {
    setLoading(true);
    await toggleStatus(id);
    await loadProducts();
  };

  const deleteProduct = async (id: number) => {
    try {
      await handleToggleStatus(id);
      setToast({
        message: 'Xóa sản phẩm thành công',
        type: 'success',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to toggle product status');
      setToast({
        message: 'Xóa sản phẩm thất bại',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const restoreProduct = async (id: number) => {
    try {
      await handleToggleStatus(id);
      setToast({
        message: 'Khôi phục sản phẩm thành công',
        type: 'success',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to toggle product status');
      setToast({
        message: 'Khôi phục sản phẩm thất bại',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) return <Loading show />;
  if (error)
    return <div className="text-center py-4 text-red-500">Lỗi: {error}</div>;

  return (
    <div className="relative space-y-3">
      {/* PHẦN CỐ ĐỊNH Ở TRÊN */}
      <div className="sticky top-0 z-50 bg-white shadow-sm space-y-4 px-4 py-2 rounded-xl">
        <Header
          total={totalItems}
          handleAddProduct={handleAddProduct}
          handleOpenDeleted={handleOpenDeletedModal}
        />

        <SearchAndFilter
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          sortBy={sortBy}
          categories={categoriesList}
          brands={availableBrands}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          onBrandChange={setBrand}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          onSortByChange={setSortBy}
        />

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
      </div>

      {/* DANH SÁCH SẢN PHẨM */}
      {!loading && !error && products.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          Không tìm thấy sản phẩm nào.
        </p>
      )}

      {!loading && !error && products.length > 0 && (
        <ProductsTable
          products={products}
          categoryMap={categoryMap}
          handleEditProduct={handleEditProduct}
          handleToggleStatus={deleteProduct}
          handleViewDetail={handleViewDetail}
        />
      )}

      {showModal && (
        <ProductModal
          product={editingProduct}
          categories={categoriesList}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}

      <ProductDetailModal
        open={showDetailModal}
        product={detailProduct}
        onClose={() => setShowDetailModal(false)}
      />

      {isDeletedModalOpen && (
        <DeletedProductsModal
          isOpen={isDeletedModalOpen}
          onClose={handleCloseDeletedModal}
          handleToggleStatus={restoreProduct}
        />
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <Loading show={loading} />
    </div>
  );
};

export default ProductManagement;
