export interface User {
  id: string;
  username: string;
  phoneNumber: string;
  email: string;
  passwordHash: string;
  avatarUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
  refreshTokens: string[];
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: any | null;
  error: string | null;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  email: string;
  password: string;
  fullName: string;
}

export interface LogoutParams {
  accessToken: string;
  refreshToken: string;
}

export interface UpdateProfileParams {
  fullName?: string;
  avatarUrl?: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
}

export interface ChangePasswordParams {
  oldPassword: string;
  newPassword: string;
}

export interface AddressParams {
  fullName: string;
  phone: string;
  detailAddress: string;
  street: string;
  province: string;
  district: string;
  ward: string;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  isDefault?: boolean;
  type: string;
}

export interface Address {
  addressId: number;
  type: 'home' | 'office';
  fullName: string;
  phone: string;
  street: string;
  detailAddress: string;
  province: string;
  provinceCode: string;
  district: string;
  districtCode: string;
  ward: string;
  wardCode: string;
  isDefault: boolean;
}

export interface GuestInfo {
  email: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
}

export interface Option {
  label: string;
  value: string;
}

export interface GuestInfoFormRef {
  validate: () => boolean;
  data: GuestInfo;
}

export interface AddressInfoFormRef {
  validate: () => boolean;
  data: Partial<Address>;
}
