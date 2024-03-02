import React from 'react';
import { object, bool } from 'prop-types';
import {
  useColorScheme,
  View, Text, FlatList, TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import { zustandStorage } from 'stores';
import styles from './styles';

const propTypes = {
  data: object,
  loading: bool,
};

const defaultProps = {
  data: null,
  loading: false,
};

const renderPlatformsAvailable = ({ item }) => {
  let name = PLATFORMS[item.name].name;
  let src = PLATFORMS[item.name].logo_path;

  return (
    <TouchableOpacity
      key={item.id}
      style={[styles.platformContainer]}
      onPress={() => {
        Clipboard.setString(item.url);
        setName(name);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }}
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
    </TouchableOpacity>
  );
};

const LinkResult = ({ data }) => {
  const theme = useColorScheme();

  // song data
  // const songUrl = zustandStorage.getItem('lastSongUrl');
  const songName = zustandStorage.getItem('lastSongName');
  const artistName = zustandStorage.getItem('lastSongArtist');
  // const convertedTo = zustandStorage.getItem('lastSongConversion');
  const thumbnail = zustandStorage.getItem('lastSongThumbnail');
  const origin = zustandStorage.getItem('lastSongOrigin');
  const songType = zustandStorage.getItem('lastSongType');
  const platformsAvailable = JSON.parse(zustandStorage.getItem('platformsAvailable')) ?? null;

  return data ? <>
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.subtext(theme)}>{songType}</Text>
        <Text style={styles.subtext(theme)}>from {origin}</Text>
      </View>
      <FastImage
        style={styles.coverArt}
        source={{ uri: thumbnail }}
      />
    </View>
    <View style={{ alignItems: 'center', marginBottom: 5, marginHorizontal: 20 }}>
      <Text style={[styles.titleText(theme), { textAlign: 'center' }]}>
        {songName}
      </Text>
      <Text style={[styles.text(theme), { textAlign: 'center' }]}>
        {artistName}
      </Text>
    </View>
    <FlatList
      style={styles.flatListStyle}
      scrollEnabled={false}
      numColumns={2}
      data={platformsAvailable}
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
            *Sources supported by Odesli.co
          </Text>
          <Text style={[styles.text(theme), { paddingHorizontal: 24, marginTop: 10, marginBottom: 4 }]}>
            2. Paste link by pressing the <Icon name="arrow-up" size={20} color={theme === 'dark' ? '#f2ee6e' : 'black'} /> button
          </Text>
          <Text style={[styles.subtext(theme), { paddingHorizontal: 24, marginVertical: 0 }]}>
            Make sure to "Allow Paste"
          </Text>
          <Text style={[styles.text(theme), { paddingHorizontal: 24, marginVertical: 10 }]}>
            3. Copy new link by tapping from the list
          </Text>
        </View>
      </View>
    </>;
};

LinkResult.propTypes = propTypes;
LinkResult.defaultProps = defaultProps;

export default LinkResult;
