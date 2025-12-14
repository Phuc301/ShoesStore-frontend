export const formatNumber = (amount: number): string => {
  return amount.toLocaleString('vi-VN', {
    maximumFractionDigits: 3
  });
};