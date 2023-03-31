/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './application/builds/Nav';
// import App from './application/views/Test';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
