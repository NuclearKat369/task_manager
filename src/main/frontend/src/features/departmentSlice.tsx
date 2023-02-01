import { createSlice } from "@reduxjs/toolkit";
export interface DepartmentsState {
    value: object,
    isError: boolean,
    isFetching: boolean,
    isLoading: boolean,
    isSuccess: boolean,
}

const initialState: DepartmentsState = {
    value: null,
    isError: false,
    isFetching: false,
    isLoading: false,
    isSuccess: false,
}

export const departmentSlice = createSlice({
    name: "department",
    initialState,
    reducers: {
        setDepartments: (state, action) => {
            console.log("department payload", action.payload)
            state.value = action.payload.value;
            state.isError = action.payload.isError;
            state.isFetching = action.payload.isFetching;
            state.isLoading = action.payload.isLoading;
            state.isSuccess = action.payload.isSuccess;
        },
    },
})

export const { setDepartments } = departmentSlice.actions;

export const selectAllDepartments = ((state) => state.persistedReducer.department.value);

export default departmentSlice.reducer;