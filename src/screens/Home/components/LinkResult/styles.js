import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  rowContainer: (theme) => ({
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
    borderWidth: 2,
    borderColor: theme === 'dark' ? 'white' : 'black',
    borderRadius: 8,
    paddingVertical: 10,
    marginHorizontal: 8,
    marginBottom: 10,
    backgroundColor: theme === 'dark' ? 'black' : 'white', // '#13150a'
  }),
  titleText: (theme) => ({
    color: theme === 'dark' ? '#f2ee6e' : '#000',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 3,
  }),
  subtext: (theme) => ({
    color: theme === 'dark' ? '#f2ee6e' : '#444',
    fontSize: 10,
  }),
  text: (theme) => ({
    color: theme === 'dark' ? '#f2ee6e' : '#000',
    fontSize: 14,
  }),
  coverArt: {
    width: 120,
    height: 120,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 2,
    marginHorizontal: 12,
  },
  logos: {
    width: 130,
    height: 25,
  },
  flatListStyle: {
    flex: 1,
    marginTop: 5,
  },
  platformContainer: (theme) => ({
    width: 170,
    alignItems: 'flex-start',
    // justifyContent: 'center',
    marginHorizontal: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 2,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: theme === 'dark' ? 'white' : 'black',
    backgroundColor: '#ebeae0',
  }),
  platformText: (theme) => ({
    fontSize: 14,
    fontWeight: '800',
    color: theme === 'dark' ? 'black' : '#FFFFFF',
    textAlign: 'center',
  }),
});
