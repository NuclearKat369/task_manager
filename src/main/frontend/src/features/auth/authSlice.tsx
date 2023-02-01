import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
    accessToken: string,
    refreshToken: string,
    email: string,
    lastName: string,
    firstName: string,
    patronymic: string,
    uuid: string,
    roles: string,
}

const initialState = {
    accessToken: null,
    refreshToken: null,
    email: null,
    lastName: null,
    firstName: null,
    patronymic: null,
    uuid: null,
    roles: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { email, accessToken, lastName, firstName, patronymic, uuid, roles }: any = action.payload;
            console.log('action.payload in auth', action.payload)
            state.email = email;
            state.accessToken = accessToken;
            state.lastName = lastName;
            state.firstName = firstName;
            state.patronymic = patronymic;
            state.uuid = uuid;
            state.roles = roles;
        },
        logOut: (state, action) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.email = null;
            state.lastName = null;
            state.firstName = null;
            state.patronymic = null;
            state.uuid = null;
            state.roles = [];
        },

    }
})


export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentEmail = (state) => state.auth.email;
export const selectCurrentFirstName = (state) => state.auth.firstName;
export const selectCurrentPatronymic = (state) => state.auth.patronymic;
export const selectCurrentLastName = (state) => state.auth.lastName;
export const selectCurrentUuid = (state) => state.auth.uuid;
export const selectCurrentToken = (state) => state.auth.accessToken;
export const selectCurrentRoles = (state) => state.auth.roles;
export const selectCurrentRefreshToken = (state) => state.auth.refreshToken;
export const selectCurrentAuth = (state) => state.auth;
