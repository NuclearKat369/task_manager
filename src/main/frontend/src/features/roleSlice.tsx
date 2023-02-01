import { createSlice } from "@reduxjs/toolkit";
export interface RoleState {
    value: object,
    isError: boolean,
    isFetching: boolean,
    isLoading: boolean,
    isSuccess: boolean,
}

const initialState: RoleState = {
    value: null,
    isError: false,
    isFetching: false,
    isLoading: false,
    isSuccess: false,
}

export const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {
        setRoles: (state, action) => {
            console.log("role payload", action.payload)
            state.value = action.payload.value;
            state.isError = action.payload.isError;
            state.isFetching = action.payload.isFetching;
            state.isLoading = action.payload.isLoading;
            state.isSuccess = action.payload.isSuccess;
        },
    },
})

export const { setRoles } = roleSlice.actions;

export const selectAllRoles = ((state) => state.persistedReducer.role.value);

export default roleSlice.reducer;