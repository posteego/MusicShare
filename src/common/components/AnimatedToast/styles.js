import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  toastContainer: (status) => ({
    position: 'absolute',
    zIndex: 4,
    backgroundColor: status ? 'hsl(320, 80%, 70%)' : 'hsl(120, 50%, 70%)', // make param
    width: '98%',
    borderWidth: 4,
    borderRadius: 4,
    padding: 10,
  }),
  textContainer: {
    alignItems: 'center',
  },
  title: (status) => ({
    color: 'black',
    fontWeight: 'bold',
  }),
  description: (status) => ({
    color: 'black',
  }),
});
