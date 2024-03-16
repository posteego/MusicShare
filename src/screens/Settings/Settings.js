import React from 'react';
import { string } from 'prop-types';
import {
  useColorScheme, View, Text,
  TouchableOpacity,
} from 'react-native';
import { useSongStore } from 'stores';
import styles from './styles';

const propTypes = {
  key: string,
};

const defaultProps = {
  key: null,
};

const Settings = ({ key }) => {
  const theme = useColorScheme();
  const data = useSongStore();
  const resetCache = useSongStore((state) => state.reset);

  const shouldDisableReset = data.lastSongArtist === null;

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ marginHorizontal: 25, marginVertical: 20 }}>
        <Text style={styles.description(theme)}>Beatbridge was designed as a personal tool to share music links with friends regardless of the platforms being used.</Text>
        <Text style={styles.description(theme)}>This app is not intended to convert playlists.</Text>
      </View>
      <View style={{ width: '100%' }}>
        <TouchableOpacity
          key={'reset-cache-btn'}
          onPress={() => {
            resetCache();
          }}
          disabled={shouldDisableReset}
        >
          <View style={[styles.buttonContainer(theme, shouldDisableReset)]}>
            <Text style={[styles.buttonText(theme)]}>Reset Cache</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          marginVertical: 20,
          bottom: 0,
        }}
      >
        <Text style={{ color: '#777777'}}>Powered by Odesli.co</Text>
      </View>
    </View>
  );
};

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;

export default Settings;
