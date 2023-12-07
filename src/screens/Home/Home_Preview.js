import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import {
  FlatList, View, Text, Image,
  Pressable, Modal, TouchableOpacity, ScrollView,
  useColorScheme,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import isUrl from 'validator/lib/isURL';
import { useSongLink } from 'hooks';
import { zustandStorage } from 'stores';
import PLATFORMS from 'constants/platform-enum';
import styles from './styles';

const propTypes = {
  key: string,
};

const defaultProps = {
  key: null,
};

const Home_Preview = ({ key }) => {
  const theme = useColorScheme();
  const [pastedUrl, setPastedUrl] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // REMOVE
  const [selectedPlatform, setSelectedPlatform] = useState(null); // REMOVE
  // grab zustand data from the hook, not from home screen
  const { data, loading, error, requestFetch } = useSongLink(pastedUrl);

  // song data
  const songUrl = zustandStorage.getItem('lastSongUrl');
  const songName = zustandStorage.getItem('lastSongName');
  const artistName = zustandStorage.getItem('lastSongArtist');
  const convertedTo = zustandStorage.getItem('lastSongConversion');
  const thumbnail = zustandStorage.getItem('lastSongThumbnail');
  const origin = zustandStorage.getItem('lastSongOrigin');
  const songType = zustandStorage.getItem('lastSongType');
  const platformsAvailable = JSON.parse(zustandStorage.getItem('platformsAvailable')) ?? null;

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

  // useEffect(() => {
  //   if (data) {
  //     console.log({ data });
  //     Clipboard.setString(data);
  //     alert('URL copied to clipboard!');
  //   }
  // }, [data]);

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
      <Text style={styles.platformText(theme)}>{platform}</Text>
    </TouchableOpacity>
  );

  const renderPlatformsAvailable = ({ item }) => {
    let name = PLATFORMS[item.name].name;
    let src = PLATFORMS[item.name].logo_path;

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.platformContainer}
        onPress={() => handlePlatformSelect(item.name)}
      >
        {src !== ''
          ? <>
            <Text style={styles.platformText(theme)}>{name}</Text>
            <FastImage
              source={{
                uri: src,
              }}
            />
          </>
          : <>
            <Text style={styles.platformText(theme)}>{name}</Text>
          </>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Only showing the last shared song. If none, show instructions */}
      <View style={{
        flex: 1,
        alignItems: 'center'
      }}>
        <View>
          <Text style={styles.text(theme)}>From {origin}</Text>
          <Image
            style={styles.coverArt}
            source={{
              uri: thumbnail,
              width: 150,
              height: 150,
            }}
          />
        </View>
        <Text style={styles.text(theme)}>{songType}</Text>
        <Text style={styles.text(theme)}>{songName}</Text>
        <Text style={styles.text(theme)}>{artistName}</Text>
        <Text style={styles.text(theme)}>{convertedTo}</Text>
        <FlatList
          scrollEnabled={false}
          numColumns={2}
          data={platformsAvailable}
          renderItem={renderPlatformsAvailable}
          keyExtractor={item => item.id}
        />
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
