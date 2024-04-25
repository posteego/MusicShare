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
      light: 'hsl(55, 21.60%, 90.00%)',
      dark: 'hsl(58, 35.50%, 6.10%)',
    },
    orientation: 'portrait',
  },
  statusBar: {
    backgroundColor: {
      light: 'hsl(55, 21.60%, 90.00%)',
      dark: 'hsl(58, 35.50%, 6.10%)',
    },
  },
  bottomTabs: {
    // translucent: true,
    // barStyle: 'black',
    backgroundColor: {
      light: 'hsl(55, 21.60%, 90.00%)',
      dark: 'hsl(58, 35.50%, 6.10%)', // 121212
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
      light: 'hsl(58, 20%, 10%)',
      dark: 'hsl(58, 80%, 69.00%)',
    },
    selectedIconColor: {
      light: 'hsl(58, 20%, 10%)',
      dark: 'hsl(58, 80%, 69.00%)',
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
        light: '#ebeae0',
        dark: '#13150a', // 1212
      },
      // translucent: true,
    },
    title: {
      fontSize: 24,
      color: {
        light: 'hsl(58, 20%, 10%)',
        dark: 'hsl(58, 80%, 69%)',
      },
    },
    subtitle: {
      color: 'hsl(58, 10%, 40%)',
      fontSize: 8,
    },
  },
};

export const startMainTabs = async () => {
  // set global styles
  Navigation.setDefaultOptions(mainStyleOptions);
  // initialize root
  await Navigation.setRoot(mainRoot);
};
