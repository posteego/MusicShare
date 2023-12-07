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

// setting options here to avoid clutter
const mainStyleOptions = {
  layout: {
    componentBackgroundColor: {
      light: '#fff',
      dark: '#121212',
    },
    orientation: 'portrait',
  },
  statusBar: {
    backgroundColor: {
      light: '#fff',
      dark: '#121212',
    },
  },
  bottomTabs: {
    // translucent: true,
    // barStyle: 'black',
    backgroundColor: {
      light: '#fff',
      dark: '#121212',
    },
    tabsAttachMode: 'afterInitialTab',
    titleDisplayMode: 'alwaysShow',
    animateTabSelection: false,
    hideShadow: true, // removes border from bottom tab bar
  },
  bottomTab: {
    fontSize: 12,
    selectedFontSize: 12,
    textColor: '#c0c0c0',
    selectedTextColor: {
      light: '#000',
      dark: '#f2ee6e',
    },
    selectedIconColor: {
      light: '#000',
      dark: '#f2ee6e',
    },
  },
  topBar: {
    visible: true,
    noborder: true,
    elevation: 0,
    scrollEdgeAppearance: {
      noBorder: true,
    },
    background: {
      color: {
        light: '#fff',
        dark: '#121212',
      },
      // translucent: true,
    },
    title: {
      fontSize: 20,
      color: {
        light: '#000',
        dark: '#f2ee6e',
      },
    },
    subtitle: {
      color: '#495057',
      fontSize: 14,
    },
  },
};

export const startMainTabs = async () => {
  // set global styles
  Navigation.setDefaultOptions(mainStyleOptions);
  // initialize root
  await Navigation.setRoot(mainRoot);
};
