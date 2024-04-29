import React, { useEffect, useState } from 'react';
import { object, bool, func } from 'prop-types';
import {
  useColorScheme, Linking, Dimensions,
  View, Text, FlatList, TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSongStore } from 'stores';
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
  setToastName: () => { },
  setShowToast: () => { },
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
  const songData = useSongStore();

  const wh = Dimensions.get('window').height;
  console.log('wh', JSON.stringify(wh, null, 2));
  
  

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
      >
        <View
          style={[styles.platformContainer(theme)]}
        >
          {src !== ''
            ? <>
              {/* <Text style={[styles.platformText(theme)]}>{name}</Text> */}
              <FastImage
                resizeMode='contain'
                style={styles.logos}
                source={src}
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
    <View style={styles.rowContainer(theme)}>
      <View style={{ flex: 0.4, alignItems: 'center' }}>
        <FastImage
          style={styles.coverArt}
          source={{ uri: songData.lastSongThumbnail, priority: 'high' }}
        />
      </View>
      <View style={{ flex: 0.6, justifyContent: 'center' }}>
        <Text style={[styles.subtext(theme)]}>
          {songData.lastSongType} from {capitalizeLetters_ui(songData.lastSongOrigin)}
        </Text>
        <Text style={[styles.titleText(theme)]}>
          {songData.lastSongName}
        </Text>
        <Text style={[styles.text(theme)]}>
          {songData.lastSongArtist}
        </Text>
      </View>
    </View>
    <FlatList
      style={styles.flatListStyle}
      scrollEnabled={wh < 850}
      numColumns={2}
      data={JSON.parse(songData.platformsAvailable) ?? null}
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
          Convert your music links
        </Text>
        <View>
          <Text style={[styles.text(theme), { paddingHorizontal: 24, marginTop: 10, marginBottom: 4 }]}>
            1. Paste link by pressing <Icon name="arrow-up" size={20} color={theme === 'dark' ? '#f2ee6e' : 'black'} /> button
          </Text>
          <Text style={[styles.subtext(theme), { paddingHorizontal: 24, marginVertical: 0 }]}>
            Make sure to "Allow Paste"
          </Text>
          <Text style={[styles.text(theme), { paddingHorizontal: 24, marginTop: 10 }]}>
            2. <Text style={{ fontSize: 24 }}>Tap</Text> to <Text style={{ fontSize: 24, fontWeight: '900' }}>COPY</Text>, <Text style={{ fontSize: 24 }}>Hold</Text> to <Text style={{ fontSize: 24, fontWeight: '900' }}>OPEN</Text>
          </Text>
          <TouchableOpacity
            style={styles.demoContainer}
            onPress={() => {
              /* copy URL to clipboard and show success toast */
              Clipboard.setString('https://spotify.link/FQVaGmSF5Ib');
              setToastName('Spotify');
              setShowToast(true);
              setTimeout(() => setShowToast(false), 2000);
            }}
            delayLongPress={500}
            onLongPress={() => {
              /* open URL in dedicated app */
              const isSupported = Linking.canOpenURL('https://spotify.link/FQVaGmSF5Ib');
              if (isSupported) {
                Linking.openURL('https://spotify.link/FQVaGmSF5Ib');
                // call toast with correct modifiers
              } else {
                Alert.alert(`This url might be broken: https://spotify.link/FQVaGmSF5Ib`);
              }
            }}
          >
            <FastImage
              source={require('assets/logos_black/spotify-black.png')}
              style={{ height: 25, width: 130 }}
              resizeMode='contain'
            />
          </TouchableOpacity>
          <Text style={[styles.text(theme), { paddingHorizontal: 24, marginVertical: 10 }]}>
            3. Set default platform in About tab
          </Text>
        </View>
      </View>
    </>;
};

LinkResult.propTypes = propTypes;
LinkResult.defaultProps = defaultProps;

export default LinkResult;
