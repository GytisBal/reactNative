import axios from 'axios';
import Config from 'react-native-config';

let api;

function getInitializedApi() {
    return (api = axios.create({
        baseURL: getBaseUrl(),
        responseType: 'json',
    }));
}

// Helper functions
function getBaseUrl() {

    return 'https://shelly-1-eu.shelly.cloud/device/relay/'
}

function get(url) {
    return getInitializedApi().get(url);
}

function post(url, data) {
console.log(data)
    return getInitializedApi().post(url, data);
}



export function toggle(user) {
    console.log("labas")

    return post('control/', data);
}
