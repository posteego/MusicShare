import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import {
  FlatList, View, Text, Image, Pressable, Modal, TouchableOpacity, ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import isUrl from 'validator/lib/isURL';
import { useSongLink } from 'hooks';
import { useSongStore } from 'stores';
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
  const { data, loading, error, requestFetch } = useSongLink(pastedUrl, selectedPlatform);

  const {lastSongShared, updateSong, removeSong } = useSongStore();

  console.log({ lastSongShared });
  useEffect(() => {
    if (pastedUrl && selectedPlatform) {
      requestFetch();
      setSelectedPlatform(null);
    }
  }, [pastedUrl, selectedPlatform]);

  useEffect(() => {
    if (pastedUrl) setModalVisible(true);
    else setModalVisible(false);
  }, [pastedUrl]);

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
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => { setModalVisible(false); }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {PLATFORMS.map(renderPlatform)}
          </View>
        </View>
      </Modal>
      {/* Only showing the last shared song. If none, show instructions */}
      <View style={styles.container}>
        <Text>Here lies a song you shared 🗿</Text>
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
