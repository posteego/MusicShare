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
});
