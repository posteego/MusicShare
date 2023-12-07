import { StyleSheet, Platform, PixelRatio } from 'react-native';

// const primaryFontColor = useColorScheme() === 'dark' ? '#f2ee6e' : '#000000';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    marginHorizontal: 20,
  },
  text: theme => ({
    color: theme === 'dark' ? '#776DF2' : '#000000',
  }),
  songCard: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  coverArt: {
    borderRadius: 4,
  },
  songCardRight: {
    flex: 1,
    marginLeft: 10,
  },
  timestamp: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  songTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  artistName: {
    fontSize: 16,
  },
  cardLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cardLabel: {
    fontSize: 12,
  },
  shareButton: (pressed) => ({
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
    backgroundColor: pressed ? 'white' : 'black',
    height: 50,
    width: 50,
    alignItems: 'center',
    paddingLeft: Platform.OS === 'ios' ? 2 : 0,
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 2 },
    shadowRadius: 3,
    shadowOpacity: pressed ? 0 : 0.5,
  }),
  androidRipple: {
    color: '#a0a0a0',
    borderless: true,
    radius: 25,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    margin: 20,
  },
  platformContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  platformIcon: {
    marginBottom: 5,
  },
  platformText: theme => ({
    fontSize: 20,
    fontWeight: '700',
    color: theme === 'dark' ? '#f2ee6e': '#000000',
    textAlign: 'center',
  }),
});
