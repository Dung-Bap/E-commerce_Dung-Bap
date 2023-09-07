import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../../apis';

export const getProducts = createAsyncThunk('products/getProducts', async (data, { rejectWithValue }) => {
    const response = await apis.apiGetProducts({ sort: '-createdAt', limit: 10 });
    if (!response.success) return rejectWithValue(response);
    return response;
});
