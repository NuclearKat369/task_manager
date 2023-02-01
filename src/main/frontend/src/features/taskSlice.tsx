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

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setTask: (state, action) => {
            console.log("action.payload.value setTask: ", action.payload.value)
            state.value = action.payload.value;
            state.isError = action.payload.isError;
            state.isFetching = action.payload.isFetching;
            state.isLoading = action.payload.isLoading;
            state.isSuccess = action.payload.isSuccess;
        },
    },
})

export const { setTask } = taskSlice.actions;

export const selectTask = ((state) => state.persistedReducer.task.value);

export default taskSlice.reducer;