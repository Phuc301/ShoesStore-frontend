import axios from '../utils/axiosCustomize.util';
import type {
  OrderByCustomerParams,
  OrderByGuestParams,
} from '@/interfaces/order.interface';

export const createOrderByGuest = async (
  orderData: OrderByGuestParams
): Promise<any> => {
  const response = await axios.post('/order/create-by-guest', orderData);
  return response;
};

export const createOrderByCustomer = async (
  orderData: OrderByCustomerParams
): Promise<any> => {
  const response = await axios.post('/order/create', orderData);
  return response;
};

export const fetchOrder = async (): Promise<any> => {
  const response = await axios.get('/order/fetch');
  return response;
};

export const detailOrder = async (orderId: string): Promise<any> => {
  const response = await axios.get(`/order/details/${orderId}`);
  return response;
};

// fetch all order
export type FetchOrderParams = {
  page?: number;
  limit?: number;
  status?: string;
  dateFilter?: string;
  startDate?: string;
  endDate?: string;
};

export const fetchOrderAdmin = async ({
  page,
  limit,
  status,
  dateFilter,
  startDate,
  endDate,
}: FetchOrderParams = {}): Promise<any> => {
  const response = await axios.get<any>('/order/fetch-admin', {
    params: {
      ...(page !== undefined && { page }),
      ...(limit !== undefined && { limit }),
      ...(status && { status }),
      ...(dateFilter && { dateFilter }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    },
  });
  return response.data;
};

export const updateStatus = async ({
  orderId,
  newStatus,
}: {
  orderId: string;
  newStatus: string;
}) => {
  const response = await axios.put(`/order/update/${orderId}`, {
    status: newStatus,
  });

  return response.data;
};

export const fetchStatusCounts = async (): Promise<any> => {
  const response = await axios.get('/order/status-count');
  return response;
};

export const fetchSummaryDashboard = async (): Promise<any> => {
  const response = await axios.get('/order/monthly-stats');
  return response;
};

export const fetchTopSelling = async (): Promise<any> => {
  const response = await axios.get('/order/best-selling');
  return response;
};

export const fetchDailyRevenue = async ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}): Promise<any> => {
  const response = await axios.get<any>('/order/revenue', {
    params: {
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    },
  });
  return response.data;
};

// export const fetchDailyRevenue = async ({
//   startDate,
//   endDate,
// }: {
//   startDate: string;
//   endDate: string;
// }) => {
//   const response = await axios.get(`/order/revenue`, {
//     startDate,
//     endDate,
//   });

//   return response.data;
// };
