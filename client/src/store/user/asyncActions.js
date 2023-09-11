import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../../apis';

export const getCurrent = createAsyncThunk('user/getProducts', async (data, { rejectWithValue }) => {
    const response = await apis.aipGetCurrent();
    if (!response.success) return rejectWithValue(response);
    return response;
});
