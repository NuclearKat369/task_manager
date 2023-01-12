import { createSlice } from "@reduxjs/toolkit";

export interface TaskStatusState {
    valueAll: string,
    valueByStatus: string[],
}

const initialState: TaskStatusState = {
    valueAll: null,
    valueByStatus: [],
}


export const taskCountSlice = createSlice({
    name: "taskCount",
    initialState,
    reducers: {
        setCountAllTasks: (state, action) => {
            state.valueAll = action.payload;
        },
        setCountTasksByStatus: (state, action) => {
            state.valueByStatus = action.payload;
        }
    },
})

export const { setCountAllTasks, setCountTasksByStatus } = taskCountSlice.actions

export const getAllTasksCountValue = ((state) => state.persistedReducer.taskCount.valueAll);
export const getTasksByStatusCountValue = ((state) => state.persistedReducer.taskCount.valueByStatus);

export default taskCountSlice.reducer;