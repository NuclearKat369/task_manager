import { createSlice } from "@reduxjs/toolkit";


export interface AuthState {
    accessToken: string,
    refreshToken: string,
    email: string,
    lastName: string,
    firstName: string,
    patronymic: string,
    uuid: string,
    status: string,
    error: string,
}

const initialState = {
    accessToken: null,
    refreshToken: null,
    email: null,
    lastName: null,
    firstName: null,
    patronymic: null,
    uuid: null,
    status: null,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { email, accessToken }: any = action.payload;
            console.log('action.payload in auth', action.payload)
            state.email = email;
            state.accessToken = accessToken;
            console.log('accessToken in auth', accessToken)
        },
        logOut: (state, action) => {
            state.email = null;
            state.accessToken = null;
        },

    }
})


export const {setCredentials, logOut} = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.email;
export const selectCurrentToken = (state) => state.auth.accessToken;
