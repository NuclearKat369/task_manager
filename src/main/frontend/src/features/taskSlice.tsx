import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TaskService from "../services/TaskService";
import { StatusType } from "./enums";

export interface TaskState {
    value: string[],
    status: StatusType,
    error: string,
}

export interface TaskType {
    taskId: string | null,
    statusId: string,
    statusName: string,
    subtypeId: string,
    subtypeName: string,
    taskName: string,
    taskText: string
}

const initialState: TaskState = {
    value: [],
    status: StatusType.NULL,
    error: null,
}

export const fetchTaskByTaskId = createAsyncThunk('task/fetchTaskByTaskId', async (taskId: string) => {
    const response = await TaskService.getTaskById(taskId);
    console.log("taskStatusID in Reducer: ", taskId);
    console.log("RESPONSE.data in taskSlice: ", response.data);
    return [response.data];
})

export const addTask = createAsyncThunk('task/addTask', async (task: TaskType) => {
    const response = await TaskService.createTask(task);
    console.log("RESPONSE in addTask: ", response);
    return [response.data];
})

export const appendTask = createAsyncThunk('task/updateTask', async (task: TaskType) => {
    const response = await TaskService.updateTask(task.taskId, task);
    console.log("TASKID IN SLICE!!!!! ", task.taskId)
    console.log("RESPONSE in updateTask: ", response);
    return [response.data];
})

export const removeTask = createAsyncThunk('task/removeTask', async (taskId: string) => {
    const response = await TaskService.deleteTask(taskId);
    console.log(response);
    return [response.data];
}

)

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchTaskByTaskId.pending, (state, action) => {
                state.status = StatusType.PENDING;
                state.error = null;
            })
            .addCase(fetchTaskByTaskId.fulfilled, (state, { payload }) => {
                state.value = payload;
                state.status = StatusType.FULFILLED;
                state.error = null;
                console.log("value in taskSlice: ", state.value)
            })
            .addCase(fetchTaskByTaskId.rejected, (state, action) => {
                state.status = StatusType.REJECTED;
                console.log("payload: ", action.payload)
                state.error = action.error.message;
            })
            .addCase(addTask.pending, (state, action) => {
                state.status = StatusType.PENDING;
                state.error = null;
            })
            .addCase(addTask.fulfilled, (state, { payload }) => {
                state.value = payload;
                state.status = StatusType.FULFILLED;
                state.error = null;
            })
            .addCase(addTask.rejected, (state, action) => {
                state.status = StatusType.REJECTED;
                state.error = action.error.message;
            })
            .addCase(appendTask.pending, (state, action) => {
                state.status = StatusType.PENDING;
                state.error = null;
            })
            .addCase(appendTask.fulfilled, (state, { payload }) => {
                state.value = payload;
                state.status = StatusType.FULFILLED;
                state.error = null;
            })
            .addCase(appendTask.rejected, (state, action) => {
                state.status = StatusType.REJECTED;
                state.error = action.error.message;
            })
            .addCase(removeTask.pending, (state, action) => {
                state.status = StatusType.PENDING;
                state.error = null;
            })
            .addCase(removeTask.fulfilled, (state, { payload }) => {
                state.value = payload;
                state.status = StatusType.FULFILLED;
                state.error = null;
            })
            .addCase(removeTask.rejected, (state, action) => {
                state.status = StatusType.REJECTED;
                state.error = action.error.message;
            })
    },
})

export const getTask = (state) => state.task.value;
export const getStatus = (state) => state.task.status;
export const getErrors = (state) => state.task.error;

export default taskSlice.reducer;