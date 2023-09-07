import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../../apis';

export const getCategories = createAsyncThunk('app/getCategories', async (data, { rejectWithValue }) => {
    const response = await apis.apiProductCategory();
    if (!response.success) return rejectWithValue(response);
    return response;
});
