import { createSlice } from "@reduxjs/toolkit";
export interface PositionState {
    value: object,
    isError: boolean,
    isFetching: boolean,
    isLoading: boolean,
    isSuccess: boolean,
}

const initialState: PositionState = {
    value: null,
    isError: false,
    isFetching: false,
    isLoading: false,
    isSuccess: false,
}

export const positionSlice = createSlice({
    name: "position",
    initialState,
    reducers: {
        setPositions: (state, action) => {
            console.log("position payload", action.payload)
            state.value = action.payload.value;
            state.isError = action.payload.isError;
            state.isFetching = action.payload.isFetching;
            state.isLoading = action.payload.isLoading;
            state.isSuccess = action.payload.isSuccess;
        },
    },
})

export const { setPositions } = positionSlice.actions;

export const selectAllPositions = ((state) => state.persistedReducer.position.value);

export default positionSlice.reducer;