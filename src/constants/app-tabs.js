const UI_TABS = Object.freeze({
  HOME: 'HOME',
  SETTINGS: 'SETTINGS',
});

export const APP_TABS = Object.freeze({
  [UI_TABS.HOME]: {
    tabNum: 0,
    value: UI_TABS.HOME,
    formatted: 'Home',
    stackId: 'homeStack',
    routeName: 'Home',
    compId: 'homeScreen',
    topBarId: 'homeTopBar',
  },
  [UI_TABS.SETTINGS]: {
    tabNum: 1,
    value: UI_TABS.SETTINGS,
    formatted: 'Settings',
    stackId: 'settingsStack',
    routeName: 'Settings',
    compId: 'settingsScreen',
    topBarId: 'settingsTopBar',
  },
});

export default UI_TABS;
