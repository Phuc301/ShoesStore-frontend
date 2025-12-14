import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import userReducer from './slices/user.slice';
import cartReducer from './slices/cart.slice';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
