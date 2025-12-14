export const TabKeyProfile = {
  PERSONAL_INFO: 'personalInfo',
  CHANGE_PASSWORD: 'changePassword',
  ORDER_HISTORY: 'orderHistory',
  ADDRESS_BOOK: 'addressBook',
  POINTS_HISTORY: 'pointsHistory',
} as const;

export type TabKeyProfile = (typeof TabKeyProfile)[keyof typeof TabKeyProfile];
