import AsyncStorage from '@react-native-community/async-storage';

const access_token = '';
export const storeToken = async (accessToken) => {
    try {
        await AsyncStorage.setItem(access_token, accessToken);
    } catch (error) {
        console.log(error);
    }
};
export const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem(access_token);
        if (value !== null) {
            return value;
        }
    } catch (error) {
        console.log(error);
    }
};
export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem(access_token);
    } catch (error) {
        console.log(error);
    }
};
