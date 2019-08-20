import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';


let api;
const getToken= async () => {
    try {
        const value = await AsyncStorage.getItem(access_token);
        if (value !== null) {
            return value
        }
    } catch (error) {
        console.log(error)
    }
};

function getInitializedApi() {
    const token = getToken();
    return (api = axios.create({
        baseURL: getBaseUrl(),
        responseType: 'json',
        // withCredentials: true,
        headers: {
            'Authorization':'Bearer ' ,
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    }));
}

// Helper functions
function getBaseUrl() {

    return Config.API_HOST_DEVICE_WORK
}

function get(url) {
    return getInitializedApi().get(url);
}

function post(url, data, token) {
    return getInitializedApi(token).post(url, data);
}



export function login(user) {

    return post(`login`, {email: user.email, password: user.password});
}
export function status() {

    return post('statusRelay/', {id: 1});
}
export function toggle() {

    return post(`controlRelay/`, {id: 1});
}


