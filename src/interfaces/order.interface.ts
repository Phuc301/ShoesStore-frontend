import type { Address, AddressParams, GuestInfo } from './auth.interface';

export interface OrderByGuestParams {
  cartId: number;
  paymenMethod: string;
  orderData: Partial<IOrder>;
  items: OrderItem[];
  guestInfo: Partial<GuestInfo>;
  addressInfo: Partial<AddressParams>;
}

export interface OrderByCustomerParams {
  cartId: number;
  paymenMethod: string;
  orderData: Partial<IOrder>;
  items: OrderItem[];
}

export interface IOrder {
  addressId: number;
  userId: number;
  voucherId?: number;
  pointsUsed?: number;
  subtotal: number;
  voucherDiscount?: number;
  pointsDiscount?: number;
  tax: number;
  shippingFee: number;
  totalAmount: number;
}
export interface OrderItem {
  productId: number;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface OrderBrief {
  orderId: string;
  createdAt: string;
  status: string;
  totalAmount: number;
  itemsCount: number;
}
export interface PaymentTransaction {
  paymentTransactionId: number;
  paymentId: number;
  type: string;
  amount: number;
  status: string;
  createdAt: string;
  bankTransactionId?: string;
  providerTransactionId?: string;
}

export interface Payment {
  paymentId: number;
  orderId: string;
  method: string;
  status: string;
  amount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  transactions: PaymentTransaction[];
}
export interface OrderStatusHistory {
  orderStatusHistoryId: number;
  orderId: string;
  status: string;
  changedAt: string;
}

export interface OrderDetail {
  orderId: string;
  userId: number;
  addressId?: number;
  pointsUsed: number;
  subtotal: number;
  voucherDiscount: number;
  pointsDiscount: number;
  tax: number;
  shippingFee: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  paymentId?: number;

  items: OrderItem[];
  payment?: Payment;
  address?: Address;
  statusHistory: OrderStatusHistory[];
}
