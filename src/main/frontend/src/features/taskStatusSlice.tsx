import { createSlice } from "@reduxjs/toolkit";


export interface TaskStatusState {
    value: string[],
    isError: boolean,
    isFetching: boolean,
    isLoading: boolean,
    isSuccess: boolean,
}

const initialState: TaskStatusState = {
    value: [],
    isError: false,
    isFetching: false,
    isLoading: false,
    isSuccess: false,
}

export const taskStatusSlice = createSlice({
    name: "taskStatus",
    initialState,
    reducers: {
        setAllTaskStatuses: (state, action) => {
            console.log("action.payload taskStatusSlice", action.payload)
            state.value = action.payload.value;
            state.isError = action.payload.isError;
            state.isFetching = action.payload.isFetching;
            state.isLoading = action.payload.isLoading;
            state.isSuccess = action.payload.isSuccess;
        }
    },
})

export const { setAllTaskStatuses } = taskStatusSlice.actions;

export const selectAllTaskStatuses = ((state) => state.persistedReducer.taskStatus.value);

export default taskStatusSlice.reducer;