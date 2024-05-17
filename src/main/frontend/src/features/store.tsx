import { configureStore, combineReducers } from '@reduxjs/toolkit';
import taskReducer from "./taskSlice";
import taskStatusReducer from "./taskStatusSlice";
import taskSubtypeReducer from "./taskSubtypeSlice";
import taskCountReducer from "./taskCountSlice";
import taskFileReducer from "./taskFileSlice";
import authReducer from "./auth/authSlice";
import taskListReducer from "./taskListSlice";
import employeesReducer from "./employeesSlice";
import employeesWorkloadReducer from "./employeesWorkloadSlice";
import taskHistoryReducer from './taskHistorySlice';
import departmentReducer from './departmentSlice';
import positionReducer from './positionSlice';
import roleReducer from './roleSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apiSlice } from './apiSlice';

const rootReducer = combineReducers({
    taskStatus: taskStatusReducer,
    taskSubtype: taskSubtypeReducer,
    task: taskReducer,
    taskCount: taskCountReducer,
    taskFiles: taskFileReducer,
    taskList: taskListReducer,
    employees: employeesReducer,
    taskHistory: taskHistoryReducer,
    employeesWorkload: employeesWorkloadReducer,
    department: departmentReducer,
    position: positionReducer,
    role: roleReducer,
});

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: {
        persistedReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {

                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(apiSlice.middleware),
    devTools: true
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;