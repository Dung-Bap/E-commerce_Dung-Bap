/** @format */

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import appSlice from './app/appSlice';
import productsSlice from './products/productsSlice';

import userSlice from './user/userSlice';

const persistConfig = {
    key: 'shop/user',
    storage,
};

const userConfig = {
    ...persistConfig,
    whitelist: ['isLoggedIn', 'accessToken', 'userData'],
};

export const store = configureStore({
    reducer: {
        app: appSlice,
        products: productsSlice,
        user: persistReducer(userConfig, userSlice),
    },
});

export const persistor = persistStore(store);
