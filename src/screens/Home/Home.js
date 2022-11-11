import React, { useEffect } from 'react';
import { string } from 'prop-types';
import {
  FlatList, View, Text,
} from 'react-native';
import { useSongLink } from 'hooks';

const propTypes = {
  key: string,
};

const defaultProps = {
  key: null,
};

const PLATFORMS = [
  'amazonStore', // not found
  'amazonMusic', // not found
  'spinrilla',   // not found
  'audius',      // not found
  'audiomack',
  'anghami',
  'boomplay',
  'deezer',
  'appleMusic',
  'itunes',
  'napster',
  'pandora',
  'soundcloud',
  'tidal',
  'yandex',
  'youtube',
  'youtubeMusic',
  'spotify',
  ''
];

const Home = ({ key }) => {
  const _a = 'placeholder';

  const spotifyUrl = 'https://open.spotify.com/track/5KXvG7j3Uvs9yyORfjxPv8?si=bb59e3127ef64395';

  const {
    data, loading, error,
  } = useSongLink(spotifyUrl);

  const {
    type, artistName, title
  } = data;

  const flatlist_dummy = [
    {
      id: 0,
      type,
      title,
      artistName,
      musicService: 'Spotify',
      timestamp: 'a few minutes ago',
    },
    // {
    //   id: 0,
    //   type: 'song',
    //   title: 'title',
    //   artistName: 'name',
    //   musicService: 'Spotify',
    //   timestamp: 'a few minutes ago',
    // },
    {
      id: 1,
      type: 'song',
      title: 'Song Name',
      artistName: 'Artist Name',
      musicService: 'Apple Music',
      timestamp: 'a few minutes ago',
    },
    {
      id: 2,
      type: 'song',
      title: 'Song Name',
      artistName: 'Artist Name',
      musicService: 'Youtube',
      timestamp: '2h ago',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={{ backgroundColor: '#A1223f' }}>
      <Text>{item.type}</Text>
      <Text>{item.title}</Text>
      <Text>{item.artistName}</Text>
      <Text>{item.timestamp}</Text>
      <Text>{item.musicService}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={flatlist_dummy}
        renderItem={renderItem}
        keyExtractor={x => x.id}
        ListHeaderComponent={<Text>Sharing History</Text>}
      />
    </View>
  );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
