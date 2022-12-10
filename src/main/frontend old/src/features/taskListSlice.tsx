import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import TaskService from "../services/TaskService";

interface TaskListState {
    value: string[]
}

const initialState: TaskListState = {
    value: []
}

export const fetchAllTasks = createAsyncThunk('tasks/fetchAllTasks', async () => {
    const result = await TaskService.getAllTasks();
    return [...result.data];
})

export const taskListSlice = createSlice({
    name: "taskList",
    initialState,
    reducers: {
        getAllTasks: (state, action: PayloadAction<string>) => {
            state.value.push(action.payload)
        }
    }
})

export const { getAllTasks } = taskListSlice.actions

export default taskListSlice.reducer;