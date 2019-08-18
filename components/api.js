import axios from 'axios';
import Config from 'react-native-config';

let api;

function getInitializedApi() {
    return (api = axios.create({
        baseURL: getBaseUrl(),
        responseType: 'json',
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    }));
}

// Helper functions
function getBaseUrl() {

    return Config.API_HOST_EMULATOR
}

function get(url) {
    return getInitializedApi().get(url);
}

function post(url, data) {

    return getInitializedApi().post(url, data);
}



export function login(user) {

    return post(`login`, {email: user.email, password: user.password});
}