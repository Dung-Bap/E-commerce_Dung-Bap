/** @format */

import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import productsSlice from './products/productsSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userSlice from './user/userSlice';

const persistConfig = {
    key: 'shop/user',
    storage,
};

const userConfig = {
    ...persistConfig,
    whitelist: ['isLoggedIn', 'accessToken'],
};

export const store = configureStore({
    reducer: {
        app: appSlice,
        products: productsSlice,
        user: persistReducer(userConfig, userSlice),
    },
});

export const persistor = persistStore(store);
