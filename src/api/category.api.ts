import axios from '../utils/axiosCustomize.util';
import type { Category } from '../interfaces/admin/ProductManagement/category.interface';

interface FetchCategoryParams {
  parentId?: number | null;
  activeOnly?: boolean;
  page?: number;
  limit?: number;
  noPage?: boolean;
}

const fetchCategories = async (
  params: FetchCategoryParams = {}
): Promise<any> => {
  const response = await axios.get('/category/all', { params });
  return response.data;
};

const createCategory = async (categoryData: Category): Promise<Category> => {
  const response = await axios.post('/category/create', categoryData);
  return response.data;
};

const updateCategory = async (
  categoryId: number,
  categoryData: Category
): Promise<Category> => {
  const response = await axios.put(
    `/category/update/${categoryId}`,
    categoryData
  );
  return response.data;
};

const deleteCategory = async (categoryId: number): Promise<void> => {
  await axios.delete(`/category/toggle-status/${categoryId}`);
};

const detailsCategory = async (categoryId: number): Promise<any> => {
  const response = await axios.get(`/category/details/${categoryId}`);
  return response.data;
};

export {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  detailsCategory,
};
