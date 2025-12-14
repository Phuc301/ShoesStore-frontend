export interface Voucher {
  voucherId: number;
  code: string;
  discountValue: number;
  discountType: 'percentage' | 'fixed';
  maxDiscountValue?: number;
  minOrderValue?: number;
  isActive: boolean;
}
