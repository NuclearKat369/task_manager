import { configureStore, combineReducers } from '@reduxjs/toolkit';
import taskReducer from "./taskSlice";
import taskListReducer from "./taskListSlice";
import taskStatusReducer from "./taskStatusSlice";
import taskSubtypeReducer from "./taskSubtypeSlice";
import taskCountReducer from "./taskCountSlice";
import taskFileReducer from "./taskFileSlice";
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

const rootReducer = combineReducers({
    taskList: taskListReducer,
    taskStatus: taskStatusReducer,
    taskSubtype: taskSubtypeReducer,
    task: taskReducer,
    taskCount: taskCountReducer,
    taskFiles: taskFileReducer,
});

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//     reducer: {
//         taskList: taskListReducer,
//         taskStatus: taskStatusReducer,
//         taskSubtype: taskSubtypeReducer,
//         task: taskReducer,
//     }
// });

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;