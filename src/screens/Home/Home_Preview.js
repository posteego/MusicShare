import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import {
  FlatList, View, Text, Image, Pressable, Modal, TouchableOpacity, ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import isUrl from 'validator/lib/isURL';
import { useSongLink } from 'hooks';
import { zustandStorage } from 'stores';
import styles from './styles';

const propTypes = {
  key: string,
};

const defaultProps = {
  key: null,
};

const PLATFORMS = [
  // 'spotify',
  'appleMusic',
  'youtube',
  'youtubeMusic',
  // 'pandora',
  // 'deezer',
  // 'tidal',
  'amazonMusic',
  // 'soundcloud',
  // 'napster',
  // 'yandex',
  // 'spinrilla',
  // 'audius',
  'itunes',
  'googleStore',
  'amazonStore',
];

const platformIcons = {
  // spotify: 'logo-spotify',
  appleMusic: 'logo-apple',
  youtube: 'logo-youtube',
  youtubeMusic: 'logo-youtube',
  // pandora: 'logo-pandora',
  // deezer: 'logo-deezer',
  // tidal: 'logo-tidal',
  amazonMusic: 'logo-amazon',
  // soundcloud: 'logo-soundcloud',
  // napster: 'logo-napster',
  // yandex: 'logo-yandex',
  // spinrilla: 'logo-spinrilla',
  // audius: 'logo-audius',
  itunes: 'logo-apple',
  googleStore: 'logo-google-playstore',
  amazonStore: 'logo-amazon',
};

const Home_Preview = ({ key }) => {
  const [pastedUrl, setPastedUrl] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const { data, loading, error, requestFetch } = useSongLink(pastedUrl);

  // song data
  let songUrl = zustandStorage.getItem('lastSongUrl');
  let songName = zustandStorage.getItem('lastSongName');
  let artistName = zustandStorage.getItem('lastSongArtist');
  let convertedTo = zustandStorage.getItem('lastSongConversion');
  let thumbnail = zustandStorage.getItem('lastSongThumbnail');
  let origin = zustandStorage.getItem('lastSongOrigin');
  let songType = zustandStorage.getItem('lastSongType');
  let platformsAvailable = zustandStorage.getItem('platformsAvailable');

  useEffect(() => {
    if (pastedUrl) {
      requestFetch();
      // setSelectedPlatform(null);
    }
  }, [pastedUrl]);

  // useEffect(() => {
  //   if (pastedUrl) setModalVisible(true);
  //   else setModalVisible(false);
  // }, [pastedUrl]);

  useEffect(() => {
    if (data) {
      console.log({ data });
      Clipboard.setString(data);
      alert('URL copied to clipboard!');
    }
  }, [data]);

  const getUrl = async () => {
    try {
      const clipboardUrl = await Clipboard.getString();
      if (await isUrl(clipboardUrl)) setPastedUrl(clipboardUrl);
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const handleNewShare = async () => {
    getUrl();
  };

  const handlePlatformSelect = async (platform) => {
    setSelectedPlatform(platform);
    setModalVisible(false);
  };

  const renderPlatform = (platform) => (
    <TouchableOpacity key={platform} style={styles.platformContainer} onPress={() => handlePlatformSelect(platform)}>
      <Icon name={platformIcons[platform]} size={48} style={styles.platformIcon} />
      <Text style={styles.platformText}>{platform}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Only showing the last shared song. If none, show instructions */}
      <View style={styles.container}>
        <Text>Here lies a song you shared 🗿</Text>
        <Image
          style={styles.coverArt}
          source={{
            uri: thumbnail,
            width: 200,
            height: 200,
          }}
        />
        <Text>{songType}</Text>
        <Text>{songName}</Text>
        <Text>{artistName}</Text>
        <Text>{origin}</Text>
        <Text>{convertedTo}</Text>
        <Text>{platformsAvailable}</Text>
      </View>
      <Pressable
        onPress={handleNewShare}
        style={({ pressed }) => [styles.shareButton(pressed)]}
        android_ripple={styles.androidRipple}
      >
        {({ pressed }) => (
          <Icon
            name="duplicate-outline"
            size={28}
            color={pressed ? 'black' : 'white'}
          />
        )}
      </Pressable>
    </View>
  );
};

Home_Preview.propTypes = propTypes;
Home_Preview.defaultProps = defaultProps;

export default Home_Preview;
