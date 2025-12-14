import type { ApiResponse } from '../interfaces/apiResponse.interface';
import axios from '../utils/axiosCustomize.util';
import type { Product } from '../interfaces/admin/ProductManagement/product.interface';

export type FetchProductsParams = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: number;
  isDeleted?: string;
};

// Fetch all products
export const fetchProducts = async ({
  page,
  limit,
  search,
  category,
  brand,
  minPrice,
  maxPrice,
  sortBy = 0,
  isDeleted,
}: FetchProductsParams = {}): Promise<any> => {
  const response = await axios.get<any>('/product/fetch', {
    params: {
      ...(page !== undefined && { page }),
      ...(limit !== undefined && { limit }),
      ...(search && { search }),
      ...(category && { category }),
      ...(brand && { brand }),
      ...(minPrice !== undefined && { minPrice }),
      ...(maxPrice !== undefined && { maxPrice }),
      ...(sortBy !== 0 && { sortBy }),
      ...(isDeleted !== undefined && { isDeleted: String(isDeleted) }),
    },
  });
  return response.data;
};

// Fetch product by ID
export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get<ApiResponse<Product>>(
      `/product/details/${id}`
    );
    if (!response.data.success) {
      throw new Error(
        response.data.message || `Failed to fetch product with ID ${id}`
      );
    }
    if (response.data.data.length === 0) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return response.data.data[0];
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

// Fetch product by slug
export const fetchProductBySlug = async (slug: string): Promise<any> => {
  try {
    const response = await axios.get<ApiResponse<Product>>(
      `/product/details-by-slug/${slug}`
    );
    return response;
  } catch (error) {
    console.error(`Error fetching product with Slug ${slug}:`, error);
    throw error;
  }
};

// Fetch product by color SKU
export const fetchProductByColorSku = async (sku: string): Promise<Product> => {
  try {
    const response = await axios.get<ApiResponse<Product>>(
      `/product/details-by-color-sku/${sku}`
    );
    if (!response.data.success) {
      throw new Error(
        response.data.message || `Failed to fetch product with SKU ${sku}`
      );
    }
    if (response.data.data.length === 0) {
      throw new Error(`Product with SKU ${sku} not found`);
    }
    return response.data.data[0];
  } catch (error) {
    console.error(`Error fetching product with SKU ${sku}:`, error);
    throw error;
  }
};

// Create a new product
export const createProduct = async (productData: Product): Promise<any> => {
  // try {
  //   const response = await axios.post<ApiResponse<Product>>(
  //     '/product/create',
  //     productData
  //   );
  //   if (!response.data.success) {
  //     throw new Error(response.data.message || 'Failed to create product');
  //   }
  //   if (response.data.data.length === 0) {
  //     throw new Error('No product data returned');
  //   }
  //   return response.data.data[0];
  // } catch (error) {
  //   console.error('Error creating product:', error);
  //   throw error;
  // }
  const response = await axios.post<ApiResponse<Product>>(
    '/product/create',
    productData
  );
  return response.data;
};

// Update an existing product
export const updateProduct = async (
  id: string,
  productData: Partial<Product>
): Promise<any> => {
  const response = await axios.put<ApiResponse<Product>>(
    `/product/update/${id}`,
    productData
  );
  return response.data;
};

// Update product by size SKU
export const updateProductBySizeSku = async (
  sku: string,
  productData: Partial<Product>
): Promise<Product> => {
  try {
    const response = await axios.put<ApiResponse<Product>>(
      `/product/update-size/${sku}`,
      productData
    );
    if (!response.data.success) {
      throw new Error(
        response.data.message || `Failed to update product with SKU ${sku}`
      );
    }
    if (response.data.data.length === 0) {
      throw new Error(`Product with SKU ${sku} not found`);
    }
    return response.data.data[0];
  } catch (error) {
    console.error(`Error updating product with SKU ${sku}:`, error);
    throw error;
  }
};

// Toggle product status
export const toggleStatus = async (id: number): Promise<any> => {
  const response = await axios.patch<ApiResponse<Product>>(
    `/product/toggle-status/${id}`
  );
  return response;
};
