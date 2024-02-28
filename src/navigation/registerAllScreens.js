/* need to organize screen registration in a central point, */
/* here lies registerAllScreens -- ScreenRegistry */

import { Navigation } from "react-native-navigation";
import Home from 'screens/Home';
import Settings from 'screens/Settings';

const screenName = componentObj => `BeatBridge.${Object.keys(componentObj)[0]}`;

export default () => {
  Navigation.registerComponent('Home', () => Home);
  Navigation.registerComponent('Settings', () => Settings);
};
