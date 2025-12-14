import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  account: {
    access_token: '',
    refresh_token: '',
    fullName: '',
    email: '',
    avatarUrl: '',
    role: '',
    loyaltyPoints: 0,
    createdAt: '',
    sex: null,
    dateOfBirth: null,
    hasPassword: true,
  },
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      const { accessToken, refreshToken, user } = action.payload;
      state.account = {
        access_token: accessToken,
        refresh_token: refreshToken,
        fullName: user?.fullName || '',
        email: user?.email || '',
        avatarUrl: user?.avatarUrl || null,
        role: user?.role || '',
        loyaltyPoints: user?.loyaltyPoints || 0,
        createdAt: user?.createdAt || '',
        hasPassword: user?.hasPassword ?? true,
        sex: user?.sex || null,
        dateOfBirth: user?.dateOfBirth || null,
      };
      state.isAuthenticated = true;
    },
    userLogout: (state) => {
      state.account = {
        access_token: '',
        refresh_token: '',
        email: '',
        fullName: '',
        avatarUrl: '',
        role: '',
        loyaltyPoints: 0,
        createdAt: '',
        sex: null,
        dateOfBirth: null,
        hasPassword: true,
      };
      state.isAuthenticated = false;
    },
    userUpdate: (state, action) => {
      const { fullName, dateOfBirth, sex } = action.payload;
      console.log(action.payload);
      state.account = {
        ...state.account,
        fullName: fullName || state.account.fullName,
        dateOfBirth: dateOfBirth || state.account.dateOfBirth,
        sex: sex || state.account.sex,
      };
    },
    userUpdateAvatar: (state, action) => {
      const { avatarUrl } = action.payload;
      state.account = {
        ...state.account,
        avatarUrl: avatarUrl || state.account.avatarUrl,
      };
    },
    userSetHasPassword: (state) => {
      state.account.hasPassword = true;
    },
    userLoyalty: (state, action) => {
      const { loyaltyPoints } = action.payload;
      state.account = {
        ...state.account,
        loyaltyPoints: state.account.loyaltyPoints -  loyaltyPoints,
      };
    },
  },
});

const persistConfig = {
  key: 'user',
  storage,  
  whitelist: ['account', 'isAuthenticated'],
};

export const {
  userLogin,
  userLogout,
  userUpdate,
  userUpdateAvatar,
  userSetHasPassword,
  userLoyalty,
} = userSlice.actions;
export default persistReducer(persistConfig, userSlice.reducer);
