import { createSlice } from "@reduxjs/toolkit";

export interface TaskHistoryState {
    value: string[],
    isError: boolean,
    isFetching: boolean,
    isLoading: boolean,
    isSuccess: boolean,
}

const initialState: TaskHistoryState = {
    value: [],
    isError: false,
    isFetching: false,
    isLoading: false,
    isSuccess: false,
}

export const taskHistorySlice = createSlice({

    name: "taskHistory",
    initialState,
    reducers: {
        setTaskHistory: (state, action) => {
            console.log("setTaskHistory action.payload.data", action.payload.value)
            state.value = action.payload.value;
            state.isError = action.payload.isError;
            state.isFetching = action.payload.isFetching;
            state.isLoading = action.payload.isLoading;
            state.isSuccess = action.payload.isSuccess;
        },
    },
})
export const { setTaskHistory } = taskHistorySlice.actions;

export const selectTaskHistory = ((state) => state.persistedReducer.taskHistory.value);
export const selectTaskHistoryIsSuccess = ((state) => state.persistedReducer.taskHistory.isSuccess);

export default taskHistorySlice.reducer;