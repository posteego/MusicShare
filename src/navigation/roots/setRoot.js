import { Navigation } from "react-native-navigation";
import mainRoot from "./mainRoot";

// startLoading
// not sure if this works
// export const startLoading = async () => {
//   await Navigation.setRoot(loadingRoot);
// };

// setLoginRootWall
// splash page that includes login ===> "auth wall"
// export const setLoginRootWall = async () => {
  // //  ** clear any cache data here
  // //  ** set any global styles here
  // await Navigation.setRoot(loginRoot);
// };

export const startMainTabs = async () => {
  // set global styles
  Navigation.setDefaultOptions({
    layout: {
      screenBackgroundColor: '#fff',
    },
    bottomTabs: {
      tabsAttachMode: 'afterInitialTab',
      titleDisplayMode: 'alwaysShow',
      // animateTabSelection: false,
    },
    bottomTab: {
      fontSize: 12,
      selectedFontSize: 12,
      textColor: '#c0c0c0',
      selectedTextColor: '#000',
      selectedIconColor: '#000',
    },
    topBar: {
      title: {
        fontSize: 20,
        color: '#000',
      },
    },
  });
  // initialize root
  await Navigation.setRoot(mainRoot);
};
