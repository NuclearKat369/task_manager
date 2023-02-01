import { createSlice } from "@reduxjs/toolkit";

export interface TaskState {
    value: string[],
    isError: boolean,
    isFetching: boolean,
    isLoading: boolean,
    isSuccess: boolean,
}

const initialState: TaskState = {
    value: [],
    isError: false,
    isFetching: false,
    isLoading: false,
    isSuccess: false,
}

export const taskListNewSlice = createSlice({

    name: "taskListNew",
    initialState,
    reducers: {
        setAllTasks: (state, action) => {
            console.log("setAllTasks action.payload.data", action.payload.value)
            state.value = action.payload.value;
            state.isError = action.payload.isError;
            state.isFetching = action.payload.isFetching;
            state.isLoading = action.payload.isLoading;
            state.isSuccess = action.payload.isSuccess;
        },
    },
})
export const { setAllTasks } = taskListNewSlice.actions;

export const selectAllTasks = ((state) => state.persistedReducer.taskListNew.value);
export const selectIsSuccess = ((state) => state.persistedReducer.taskListNew.isSuccess);

export default taskListNewSlice.reducer;