import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  subtext: (theme) => ({
    color: theme === 'dark' ? '#BFBD7C' : '#444444',
    fontSize: 12,
  }),
  titleText: (theme) => ({
    color: theme === 'dark' ? '#f2ee6e' : '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  }),
  text: (theme) => ({
    color: theme === 'dark' ? '#f2ee6e' : '#000000',
    fontSize: 16,
  }),
  flatListStyle: {
    flex: 1,
    marginTop: 5,
  },
  coverArt: {
    borderRadius: 4,
    width: 200,
    height: 200,
    marginVertical: 5,
  },
  shareButton: (pressed) => ({
    position: 'absolute',
    alignSelf: 'center',
    bottom: 5,
    backgroundColor: pressed ? 'black' : 'hsl(58, 50%, 85%)',
    borderWidth: 2,
    height: 60,
    width: 60,
    alignItems: 'center',
    paddingLeft: Platform.OS === 'ios' ? 2 : 0,
    justifyContent: 'center',
    borderRadius: 30,
  }),
  androidRipple: {
    color: '#a0a0a0',
    borderless: true,
    radius: 25,
  },
  platformContainer: {
    width: 170,
    alignItems: 'flex-start',
    // justifyContent: 'center',
    marginHorizontal: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 2,
    borderRadius: 4,
    backgroundColor: '#776DF2',
  },
  platformIcon: {
    marginBottom: 5,
  },
  platformText: (theme) => ({
    fontSize: 14,
    fontWeight: '600',
    color: theme === 'dark' ? '#f2ee6e' : '#FFFFFF',
    textAlign: 'center',
  }),
});
