import { createSlice } from '@reduxjs/toolkit';
import * as actions from './asyncActions';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        categories: [],
        isLoading: false,
        isShowModal: false,
        childrenModal: null,
        isShowCart: false,
        isShowMenu: false,
    },

    reducers: {
        showModal: (state, action) => {
            state.isShowModal = action.payload.isShowModal;
            state.childrenModal = action.payload.childrenModal;
        },
        showCart: state => {
            state.isShowCart = !state.isShowCart;
        },
        showMenu: state => {
            state.isShowMenu = !state.isShowMenu;
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

export const { showModal, showCart, showMenu } = appSlice.actions;

export default appSlice.reducer;
