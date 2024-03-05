import React, { useEffect, useState } from 'react';
import { object, bool, func } from 'prop-types';
import {
  useColorScheme, Linking,
  View, Text, FlatList, TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSongStore } from 'stores';
import { useSongLink } from 'hooks';
import PLATFORMS from 'constants/platform-enum';
import styles from './styles';

const propTypes = {
  data: object,
  loading: bool,
  setToastName: func,
  setShowToast: func,
};

const defaultProps = {
  data: null,
  loading: false,
  setToastName: () => {},
  setShowToast: () => {},
};

const capitalizeLetters_ui = (words) => {
  if (words === 'itunes') return 'iTunes';
  if (words === 'soundcloud') return 'SoundCloud';
  const chop = words.split(" ");
  const notSlop = chop.map(w => w[0].toUpperCase() + w.substr(1)).join(' ');
  return notSlop;
}

const LinkResult = ({ loading, setToastName, setShowToast }) => {
  const theme = useColorScheme();
  const { data: songData } = useSongLink();

  const renderPlatformsAvailable = ({ item }) => {
    let name = PLATFORMS[item.name].name;
    let src = PLATFORMS[item.name].logo_path;

    return (
      <TouchableOpacity
        key={item.id}
        // style={[styles.platformContainer]}
        onPress={() => {
          /* copy URL to clipboard and show success toast */
          Clipboard.setString(item.url);
          setToastName(name);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
        }}
        delayLongPress={500}
        onLongPress={() => {
          /* open URL in dedicated app */
          const isSupported = Linking.canOpenURL(item.url);
          if (isSupported) {
            Linking.openURL(item.url);
            // call toast with correct modifiers
          } else {
            Alert.alert(`This url might be broken: ${item.url}`);
          }
        }}
        onPressIn={() => {

        }}
      >
        <View
          style={[styles.platformContainer]}
        >
          {src !== ''
            ? <>
              <Text style={[styles.platformText(theme)]}>{name}</Text>
              <FastImage
                source={{
                  uri: src,
                }}
              />
            </>
            : <>
              <Text style={[styles.platformText(theme)]}>{name}</Text>
            </>}
        </View>
      </TouchableOpacity>
    );
  };

  return songData.lastSongUrl ? <>
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.subtext(theme)}>{songData.lastSongType}</Text>
        <Text style={styles.subtext(theme)}>from {capitalizeLetters_ui(songData.lastSongOrigin)}</Text>
      </View>
      <FastImage
        style={styles.coverArt}
        source={{ uri: songData.lastSongThumbnail, priority: 'high' }}
      />
    </View>
    <View style={{ alignItems: 'center', marginBottom: 5, marginHorizontal: 20 }}>
      <Text style={[styles.titleText(theme), { textAlign: 'center' }]}>
        {songData.lastSongName}
      </Text>
      <Text style={[styles.text(theme), { textAlign: 'center' }]}>
        {songData.lastSongArtist}
      </Text>
    </View>
    <FlatList
      style={styles.flatListStyle}
      scrollEnabled={false}
      numColumns={2}
      data={songData.platformsAvailable ?? null}
      renderItem={renderPlatformsAvailable}
      keyExtractor={item => item.id}
      refreshing={loading}
    />
  </>
    : <>
      <View style={{ position: 'absolute', top: 0, bottom: 100, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
        <FastImage
          source={require('assets/home/beatbridge1-500.png')}
          style={{
            height: 200,
            width: 200,
            marginBottom: 20,
          }}
        />
        <Text style={[styles.titleText(theme), {
          textAlign: 'center',
          marginBottom: 20,
        }]}>
          Convert your music link to other services
        </Text>
        <View>
          <Text style={[styles.text(theme), { paddingHorizontal: 24, marginBottom: 4 }]}>
            1. Copy music link from source (e.g Spotify)*
          </Text>
          <Text style={[styles.subtext(theme), { paddingHorizontal: 24, marginVertical: 0 }]}>
            Sources supported by Odesli.co
          </Text>
          <Text style={[styles.text(theme), { paddingHorizontal: 24, marginTop: 10, marginBottom: 4 }]}>
            2. Paste link by pressing the <Icon name="arrow-up" size={20} color={theme === 'dark' ? '#f2ee6e' : 'black'} /> button
          </Text>
          <Text style={[styles.subtext(theme), { paddingHorizontal: 24, marginVertical: 0 }]}>
            Make sure to "Allow Paste"
          </Text>
          <Text style={[styles.text(theme), { paddingHorizontal: 24, marginVertical: 10 }]}>
            3. Tap to COPY link, Hold to OPEN link
          </Text>
        </View>
      </View>
    </>;
};

LinkResult.propTypes = propTypes;
LinkResult.defaultProps = defaultProps;

export default LinkResult;
