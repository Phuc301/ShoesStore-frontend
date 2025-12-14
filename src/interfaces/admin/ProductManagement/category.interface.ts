export interface Category {
  categoryId: number;
  name: string;
  slug: string;
  totalProducts?: number;
  image?: string;
  parentId?: number | null;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
