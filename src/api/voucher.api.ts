import axios from '../utils/axiosCustomize.util';

export const getAllVoucher = async (): Promise<any> => {
  const response = await axios.get('/voucher/all');
  return response;
};

export const getVoucherById = async (voucherId: number | string) => {
  const res = await axios.get(`/voucher/details/${voucherId}`);
  return res.data;
};

export const checkCodeValid = async (code: string): Promise<any> => {
  const response = await axios.get(`/voucher/check-code-valid`, {
    params: { code },
  });
  return response;
};

export const createVoucher = async (data: any) => {
  const res = await axios.post("/voucher/create", data);
  return res.data;
};

export const fetchVouchers = async ({
  page = 1,
  limit = 10,
  noPage = false,
  isActive,
  isShowAll = true,
}: {
  page?: number;
  limit?: number;
  noPage?: boolean;
  isActive?: boolean;
  isShowAll?: boolean;
}) => {
  const res = await axios.get("/voucher/all", {
    params: {
      page,
      limit,
      noPage,
      ...(isActive !== undefined && { isActive }),
      ...(isShowAll !== undefined && { isShowAll }),
    },
  });
  return res.data;
};

export const toggleVoucherStatus = async (
  voucherId: number | string
) => {
  const res = await axios.patch(`/voucher/toggle-status/${voucherId}`);
  return res.data;
};

export const updateVoucher = async (
  voucherId: number | string,
  data: any
) => {
  const res = await axios.put(`/voucher/update/${voucherId}`, data);
  return res.data;
};

export const fetchVoucherUsages = async (): Promise<any>  => {
  const res = await axios.get("/voucher/usages");
  return res.data;
};

