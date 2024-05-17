import { createSlice } from "@reduxjs/toolkit";

export interface TaskState {
    value: string[],
    isError: boolean,
    isFetching: boolean,
    isLoading: boolean,
    isSuccess: boolean
}

const initialState: TaskState = {
    value: [],
    isError: false,
    isFetching: false,
    isLoading: false,
    isSuccess: false
}

export const taskListSlice = createSlice({

    name: "taskList",
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
export const { setAllTasks } = taskListSlice.actions;

export const selectAllTasks = ((state) => state.persistedReducer.taskList.value);
export const selectIsSuccess = ((state) => state.persistedReducer.taskList.isSuccess);
export const selectIsFetching = ((state) => state.persistedReducer.taskList.isFetching);
export const selectIsLoading = ((state) => state.persistedReducer.taskList.isLoading);

export default taskListSlice.reducer;