import axios from 'axios';
import Config from 'react-native-config';
import {storeToken, getToken, removeToken} from './AsyncStorage';

function parseError(messages) {
    // error
    if (messages) {
        if (messages instanceof Array) {
            return Promise.reject({messages: messages});
        } else {
            return Promise.reject({messages: [messages]});
        }
    } else {
        return Promise.reject({messages: ['error']});
    }
}

function parseBody(response) {
    if (response.status === 200) {
        return response;
    } else {
        return this.parseError(response.data.messages);
    }
}

let instance = axios.create({
    baseURL: getBaseUrl(),
    responseType: 'json',
});

instance.interceptors.request.use(function (config) {
    return getToken().then(token => {
        config.headers =
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };
        return config;
    });
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    let token = response.data.accessToken;
    removeToken();
    storeToken(token);
    return parseBody(response)
}, error => {
    removeToken()
    console.warn('Error status', error.response.status);
    // return Promise.reject(error)
    if (error.response) {
        return parseError(error.response.data);
    } else {
        return Promise.reject(error);
    }
});

// Helper functions
function getBaseUrl() {
    return Config.API_HOST_DEVICE_WORK;
}

function postRequest(url, data) {
    return instance.post(url, data);
}

export function login(user) {
    return postRequest(`login`, {email: user.email, password: user.password});
}

export function status() {
    return postRequest('statusRelay/', {id: 1});
}

export function toggle(device_id) {
    return postRequest(`controlRelay/`, {device_id: device_id});
}


