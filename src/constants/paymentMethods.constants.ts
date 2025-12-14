import { Truck, Wallet } from 'lucide-react';

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'cod',
    name: 'Thanh toán khi nhận hàng (COD)',
    description: 'Thanh toán khi bạn nhận được đơn hàng',
    icon: Truck,
    color: 'text-green-500',
  },
  {
    id: 'vnpay',
    name: 'Ví điện tử',
    description: 'VNPay',
    icon: Wallet,
    color: 'text-purple-500',
  },
];
