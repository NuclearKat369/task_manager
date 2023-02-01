import { createSlice } from "@reduxjs/toolkit";


export interface EmployeeState {
    value: string[],
    isError: boolean,
    isFetching: boolean,
    isLoading: boolean,
    isSuccess: boolean,

}

const initialState: EmployeeState = {
    value: [],
    isError: false,
    isFetching: false,
    isLoading: false,
    isSuccess: false,
}

export const employeesSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        setAllEmployees: (state, action) => {
            state.value = action.payload;
        }
    },
})

export const { setAllEmployees } = employeesSlice.actions;

export const selectAllEmployees = ((state) => state.persistedReducer.employees.value);

export default employeesSlice.reducer;