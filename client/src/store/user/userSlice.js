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
    },

    reducers: {
        registerUser: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.accessToken = action.payload.accessToken;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.userData = null;
        },
        clearMessage: state => {
            state.message = '';
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

export const { registerUser, logout, clearMessage } = userSlice.actions;

export default userSlice.reducer;
