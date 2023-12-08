/**
 * @format
 */

import { AppRegistry, Text } from 'react-native';
import runApp from './App';

AppRegistry.getAppKeys();
Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

runApp();
