import { createSlice } from "@reduxjs/toolkit";
import { forgotPassword, login, register, resetPassword } from "../actions/userAction";

const initialState = {
    user: [],
    isLoading: false,
    error: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder
        // Handle register
        .addCase(register.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(register.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        //  Handle Login
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {

            const {user, accessToken: token} = action.payload
            localStorage.setItem('name', user.name)
            localStorage.setItem('token', token)
            localStorage.setItem('role', user.role)
            state.isLoading = false;
            state.user = user
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        // Handle forgot password
        .addCase(forgotPassword.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(forgotPassword.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(forgotPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        // Handle reset password
        .addCase(resetPassword.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(resetPassword.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

    }
})

export default userSlice.reducer