import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  rowContainer: (theme) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme === 'dark' ? 'hsl(58, 20%, 6%)' : 'hsl(58, 50%, 90%)', // '#13150a'
    paddingVertical: 8,
    marginHorizontal: 8,
    marginBottom: 8,
    borderWidth: 4,
    borderRadius: 8,
    borderColor: theme === 'dark' ? 'white' : 'hsl(58, 20%, 10%)',
  }),
  titleText: (theme) => ({
    color: theme === 'dark' ? 'hsl(58, 80%, 69.00%)' : '#000',
    fontSize: 24,
    fontWeight: '800',
    marginVertical: 3,
  }),
  subtext: (theme) => ({
    color: theme === 'dark' ? 'hsl(58, 80%, 69.00%)' : '#444',
    fontSize: 10,
    fontWeight: '600',
  }),
  text: (theme) => ({
    color: theme === 'dark' ? 'hsl(58, 80%, 69.00%)' : '#000',
    fontSize: 16,
    fontWeight: '600',
  }),
  coverArt: {
    width: 120,
    height: 120,
    borderColor: 'hsl(58, 20%, 10%)',
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
    justifyContent: 'center',
    marginHorizontal: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 2,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: theme === 'dark' ? 'hsl(58, 100%, 85%)' : 'hsl(58, 20%, 10%)',
    backgroundColor: theme === 'dark' ? 'hsl(58, 40%, 85%)' : 'hsl(58, 50%, 85%)'// 'hsl(58, 40%, 85%),
  }),
  platformText: (theme) => ({
    fontSize: 16,
    fontWeight: '800',
    color: theme === 'dark' ? 'black' : '#FFFFFF',
    textAlign: 'center',
  }),
});
