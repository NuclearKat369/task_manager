import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import taskReducer from "../features/taskSlice"
import taskListReducer from "../features/taskListSlice"

// const rootReducer = combineReducers({ taskReducer, taskListReducer });

export const store = configureStore({
    reducer: {
        taskList: taskListReducer,
        task: taskReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;