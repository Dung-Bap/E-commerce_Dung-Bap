import { createSlice } from '@reduxjs/toolkit';
import * as actions from './asyncActions';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        userData: null,
        accessToken: null,
        isLoading: false,
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
    },

    extraReducers: builder => {
        builder.addCase(actions.getCurrent.pending, state => {
            state.isLoading = true;
        });

        builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData = action.payload.result;
        });

        builder.addCase(actions.getCurrent.rejected, (state, action) => {
            state.isLoading = false;
            state.userData = null;
        });
    },
});

export const { registerUser, logout } = userSlice.actions;

export default userSlice.reducer;
