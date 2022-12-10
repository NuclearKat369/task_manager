import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TaskService from "../services/TaskService";
import { StatusType, TaskStatusType } from "./enums";

var taskStatusGlobal;

export interface TaskListState {
    value: string[],
    status: StatusType,
    taskStatus: TaskStatusType,
    error: string,
}

const initialState: TaskListState = {
    value: [],
    status: StatusType.NULL,
    taskStatus: TaskStatusType.ALL,
    error: null,
}

export const fetchAllTasks = createAsyncThunk('taskList/fetchAllTasks', async () => {
    const response = await TaskService.getAllTasks();
    console.log("RESPONSE fetchAllTasks: ", response);
    return [...response.data];
})

export const fetchTasksByStatusId = createAsyncThunk('taskList/fetchTasksByStatusId', async (taskStatusId: string) => {
    const response = await TaskService.getAllTasksWithStatusId(taskStatusId);
    changeTaskStatusId(taskStatusId);
    console.log("taskStatusID in Reducer: ", taskStatusId);
    console.log("RESPONSE: ", response);
    return [...response.data];
})

const changeTaskStatusId = (taskStatusId) => {
    taskStatusGlobal = taskStatusId;
}

export const taskListSlice = createSlice({
    name: "taskList",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllTasks.pending, (state, action) => {
                state.status = StatusType.PENDING;
                state.taskStatus = TaskStatusType.ALL;
                state.error = null;
            })
            .addCase(fetchAllTasks.fulfilled, (state, { payload }) => {
                state.value = payload;
                state.status = StatusType.FULFILLED;
                state.taskStatus = TaskStatusType.ALL;
                state.error = null;
                console.log("payload fetchAllTasks in taskListSlice: ", payload);
            })
            .addCase(fetchAllTasks.rejected, (state, action) => {
                state.status = StatusType.REJECTED;
                state.taskStatus = TaskStatusType.ALL;
                state.error = action.error.message;
            })
            .addCase(fetchTasksByStatusId.pending, (state, action) => {
                state.status = StatusType.PENDING;
                state.taskStatus = taskStatusGlobal;
                state.error = null;
                state.taskStatus = taskStatusGlobal;
            })
            .addCase(fetchTasksByStatusId.fulfilled, (state, { payload }) => {
                state.value = payload;
                state.status = StatusType.FULFILLED;
                state.taskStatus = taskStatusGlobal;
                state.error = null;
            })
            .addCase(fetchTasksByStatusId.rejected, (state, action) => {
                state.status = StatusType.REJECTED;
                state.taskStatus = TaskStatusType.ALL;
                state.error = action.error.message;
            })
    },
})

export const getAllTasks = (state) => state.taskList.value;
export const getStatus = (state) => state.taskList.status;
export const getTaskStatus = (state) => state.taskList.taskStatus;
export const getTasksErrors = (state) => state.taskList.error;

export default taskListSlice.reducer;