import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StatusService from "../services/StatusService";
import { StatusType } from "./enums";

export interface TaskStatusState {
    value: string[],
    status: StatusType,
    error: string,
}

const initialState: TaskStatusState = {
    value: [],
    status: StatusType.NULL,
    error: null,
}

export const fetchAllTaskStatuses = createAsyncThunk('taskStatus/fetchAllTaskStatuses', async () => {
    const response = await StatusService.getStatuses();
    console.log("RESPONSE on StatusService: ", response);
    return [...response.data];
})

export const fetchTaskStatusById = createAsyncThunk('taskStatus/fetchStatusById', async (taskStatusId: number) => {
    const response = await StatusService.getStatus(taskStatusId);
    console.log("RESPONSE on StatusService: ", response);
    return [...response.data];
})

export const taskStatusSlice = createSlice({
    name: "taskStatus",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllTaskStatuses.pending, (state, action) => {
                state.status = StatusType.PENDING;
                state.error = null;
            })
            .addCase(fetchAllTaskStatuses.fulfilled, (state, { payload }) => {
                state.value = payload;
                state.status = StatusType.FULFILLED;
                state.error = null;
            })
            .addCase(fetchAllTaskStatuses.rejected, (state, action) => {
                state.status = StatusType.REJECTED;
                state.error = action.error.message;
            })
            .addCase(fetchTaskStatusById.pending, (state, action) => {
                state.status = StatusType.PENDING;
                state.error = null;
            })
            .addCase(fetchTaskStatusById.fulfilled, (state, { payload }) => {
                state.value = payload;
                state.status = StatusType.FULFILLED;
                state.error = null;
            })
            .addCase(fetchTaskStatusById.rejected, (state, action) => {
                state.status = StatusType.REJECTED;
                state.error = action.error.message;
            })
    },
})

export const getAllTaskStatuses = (state) => state.taskStatus.value;
export const getTaskStatusStatus = (state) => state.taskStatus.status;
export const getTaskStatusErrors = (state) => state.taskStatus.error;

export default taskStatusSlice.reducer;