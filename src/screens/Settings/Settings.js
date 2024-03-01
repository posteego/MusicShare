import React from 'react';
import { string } from 'prop-types';
import {
  View, Text, useColorScheme,
} from 'react-native';
import styles from './styles';

const propTypes = {
  key: string,
};

const defaultProps = {
  key: null,
};

const Settings = ({ key }) => {
  const theme = useColorScheme();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 25, marginVertical: 20 }}>
        <Text style={styles.description(theme)}>Beatbridge was designed as a personal tool to share music links with friends regardless of the platforms being used.</Text>
        <Text style={styles.description(theme)}>This app is not intended for multiple entity (playlist) conversions.</Text>
      </View>
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          marginVertical: 50,
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
