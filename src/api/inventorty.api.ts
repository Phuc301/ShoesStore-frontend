import axios from '../utils/axiosCustomize.util';
import type { ApiResponse } from '@/interfaces/apiResponse.interface';

export interface CheckStockParams {
  sku: string;
  quantity: number;
}

export interface CheckStockResponse {
  sku: string;
  available: boolean;
  stock: number;
}

// Check product availability
export const checkStock = async (items: CheckStockParams[]): Promise<any> => {
  const response = await axios.post<ApiResponse<any>>(
    `/inventory/check-stock`,
    { items }
  );
  return response.data;
};
