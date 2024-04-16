import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Stores some data in local storage
 * @param key The key value of the data to be stored so it can be retrieved later
 * @param value The data to be stored
 */
export const storeLocalData = async (key: string, value: object | string): Promise<undefined> => {
    try {
        let storeValue;
        if (value instanceof Object) {
            storeValue = JSON.stringify(value);
        } else {
            storeValue = value;
        }
        await AsyncStorage.setItem('user', storeValue);
    } catch (err) {
        console.error(`Failed to store data locally.`, err);
    }
}

/**
 * Removes the local data associated with the key
 * @param key The key value for the data
 */
export const removeLocalData = async (key: string): Promise<undefined> => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (err) {
        console.error(`Failed to remove local data`, err);
    }
}

/**
 * Retrieves some data from the the local storage
 * @param key Key for the data that is stored
 * @returns string value of the data that is stored
 */
export const getLocalData = async (key: string): Promise<string | null> => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue;
    } catch (err) {
        console.error(`Failed to retrieve local stored data.`, err);
        return null;
    }
}