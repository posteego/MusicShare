import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  description: (theme) => ({
    color: theme === 'dark' ? '#BFBD7C' : 'black',
    lineHeight: 22,
    textAlign: 'justify',
    fontSize: 16,
    marginVertical: 5,
  }),
  buttonContainer: (theme, shouldDisableReset) => ({
    backgroundColor: shouldDisableReset ? '#999' : '#405FDF',
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
    fontSize: 20,
    fontWeight: '900',
  }),
});
