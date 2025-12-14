import type { Category } from './category.interface';

interface Product {
  productId: number;
  name: string;
  title?: string;
  brand: string;
  categoryId: number;
  description: string;
  basePrice: number;
  slug?: string;
  imageProduct: string;
  averageRating?: number;
  totalReviews?: number;
  attributes?: Record<string, any>;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  variants: ColorVariant[];
  Category?: Category;
}

interface ColorVariant {
  color: string;
  images: string[];
  sku?: string;
  price?: number;
  stock?: number;
  sizes: SizeVariant[];
}

interface SizeVariant {
  size: string;
  sku?: string;
  price: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductImage {
  id: number;
  url: string;
  alt: string;
  color?: string;
}

export interface ProductGalleryProps {
  images: ProductImage[];
  selectedColor?: string;
}

export interface Color {
  name: string;
  value: string;
  available: boolean;
}

export interface Size {
  value: string;
  available: boolean;
}
export interface ProductInforDetail {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  reivewByGuest: number;
  reivewByUser: number;
  description: string;
  colors: Color[];
  sizes: Size[];
  sku: string;
  badges?: string[];
}
export interface ProductInfoProps {
  product: ProductInforDetail;
  selectedColor: string;
  selectedSize: string;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
}

export interface ProductDetail {
  productId: number;
  name: string;
  title?: string;
  brand: string;
  categoryId: number;
  description: string;
  basePrice: number;
  slug: string;
  imageProduct: string;
  averageRating: number;
  attributes?: Record<string, any>;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  variants?: ColorVariant[];
  Category?: Category;
  reviewStats: ReviewStats;
}
export interface ReviewStats {
  totalReviews: number;
  ratingDistribution: { _id: number; count: number }[];
  byUserType: { [key: string]: number };
  averageRating: number;
}

export type { Product, ColorVariant, SizeVariant };
