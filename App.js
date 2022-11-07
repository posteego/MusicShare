import { Navigation } from 'react-native-navigation';
import {
  registerAllScreens, startMainTabs,
} from 'navigation';

registerAllScreens();

const runApp = () => {
  Navigation.events().registerAppLaunchedListener(() => {
    startMainTabs();
  });
};

export default runApp;
