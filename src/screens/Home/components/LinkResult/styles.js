import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  demoContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    height: 40,
    padding: 8,
    marginTop: 8,
    backgroundColor: 'hsl(58, 50%, 85%)',
    borderRadius: 4,
    borderWidth: 2,
  },
  rowContainer: (theme) => ({
    flexDirection: 'row',
    backgroundColor: theme === 'dark' ? 'hsl(58, 20%, 6%)' : 'hsl(58, 50%, 90%)', // '#13150a'
    padding: 8,
    marginHorizontal: 8,
    marginVertical: 4,
    borderWidth: 4,
    borderRadius: 8,
    borderColor: theme === 'dark' ? 'hsl(58, 100%, 85%)' : 'hsl(58, 20%, 10%)',
  }),
  titleText: (theme) => ({
    color: theme === 'dark' ? 'hsl(58, 80%, 69.00%)' : 'hsl(58, 20%, 10%)',
    fontSize: 24,
    fontWeight: '800',
    marginVertical: 3,
  }),
  subtext: (theme) => ({
    color: 'hsl(58, 10%, 40%)',
    fontSize: 10,
    fontWeight: '600',
  }),
  text: (theme) => ({
    color: theme === 'dark' ? 'hsl(58, 80%, 69.00%)' : 'hsl(58, 20%, 10%)',
    fontSize: 16,
    fontWeight: '600',
  }),
  coverArt: {
    width: 120,
    height: 120,
    borderColor: 'hsl(58, 20%, 10%)',
    borderWidth: 1,
    borderRadius: 2,
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
    borderColor: theme === 'dark' ? 'hsl(58, 100%, 90%)' : 'hsl(58, 20%, 10%)',
    backgroundColor: theme === 'dark' ? 'hsl(58, 50%, 75%)' : 'hsl(58, 50%, 85%)'// 'hsl(58, 40%, 85%),
  }),
  platformText: (theme) => ({
    fontSize: 16,
    fontWeight: '800',
    color: theme === 'dark' ? 'black' : 'hsl(58, 20%, 10%)',
    textAlign: 'center',
  }),
});
