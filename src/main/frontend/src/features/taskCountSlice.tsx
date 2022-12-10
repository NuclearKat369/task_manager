import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StatusService from "../services/StatusService";
import TaskService from "../services/TaskService";
import { StatusType } from "./enums";

export interface TaskStatusState {
    valueAll: string,
    valueByStatus: string[],
    status: StatusType,
    error: string,
}

const initialState: TaskStatusState = {
    valueAll: null,
    valueByStatus: [],
    status: StatusType.NULL,
    error: null,
}

export const countAllTasks = createAsyncThunk('taskCount/countAllTasks', async () => {
    console.log("countAllTasks WORKED");
    const response = await TaskService.countAllTasks();
    console.log("responseAll: ", response.data)

    return response.data;
});

export const countTasksByStatus = createAsyncThunk('taskCount/countTasksByStatus', async () => {
    console.log("countTasksByStatus WORKED");
    const response = await StatusService.countTasksByStatus();
    console.log("responseByStatus: ", response.data)
    return [...response.data];
})



// export const countTasksByStatus = createAsyncThunk('taskStatus/countTasksByStatus', async () => {
//     const response = await StatusService.countTasksByStatus();
//     console.log("RESPONSE countTasksByStatus on StatusService: ", response);
//     return [...response.data];
// })

export const taskCountSlice = createSlice({
    name: "taskCount",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(countAllTasks.pending, (state, action) => {
                state.status = StatusType.PENDING;
                state.error = null;
            })
            .addCase(countAllTasks.fulfilled, (state, { payload }) => {
                state.valueAll = payload;
                state.status = StatusType.FULFILLED;
                state.error = null;
                console.log("payload countAllAndByStatus in taskListSlice: ", payload);
            })
            .addCase(countAllTasks.rejected, (state, action) => {
                state.status = StatusType.REJECTED;
                state.error = action.error.message;
            })
            .addCase(countTasksByStatus.pending, (state, action) => {
                state.status = StatusType.PENDING;
                state.error = null;
            })
            .addCase(countTasksByStatus.fulfilled, (state, { payload }) => {
                state.valueByStatus = payload;
                state.status = StatusType.FULFILLED;
                state.error = null;
                console.log("payload countAllAndByStatus in taskListSlice: ", payload);
            })
            .addCase(countTasksByStatus.rejected, (state, action) => {
                state.status = StatusType.REJECTED;
                state.error = action.error.message;
            })
    },
})

export const getAllTasksCountValue = (state) => state.taskCount.valueAll;
export const getTasksByStatusCountValue = (state) => state.taskCount.valueByStatus;
export const getgetTasksCountStatus = (state) => state.taskCount.status;
export const getgetTasksCountErrors = (state) => state.taskCount.error;

export default taskCountSlice.reducer;