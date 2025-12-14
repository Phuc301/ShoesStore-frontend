import type { ProductFilterOptions } from '../options/productFilter.option';

export interface ProductFiltersProps {
  filters: ProductFilterOptions;
  onFiltersChange: (filters: ProductFilterOptions) => void;
  productCount: number;
}
