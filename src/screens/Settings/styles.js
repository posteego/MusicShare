import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  description: (theme) => ({
    color: theme === 'dark' ? '#BFBD7C' : 'black',
    lineHeight: 20,
    textAlign: 'justify',
    marginVertical: 5,
  }),
});
