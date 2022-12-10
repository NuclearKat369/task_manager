import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SubtypeService from "../services/SubtypeService";
import { StatusType } from "./enums";

export interface TaskSubtypeState {
    value: string[],
    status: StatusType,
    error: string,
}

const initialState: TaskSubtypeState = {
    value: [],
    status: StatusType.NULL,
    error: null,
}

export const fetchAllTaskSubtypes = createAsyncThunk('subtype/fetchAllTaskSubtypes', async () => {
    const response = await SubtypeService.getSubtypes();
    console.log("RESPONSE: ", response);
    return [...response.data];
})

export const fetchTaskSubtypeById = createAsyncThunk('subtype/fetchTaskSubtypeById', async (taskSubtypeId: string) => {
    const response = await SubtypeService.getSubtype(taskSubtypeId);
    console.log("taskStatusID in Reducer: ", taskSubtypeId);
    console.log("RESPONSE: ", response);
    return [...response.data];
})

export const taskSubtypeSlice = createSlice({
    name: "taskSubtype",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllTaskSubtypes.pending, (state, action) => {
                state.status = StatusType.PENDING;
                state.error = null;
            })
            .addCase(fetchAllTaskSubtypes.fulfilled, (state, { payload }) => {
                state.value = payload;
                state.status = StatusType.FULFILLED;
                state.error = null;
            })
            .addCase(fetchAllTaskSubtypes.rejected, (state, action) => {
                state.status = StatusType.REJECTED;
                state.error = action.error.message;
            })
            .addCase(fetchTaskSubtypeById.pending, (state, action) => {
                state.status = StatusType.PENDING;
                state.error = null;
            })
            .addCase(fetchTaskSubtypeById.fulfilled, (state, { payload }) => {
                state.value = payload;
                state.status = StatusType.FULFILLED;
                state.error = null;
            })
            .addCase(fetchTaskSubtypeById.rejected, (state, action) => {
                state.status = StatusType.REJECTED;
                state.error = action.error.message;
            })
    },
})

// export const { addAllTasks } = taskListSlice.actions;
export const getAllTaskSubtypes = (state) => state.taskSubtype.value;
export const getTaskSubtypeStatus = (state) => state.taskSubtype.status;
export const getTaskSubtypeErrors = (state) => state.taskSubtype.error;

export default taskSubtypeSlice.reducer;