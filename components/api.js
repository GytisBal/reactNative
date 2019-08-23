import axios from 'axios';
import Config from 'react-native-config';

let api;
function getInitializedApi(token) {
    return (api = axios.create({
        baseURL: getBaseUrl(),
        responseType: 'json',
        headers: {
            'Authorization':`Bearer ${token}`,
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    }));
}

// Helper functions
function getBaseUrl() {
    return Config.API_HOST_DEVICE_WORK
}

// function getRequest(url) {
//     return getInitializedApi().get(url);
// }

function postRequest(url, data, token) {
    return getInitializedApi(token).post(url, data);
}

export function login(user) {
    return postRequest(`login`, {email: user.email, password: user.password});
}

export function status(token) {
    return postRequest('statusRelay/', {id: 1}, token);
}

export function toggle(token) {

    return postRequest(`controlRelay/`, {id: 1}, token);
}


