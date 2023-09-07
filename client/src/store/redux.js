/** @format */

import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import productsSlice from './products/productsSlice';

export const store = configureStore({
    reducer: {
        app: appSlice,
        products: productsSlice,
    },
});
