import { User } from "../models/user";
import { getLocalData, removeLocalData, storeLocalData } from "./utils";

/**
 * Signs the user into the application
 * 1. TODO: Fetch user data from backend
 * 2. Stores the user data locally
 * 3. Stores the user data in the state
 * @param user User data to sign in
 * @param dispatch Redux dispatch to leverage reducer
 * @param action Redux reducer to store user data in the store
 * @returns User data if exists, otherwise undefined
 */
export const signUserIn = async (user: object, dispatch: any, action: any): Promise<User | undefined> => {
    await storeLocalData('user', user);
    dispatch(action(user));

    return user as User;
}

/**
 * Signs the user out of the application
 * 1. Removes the user data locally
 * 2. Removes the user data from the state
 * @param dispatch Redux dispatch to leverage reducer
 * @param action Redux reducer to remove user data in the store
 */
export const signUserOut = async (dispatch: any, action: any): Promise<undefined> => {
    await removeLocalData('user');
    dispatch(action(undefined));
}

/**
 * Checks if there is local data for the user. Returns the data if it does.
 * Also will sign the user in if flag is supplied
 * @param signUserIn Flag that if set will sign the user in
 * @param dispatch Redux dispatch to leverage reducer
 * @param action Redux reducer to store user data in the store
 * @returns User data if exists, otherwise undefined
 */
export const userIsStoredLocally = async (signUserIn?: boolean, dispatch?: any, action?: any): Promise<User | undefined> => {
    let userData = await getLocalData('user');
    if (userData) {
        userData = JSON.parse(userData);

        if (signUserIn) {
            dispatch(action(userData));
        }
    
        return userData as unknown as User;
    }
}