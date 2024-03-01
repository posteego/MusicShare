import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 200,
  },
  mainText: (theme) => ({
    color: theme === 'dark' ? '#f2ee6e' : '#000',
    fontSize: 18,
    fontWeight: 'bold', 
  }),
});
