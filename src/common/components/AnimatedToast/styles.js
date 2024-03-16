import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  toastContainer: (status) => ({
    position: 'absolute',
    zIndex: 4,
    backgroundColor: status ? '#FC5B81' : '#96FA5A', // make param
    width: '90%',
    borderRadius: 4,
    padding: 10,
  }),
  textContainer: {
    alignItems: 'center',
  },
  title: (status) => ({
    color: status ? 'white' : 'black',
    fontWeight: 'bold',
  }),
  description: (status) => ({
    color: status ? 'white' : 'black',
  }),
});
