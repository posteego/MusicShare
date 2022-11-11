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
      backgroundColor: '#fff',
      orientation: 'portrait',
    },
    statusBar: {
      backgroundColor: '#fff',
    },
    bottomTabs: {
      // translucent: true,
      // barStyle: 'black',
      tabsAttachMode: 'afterInitialTab',
      titleDisplayMode: 'alwaysShow',
      animateTabSelection: false,
    },
    bottomTab: {
      fontSize: 12,
      selectedFontSize: 12,
      textColor: '#c0c0c0',
      selectedTextColor: '#000',
      selectedIconColor: '#000',
    },
    topBar: {
      visible: true,
      noborder: true,
      elevation: 0,
      scrollEdgeAppearance: {
        noBorder: true,
      },
      background: {
        color: '#fff',
        // translucent: true,
      },
      title: {
        fontSize: 20,
        color: '#000',
      },
      subtitle: {
        color: '#495057',
        fontSize: 14,
      },
    },
  });
  // initialize root
  await Navigation.setRoot(mainRoot);
};
