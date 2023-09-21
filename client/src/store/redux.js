/** @format */

import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import productsSlice from './products/productsSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
//FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
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
        // middleware: getDefaultMiddleware =>
        //     getDefaultMiddleware({
        //         serializableCheck: {
        //             ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        //         },
        //     }),
    },
});

export const persistor = persistStore(store);
