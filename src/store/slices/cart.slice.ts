import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  shoppingCart: {
    cartId: null,
    // items: [],
    total: 0,
  },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // state.shoppingCart.items = action.payload.items;
      state.shoppingCart.total = action.payload.total;
    },
    setCartId: (state, action) => {
      state.shoppingCart.cartId = action.payload.cartId;
    },
  },
});

const persistConfig = {
  key: 'cart',
  storage,
  whitelist: ['shoppingCart'],
};

export const { setCartId, addToCart } = cartSlice.actions;
export default persistReducer(persistConfig, cartSlice.reducer);
