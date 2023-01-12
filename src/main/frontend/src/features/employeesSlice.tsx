import { createSlice } from "@reduxjs/toolkit";


export interface EmployeeState {
    value: string[],
}

const initialState: EmployeeState = {
    value: [],
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

export const getAllEmployees = ((state) => state.persistedReducer.employees.value);

export default employeesSlice.reducer;