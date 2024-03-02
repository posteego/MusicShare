import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import {
  FlatList, View, Text,
  Pressable, TouchableOpacity,
  useColorScheme, Linking,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { AnimatedLoading, AnimatedToast } from 'components';
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
  // grab zustand data from the hook, not from home screen
  const { data, loading, error, requestFetch } = useSongLink(pastedUrl);
  const [showToast, setShowToast] = useState(false);
  const [status, setStatus] = useState(null);
  const [name, setName] = useState(null);

  // song data
  const songUrl = zustandStorage.getItem('lastSongUrl');
  const songName = zustandStorage.getItem('lastSongName');
  const artistName = zustandStorage.getItem('lastSongArtist');
  // const convertedTo = zustandStorage.getItem('lastSongConversion');
  const thumbnail = zustandStorage.getItem('lastSongThumbnail');
  const origin = zustandStorage.getItem('lastSongOrigin');
  const songType = zustandStorage.getItem('lastSongType');
  const platformsAvailable = JSON.parse(zustandStorage.getItem('platformsAvailable')) ?? null;

  useEffect(() => {
    if (pastedUrl) {
      requestFetch();
      setStatus(null);
    }
  }, [pastedUrl]);

  useEffect(() => {
    if (error) {
      zustandStorage.removeItem('platformsAvailable');
      setStatus(error);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  }, [error]);

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

  const renderPlatformsAvailable = ({ item }) => {
    let name = PLATFORMS[item.name].name;
    let src = PLATFORMS[item.name].logo_path;

    return (
      <TouchableOpacity
        key={item.id}
        // style={[styles.platformContainer]}
        onPress={() => {
          /* open URL in dedicated app */
          const isSupported = Linking.canOpenURL(item.url);
          if (isSupported) {
            Linking.openURL(item.url);
            // call toast with correct modifiers
          } else {
            Alert.alert(`This url might be broken: ${item.url}`);
          }
        }}
        delayLongPress={500}
        onLongPress={() => {
          /* copy URL to clipboard and show success toast */
          Clipboard.setString(item.url);
          setName(name);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
        }}
        onPressIn={() => {

        }}
      >
        <Animated.View
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
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const LinkResult = () => (data ?
    <>
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
            Sources supported by Odesli.co
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
    </>);

  const PasteButton = () => (
    <Pressable
      onPress={handleNewShare}
      style={({ pressed }) => [styles.shareButton(pressed)]}
      android_ripple={styles.androidRipple}
    >
      {({ pressed }) => (
        <>
          <Icon
            name="arrow-up"
            size={28}
            color={pressed ? '#f2ee6e' : '#776DF2'}
          />
        </>
      )}
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Show Results or Instructions (LinkResult) if not loading */}
      {showToast && <AnimatedToast status={status} platform={name} />}
      {
        loading == true ?
          <AnimatedLoading theme={theme} />
          : <LinkResult />
      }
      <PasteButton />
    </View >
  );
};

Home_Preview.propTypes = propTypes;
Home_Preview.defaultProps = defaultProps;

export default Home_Preview;
