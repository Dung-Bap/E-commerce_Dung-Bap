import { createSlice } from '@reduxjs/toolkit';
// import * as actions from './asyncActions';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        userData: null,
        accessToken: null,
    },

    reducers: {
        registerUser: (state, action) => {
            console.log(action);
            state.isLoggedIn = action.payload.isLoggedIn;
            state.userData = action.payload.userData;
            state.accessToken = action.payload.accessToken;
        },
    },

    // extraReducers: builder => {
    //     builder.addCase(actions.getProducts.pending, state => {
    //         state.isLoading = true;
    //     });

    //     builder.addCase(actions.getProducts.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.newArrivals = action.payload.products;
    //     });

    //     builder.addCase(actions.getProducts.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.errorMessage = action.payload.message;
    //     });
    // },
});

export const { registerUser } = userSlice.actions;

export default userSlice.reducer;
