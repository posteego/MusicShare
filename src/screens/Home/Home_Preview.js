import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import {
  FlatList, View, Text, Image, Pressable, Modal, TouchableOpacity, ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import isUrl from 'validator/lib/isURL';
import { useSongLink } from 'hooks';
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

  // useEffect(() => {
  //   if (pastedUrl) setModalVisible(true);
  //   else setModalVisible(false);
  // }, [pastedUrl]);
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

  const flatlist_dummy = [
    {
      id: 0,
      type: 'SONG',
      title: 'Song Name',
      artistName: 'Artist Name',
      musicService: 'Spotify',
      thumbnailUrl: 'https://dummyimage.com/80/000/fff',
      timestamp: 'a few seconds ago',
    },
    {
      id: 1,
      type: 'SONG',
      title: 'Song Name',
      artistName: 'Artist Name',
      musicService: 'Apple Music',
      thumbnailUrl: 'https://via.placeholder.com/80',
      timestamp: 'a few minutes ago',
    },
    {
      id: 2,
      type: 'SONG',
      title: 'Song Name',
      artistName: 'Artist Name',
      musicService: 'Youtube',
      thumbnailUrl: 'https://dummyimage.com/80/000/fff',
      timestamp: '2h ago',
    },
  ];

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

  const renderItem = ({ item }) => (
    <View style={styles.songCard}>
      <View>
        <Image
          style={styles.coverArt}
          source={{
            uri: item.thumbnailUrl,
            width: 80,
            height: 80,
          }}
        />
      </View>
      <View style={styles.songCardRight}>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.artistName}>{item.artistName}</Text>
        <View style={styles.cardLabelContainer}>
          <Text style={styles.cardLabel}>{item.type}</Text>
          <Text style={styles.cardLabel}>{item.musicService}</Text>
        </View>
      </View>
    </View>
  );

  const renderPlatform = (platform) => (
    <TouchableOpacity key={platform} style={styles.platformContainer} onPress={() => handlePlatformSelect(platform)}>
      <Icon name={platformIcons[platform]} size={48} style={styles.platformIcon} />
      <Text style={styles.platformText}>{platform}</Text>
    </TouchableOpacity>
  );

  // const getUrl = async () => {
  //   try {
  //     const clipboardUrl = await Clipboard.getString();
  //     if (await isUrl(clipboardUrl)) setPastedUrl(clipboardUrl);
  //   } catch (e) {
  //     console.log(e);
  //     return null;
  //   }
  // };
  // const handleNewShare = () => {
  //   getUrl();
  //   // toggle modal to select platform (selectedPlatform) from list of PLATFORMS
  //   requestFetch();
  // }


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
      <FlatList
        data={flatlist_dummy}
        renderItem={renderItem}
        keyExtractor={x => x.id}
        ListHeaderComponent={<Text style={{ fontWeight: 'bold', fontSize: 20 }}>Sharing History</Text>}
        contentContainerStyle={styles.flatListContainer}
        ItemSeparatorComponent={<View style={{ height: 1, width: '100%', backgroundColor: '#CACACA' }} />}
      />
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
    // <View style={styles.container}>
    //   <Modal
    //     animationType="slide"
    //     transparent
    //     visible={modalVisible}
    //     onRequestClose={() => { setModalVisible(false); }}
    //   >
    //     <View style={{ flex: 1, justifyContent: 'center' }}>
    //       <Text>
    //         {/* list of PLATFORMS */}hello
    //       </Text>
    //     </View>
    //   </Modal>
    //   <FlatList
    //     data={flatlist_dummy}
    //     renderItem={renderItem}
    //     keyExtractor={x => x.id}
    //     ListHeaderComponent={<Text style={{ fontWeight: 'bold', fontSize: 20 }}>Sharing History</Text>}
    //     contentContainerStyle={styles.flatListContainer}
    //     ItemSeparatorComponent={<View style={{ height: 1, width: '100%', backgroundColor: '#CACACA' }} />}
    //   />
    //   <Pressable
    //     onPress={handleNewShare}
    //     style={({ pressed }) => [styles.shareButton(pressed)]}
    //     android_ripple={styles.androidRipple}
    //   >
    //     {({ pressed }) => (
    //       <Icon
    //         name="duplicate-outline"
    //         size={28}
    //         color={pressed ? 'black' : 'white'}
    //       />
    //     )}
    //   </Pressable>
    // </View>
  );
};

Home_Preview.propTypes = propTypes;
Home_Preview.defaultProps = defaultProps;

export default Home_Preview;
