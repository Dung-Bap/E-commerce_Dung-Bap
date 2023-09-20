import { createSlice } from '@reduxjs/toolkit';
import * as actions from './asyncActions';

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        newArrivals: [],
        errorMessage: '',
        isLoading: false,
    },

    reducers: {
        // logout: state => {
        //     state.currentUser = null;
        //     state.errorMessage = '';
        // },
    },

    extraReducers: builder => {
        builder.addCase(actions.getProducts.pending, state => {
            state.isLoading = true;
        });

        builder.addCase(actions.getProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newArrivals = action.payload.products;
        });

        builder.addCase(actions.getProducts.rejected, (state, action) => {
            state.isLoading = false;
        });
    },
});

// export const {} = productsSlice.actions;

export default productsSlice.reducer;
