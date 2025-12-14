export interface ProductFilterOptions {
  brands: string[];
  categories: string[];
  priceRange: [number, number];
  colors: string[];
}

export interface FilterItem {
  key: string;
  label: string;
  selected?: boolean;
}
