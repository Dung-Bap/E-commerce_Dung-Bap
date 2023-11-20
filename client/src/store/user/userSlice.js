import { createSlice } from '@reduxjs/toolkit';
import * as actions from './asyncActions';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        userData: null,
        accessToken: null,
        isLoading: false,
        message: '',
        currentCart: [],
    },

    reducers: {
        registerUser: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.accessToken = action.payload.accessToken;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.userData = null;
            state.accessToken = null;
            state.isLoading = false;
            state.message = '';
            state.currentCart = [];
        },
        clearMessage: state => {
            state.message = '';
        },
        updateCart: (state, action) => {
            const { pid, color, quantity } = action.payload;
            const updateCart = JSON.parse(JSON.stringify(state.currentCart)); //
            const updateCartItem = updateCart.map(el => {
                if (el.product._id === pid && el.color === color) {
                    return { ...el, quantity };
                } else return el;
            });
            state.currentCart = updateCartItem;
        },
    },

    extraReducers: builder => {
        builder.addCase(actions.getCurrent.pending, state => {
            state.isLoading = true;
        });

        builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData = action.payload.result;
            state.isLoggedIn = true;
            state.currentCart = action.payload.result.cart;
        });

        builder.addCase(actions.getCurrent.rejected, (state, action) => {
            state.isLoading = false;
            state.userData = null;
            state.isLoggedIn = false;
            state.accessToken = null;
            state.message = 'Login session has expired, Please Re-login !';
        });
    },
});

export const { registerUser, logout, clearMessage, updateCart } = userSlice.actions;

export default userSlice.reducer;
