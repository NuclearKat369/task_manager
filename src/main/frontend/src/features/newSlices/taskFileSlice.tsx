import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface TaskFilesState {
    value: string[],
    status: number,
}

const initialState: TaskFilesState = {
    value: [],
    status: 200,
}

export const taskFileSlice = createSlice({
    name: "taskFiles",
    initialState,
    reducers: {
        setAllTaskFiles: (state, action) => {
            const { data, status }: any = action.payload;
            console.log("action.payload taskFileSlice", action.payload)
            state.value = action.payload.data;
            state.status = action.payload.status;

        },
    },
})

export const { setAllTaskFiles } = taskFileSlice.actions;

export const getTaskFiles = ((state) => state.persistedReducer.taskFiles.value);

export default taskFileSlice.reducer;