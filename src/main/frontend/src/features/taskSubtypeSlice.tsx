import { createSlice } from "@reduxjs/toolkit";
export interface TaskSubtypeState {
    value: string[],
    isError: boolean,
    isFetching: boolean,
    isLoading: boolean,
    isSuccess: boolean,
}

const initialState: TaskSubtypeState = {
    value: [],
    isError: false,
    isFetching: false,
    isLoading: false,
    isSuccess: false,
}

export const taskSubtypeSlice = createSlice({
    name: "taskSubtype",
    initialState,
    reducers: {
        setSubtypes: (state, action) => {
            state.value = action.payload.value;
            state.isError = action.payload.isError;
            state.isFetching = action.payload.isFetching;
            state.isLoading = action.payload.isLoading;
            state.isSuccess = action.payload.isSuccess;
        },
    },
})

export const {setSubtypes} = taskSubtypeSlice.actions;

export const selectAllTaskSubtypes = ((state) => state.persistedReducer.taskSubtype.value);

export default taskSubtypeSlice.reducer;