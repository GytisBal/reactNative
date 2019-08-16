/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import env from 'react-native-config'

const config = {
    api: {
        host: env.API_HOST,
        timeout: 20000
    }
};

const API_HOST = config.api.host;

export {
    API_HOST
}

export default config

AppRegistry.registerComponent(appName, () => App);
