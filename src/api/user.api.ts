import type {
  AddressParams,
  AuthResponse,
  ChangePasswordParams,
  LoginParams,
  LogoutParams,
  RegisterParams,
} from '@/interfaces/auth.interface';
import axios from '../utils/axiosCustomize.util';

// Login
export const login = async (params: LoginParams): Promise<any> => {
  const response = await axios.post<AuthResponse>('/auth/login', params);
  return response;
};
// Register
export const register = async (params: RegisterParams): Promise<any> => {
  const response = await axios.post<AuthResponse>('/auth/register', params);
  return response;
};
// Logout
export const logout = async (params: LogoutParams): Promise<any> => {
  const response = await axios.post<AuthResponse>('/auth/logout', params);
  return response;
};
// Update user profile
export const updateProfile = async (params: any): Promise<any> => {
  const response = await axios.put<AuthResponse>('/users/update', params);
  return response;
};

// Change password
export const changePassword = async (
  params: ChangePasswordParams
): Promise<any> => {
  const response = await axios.post<AuthResponse>(
    '/auth/change-password',
    params
  );
  return response;
};

// Set password for social login users
export const setPasswordForSocialLogin = async (params: {
  newPassword: string;
}): Promise<any> => {
  const response = await axios.post<AuthResponse>(
    '/auth/set-password-social-login',
    params
  );
  return response;
};
// Send reset password email
export const sendResetPasswordEmail = async (email: string): Promise<any> => {
  const response = await axios.post('/auth/send-email-reset-password', {
    email,
  });
  return response;
};
// Reset password
export const resetPassword = async (
  email: string,
  newPassword: string
): Promise<any> => {
  const response = await axios.post('/auth/reset-password', {
    email,
    newPassword,
  });
  return response;
};
// Verify OTP
export const verifyCode = async (otp: string, type: string): Promise<any> => {
  const response = await axios.get('/codes/verify', {
    params: { code: otp, type },
  });
  return response;
};
// Get user's address
export const getAddress = async (): Promise<any> => {
  const response = await axios.get('/addresses/list');
  return response;
};
// Get user's address by email
export const getAddressByEmail = async (email: string): Promise<any> => {
  const response = await axios.get(`/addresses/list-by-email/${email}`);
  return response;
};
// Add new address for user
export const addNewAddress = async (params: AddressParams): Promise<any> => {
  const response = await axios.post('/addresses/create', params);
  return response;
};
// Update user's address
export const updateAddress = async (
  addressId: number,
  params: AddressParams
): Promise<any> => {
  const response = await axios.put(`/addresses/update/${addressId}`, params);
  return response;
};
// Set default address
export const setDefaultAddress = async (addressId: number): Promise<any> => {
  const response = await axios.patch(`/addresses/set-default/${addressId}`);
  return response;
};
// Delete user's address
export const deleteAddress = async (addressId: number): Promise<any> => {
  const response = await axios.delete(`/addresses/delete/${addressId}`);
  return response;
};

// Fetch user profile
export const fetchUserById = async (userId: string): Promise<any> => {
  const response = await axios.get(`/users/user-details/${userId}`);
  return response;
};

// Fetch all user
export const fetchUsers = async ({
  page = 1,
  limit = 10,
  isActive,
}: {
  page?: number;
  limit?: number;
  isActive?: boolean;
} = {}): Promise<any> => {
  const response = await axios.get('/users/all', {
    params: {
      page,
      limit,
      ...(isActive !== undefined && { isActive }),
    },
  });
  return response.data;
};

// Get user detail
export const fetchUserDetails = async (userId: number): Promise<any> => {
  const response = await axios.get(`/users/user-details/${userId}`);
  return response.data.data;
};

// Unactive user
export const deleteUser = async (userId: number): Promise<any> => {
  const response = await axios.delete(`/users/delete/${userId}`);
  return response.data;
};

// Update user
export const updateProfileUserByAdmin = async (userId: number, data: any) => {
  try {
    const response = await axios.put(`/users/update-by-admin/${userId}`, data);
    return response.data; 
  } catch (error: any) {
    throw error.response?.data || { message: "Update failed" };
  }
};

