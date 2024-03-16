import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  titleText: (theme) => ({
    color: theme === 'dark' ? '#f2ee6e' : '#000',
    fontSize: 16,
    fontWeight: 'bold',
  }),
  subtext: (theme) => ({
    color: theme === 'dark' ? '#f2ee6e' : '#444',
    fontSize: 12,
  }),
  text: (theme) => ({
    color: theme === 'dark' ? '#f2ee6e' : '#000',
    fontSize: 16,
  }),
  coverArt: {
    borderRadius: 4,
    width: 200,
    height: 200,
    marginVertical: 5,
  },
  flatListStyle: {
    flex: 1,
    marginTop: 5,
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
  platformText: (theme) => ({
    fontSize: 14,
    fontWeight: '800',
    color: theme === 'dark' ? '#FFF' : '#FFFFFF',
    textAlign: 'center',
  }),
});
