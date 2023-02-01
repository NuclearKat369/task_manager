import { createSlice } from "@reduxjs/toolkit";


export interface EmployeeWorkloadState {
    value: string[],
    isError: boolean,
    isFetching: boolean,
    isLoading: boolean,
    isSuccess: boolean,

}

const initialState: EmployeeWorkloadState = {
    value: [],
    isError: false,
    isFetching: false,
    isLoading: false,
    isSuccess: false,
}

export const employeesWorkloadSlice = createSlice({
    name: "employeesWorkload",
    initialState,
    reducers: {
        setAllEmployeesWorkload: (state, action) => {
            state.value = action.payload;
        }
    },
})

export const { setAllEmployeesWorkload } = employeesWorkloadSlice.actions;

export const selectAllEmployeesWorkload = ((state) => state.persistedReducer.employeesWorkload.value);

export default employeesWorkloadSlice.reducer;