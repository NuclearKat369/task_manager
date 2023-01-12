import { createSlice } from "@reduxjs/toolkit";


export interface TaskStatusState {
    value: string[],
}

const initialState: TaskStatusState = {
    value: [],
}

export const taskStatusSlice = createSlice({
    name: "taskStatus",
    initialState,
    reducers: {
        setAllTaskStatuses: (state, action) => {
            state.value = action.payload;
        }
    },
})

export const { setAllTaskStatuses } = taskStatusSlice.actions;

export const getAllTaskStatuses = ((state) => state.persistedReducer.taskStatus.value);

export default taskStatusSlice.reducer;