import { createSlice } from '@reduxjs/toolkit';
import * as actions from './asyncActions';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        categories: [],
        isLoading: false,
        isShowModal: false,
        childrenModal: null,
    },

    reducers: {
        showModal: (state, action) => {
            state.isShowModal = action.payload.isShowModal;
            state.childrenModal = action.payload.childrenModal;
        },
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
        });
    },
});

export const { showModal } = appSlice.actions;

export default appSlice.reducer;
