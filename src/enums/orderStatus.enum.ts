export const OrderStatusEnum = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  CONFIRMED: 'confirmed',
  SHIPPING: 'shipping',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned',
  FAILED: 'failed',
} as const;

export type OrderStatusEnum =
  (typeof OrderStatusEnum)[keyof typeof OrderStatusEnum];
