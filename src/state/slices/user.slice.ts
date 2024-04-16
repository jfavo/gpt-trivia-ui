import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/user";
import { RootState } from "../app.store";

export interface UserState {
    currentUser: object | undefined
}

const initialState: UserState = {
    currentUser: undefined
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<object>) => {
            state.currentUser = action.payload;
        }
    },
    selectors: {
        /**
         * Fetches the user data from the state
         * @param state State object
         * @returns User data stored if any
        */
        getCurrentUser: (state: RootState): object | undefined => state?.currentUser,
    }
});

export const { setCurrentUser } = usersSlice.actions;

export const { getCurrentUser } = usersSlice.selectors;
