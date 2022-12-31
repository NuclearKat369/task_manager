import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FileService from "../services/FileService";
import { StatusType } from "./enums";

export interface TaskFilesState {
    value: string[],
    status: StatusType,
    error: string,
}

const initialState: TaskFilesState = {
    value: [],
    status: StatusType.NULL,
    error: null,
}

export const fetchAllTaskFiles = createAsyncThunk('taskFiles/fetchAllTaskFiles', async (taskId: string) => {
    const response = await FileService.getFiles(taskId);
    console.log("RESPONSE FILES: ", response);
    return [...response.data];
})

export const fetchFileById = createAsyncThunk('taskFiles/fetchFileById', async (fileId: string) => {
    const response = await FileService.getFileById(fileId);
    console.log("RESPONSE FILE: ", response);
    return response.data;
})

export const removeFileById = createAsyncThunk('taskFiles/removeFileById', async (fileId: string) => {
    const response = await FileService.deleteFile(fileId);
    console.log("RESPONSE FILE: ", response);
    return response.data;
})

export const taskFileSlice = createSlice({
    name: "taskFiles",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllTaskFiles.pending, (state, action) => {
                state.status = StatusType.PENDING;
                state.error = null;
            })
            .addCase(fetchAllTaskFiles.fulfilled, (state, { payload }) => {
                state.value = payload;
                state.status = StatusType.FULFILLED;
                state.error = null;
            })
            .addCase(fetchAllTaskFiles.rejected, (state, action) => {
                state.status = StatusType.REJECTED;
                state.error = action.error.message;
            })
            .addCase(fetchFileById.pending, (state, action) => {
                state.status = StatusType.PENDING;
                state.error = null;
            })
            .addCase(fetchFileById.fulfilled, (state, { payload }) => {
                state.value = payload;
                state.status = StatusType.FULFILLED;
                state.error = null;
            })
            .addCase(fetchFileById.rejected, (state, action) => {
                state.status = StatusType.REJECTED;
                state.error = action.error.message;
            })
            .addCase(removeFileById.pending, (state, action) => {
                state.status = StatusType.PENDING;
                state.error = null;
            })
            .addCase(removeFileById.fulfilled, (state, { payload }) => {
                state.value = payload;
                state.status = StatusType.FULFILLED;
                state.error = null;
            })
            .addCase(removeFileById.rejected, (state, action) => {
                state.status = StatusType.REJECTED;
                state.error = action.error.message;
            })
    },
})

export const getTaskFiles = (state) => state.taskFiles.value;
export const getTaskFilesStatus = (state) => state.taskFiles.status;
export const getTaskFilesErrors = (state) => state.taskFiles.error;

export default taskFileSlice.reducer;