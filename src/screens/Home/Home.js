import React from 'react';
import { string } from 'prop-types';
import {
  FlatList, View, Text,
} from 'react-native';

const propTypes = {
  key: string,
};

const defaultProps = {
  key: null,
};

const Home = ({ key }) => {
  const _a = 'placeholder';

  const flatlist_dummy = [
    {
      id: 0,
      song_name: 'Song Name',
      artist_name: 'Artist Name',
      music_service: 'Spotify',
      timestamp: 'a few minutes ago',
    },
    {
      id: 1,
      song_name: 'Song Name',
      artist_name: 'Artist Name',
      music_service: 'Apple Music',
      timestamp: 'a few minutes ago',
    },
    {
      id: 2,
      song_name: 'Song Name',
      artist_name: 'Artist Name',
      music_service: 'Youtube',
      timestamp: '2h ago',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={{ backgroundColor: '#A1223f' }}>
      <Text>{item.song_name}</Text>
      <Text>{item.artist_name}</Text>
      <Text>{item.timestamp}</Text>
      <Text>{item.music_service}</Text>
    </View>
  );

  return (
    <FlatList
      data={flatlist_dummy}
      renderItem={renderItem}
      keyExtractor={x => x.id}
    />
  );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
