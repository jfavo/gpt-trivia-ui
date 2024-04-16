import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "../state/slices/user.slice";

const rootReducer = combineSlices(usersSlice);

export type RootState = ReturnType<typeof rootReducer>;

// Wrap store creation in a function for reuse when setting up tests
export const makeStore = (preloadedState?: Partial<RootState>) => { 
    const store = configureStore({
        reducer: rootReducer,
        preloadedState,
    });
    return store;
}

export const store = makeStore();

export type AppStore = typeof store;

export type AppDispatch = AppStore["dispatch"];