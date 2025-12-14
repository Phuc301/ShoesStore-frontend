import { CreditCard, Wifi, Tag, AlertTriangle } from 'lucide-react';
import { type JSX } from 'react';

export type ErrorType = 'payment' | 'network' | 'voucher' | 'system';

export const ERROR_CONFIG: Record<
  ErrorType,
  { icon: JSX.Element; title: string; description: string }
> = {
  payment: {
    icon: <CreditCard className="w-6 h-6 text-red-500" />,
    title: 'Thanh toán thất bại',
    description:
      'Thẻ của bạn đã bị từ chối hoặc không đủ số dư. Vui lòng kiểm tra thông tin thẻ và thử lại.',
  },
  network: {
    icon: <Wifi className="w-6 h-6 text-red-500" />,
    title: 'Lỗi kết nối',
    description:
      'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối internet và thử lại.',
  },
  voucher: {
    icon: <Tag className="w-6 h-6 text-red-500" />,
    title: 'Mã giảm giá không hợp lệ',
    description: 'Mã giảm giá đã hết hạn hoặc không áp dụng cho đơn hàng này.',
  },
  system: {
    icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
    title: 'Lỗi hệ thống',
    description:
      'Không thể hệ thống. Vui lòng kiểm tra kết nối internet và thử lại.',
  },
};
