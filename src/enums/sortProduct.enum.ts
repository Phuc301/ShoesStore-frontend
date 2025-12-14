export const SortProductOption = {
  None: 0,
  PriceAsc: 1,
  PriceDesc: 2,
  NameAsc: 3,
  RatingDesc: 4,
};
export type SortProductOption =
  (typeof SortProductOption)[keyof typeof SortProductOption];
 