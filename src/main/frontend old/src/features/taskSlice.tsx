import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskState {
    value: string[]
}

const initialState: TaskState = {
    value: []
}

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<string>) => {
            state.value.push(action.payload)
        }
    }
})

export const { addTask } = taskSlice.actions

export default taskSlice.reducer;