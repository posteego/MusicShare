import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  description: (theme) => ({
    color: theme === 'dark' ? '#BFBD7C' : 'black',
    lineHeight: 22,
    textAlign: 'justify',
    fontSize: 16,
    marginVertical: 5,
    fontWeight: '300',
  }),
  buttonLabel: (theme) => ({
    color: theme === 'dark' ? '#f2ee6e' : 'black',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  }),
  buttonContainer: (theme, shouldDisableReset) => ({
    backgroundColor: shouldDisableReset ? '#AAA' : '#776DF2',
    opacity: shouldDisableReset ? 0.5 : 1,
    alignSelf: 'center',
    justifyContent: 'center',
    width: 250,
    height: 50,
    borderRadius: 4,
  }),
  buttonText: (theme) => ({
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
  }),
  dropdownButton: (theme) => ({
    backgroundColor: theme == 'dark' ?
      'hsl(148,75%,20%)' : 'hsl(148,75%,55%)',
    borderRadius: 4,
    width: 340,
  }),
  dropdown: (theme) => ({
    backgroundColor: theme === 'dark' ? '#776DF2' : '#ffda5c',
    height: '60%',
    padding: 10,
    borderRadius: 5,
  }),
  dropdownRow: (theme) => ({
    backgroundColor: theme === 'dark' ? '#f2ee6e' : '#776DF2',
    borderBottomWidth: 3,
    borderBottomColor: 'black',
    borderLeftWidth: 1,
    borderLeftColor: 'black',
    borderRightWidth: 3,
    borderTopWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginVertical: 4,
    height: 60,
  }),
  dropdownRowText: (theme) => ({
    fontWeight: '900',
    color: theme === 'dark' ? '#776DF2' : '#f2ee6e',
  }),
  selectedRow: (theme) => ({
    backgroundColor: theme === 'dark' ? '#574BEA' : '#f2ee6e',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: 'black',
    borderLeftColor: 'black',
    borderColor: 'black',
  }),
  selectedRowText: (theme) => ({
    color: theme === 'dark' ? '#f2ee6e' : 'black',
  }),
});
