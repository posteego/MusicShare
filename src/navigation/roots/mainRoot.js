import UI_TABS, { APP_TABS } from 'constants/app-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

const getTabIcon = (tabName, selected) => {
  switch (tabName) {
    case UI_TABS.HOME:
      return selected ? 'headset' : 'headset-outline';
    case UI_TABS.SETTINGS:
      return selected ? 'options' : 'options-outline';
    default:
      return;
  }
};

/*
/* ICONS */
// HOME ICON
const homeIcon = Icon.getImageSourceSync(
  getTabIcon(UI_TABS.HOME, false),
  24,
  '#A0A0A0',
);
const homeIconSelected = Icon.getImageSourceSync(
  getTabIcon(UI_TABS.HOME, true),
  24,
  '#000',
);
// SETTINGS ICON
const settingsIcon = Icon.getImageSourceSync(
  getTabIcon(UI_TABS.SETTINGS, false),
  24,
  '#A0A0A0',
);
const settingsIconSelected = Icon.getImageSourceSync(
  getTabIcon(UI_TABS.SETTINGS, true),
  24,
  '#000',
);


/*
/* COMPONENT STYLES */
// TopBar
const topBar = (title, subtitle = null, leftButtons, rightButtons) => (
  {
    // largeTitle: {
    //   visible: true,
    // },
    ...title && {
      title: {
        text: title,
        // fontSize: 24,
        fontWeight: 'bold',
        alignment: 'center',
        // component: {
        //   id: id,
        //   name: 'TitleComponent',
        // }
      }
    },
    ...subtitle && {
      subtitle: {
        text: subtitle,
      },
    },
    leftButtons,
    rightButtons,
  }
);

/*
/* ROOT */
export default {
  root: {
    bottomTabs: {
      id: 'tabs', children: [
        {
          stack: {
            id: APP_TABS[UI_TABS.HOME].stackId, children: [
              {
                component: {
                  id: APP_TABS[UI_TABS.HOME].compId,
                  name: 'Home', options: {
                    topBar: topBar('Tuneposts'),
                    bottomTab: {
                      text: 'Home',
                      icon: homeIcon,
                      selectedIcon: homeIconSelected,
                    },
                  },
                },
              }
            ],
          },
        }, {
          stack: {
            id: APP_TABS[UI_TABS.SETTINGS].stackId, children: [
              {
                component: {
                  id: APP_TABS[UI_TABS.SETTINGS].compId,
                  name: 'Settings', options: {
                    topBar: topBar('Settings'),
                    bottomTab: {
                      text: 'Settings',
                      icon: settingsIcon,
                      selectedIcon: settingsIconSelected,
                    },
                  },
                },
              }
            ],
          },
        },
      ]
    }
  }
};
