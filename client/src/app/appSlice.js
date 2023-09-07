import { createSlice } from '@reduxjs/toolkit';
import * as actions from './asyncActions';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        categories: [],
        isLoading: false,
    },

    reducers: {
        // logout: state => {
        //     state.currentUser = null;
        //     state.errorMessage = '';
        // },
    },

    extraReducers: builder => {
        // builder.addCase(getCategories.pending, state => {
        //     state.isLoading = true;
        // });

        builder.addCase(actions.getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload.getCategories;
        });

        builder.addCase(actions.getCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },
});

// export const {} = appSlice.actions;

export default appSlice.reducer;
