export interface CartItemParams {
  productId: number;
  sku: string;
  quantity: number;
  price: number;
}
export interface CartItem {
  productId: number;
  sku: string;
  cartItemId: number;
  name: string;
  image: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}
