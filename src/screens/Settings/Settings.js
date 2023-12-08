import React from 'react';
import { string } from 'prop-types';
import {
  View, Text, Pressable,
} from 'react-native';

const propTypes = {
  key: string,
};

const defaultProps = {
  key: null,
};

const Settings = ({ key }) => {
  const a = 'placeholder';

  return (
    <View style={{ flex: 1 }}>
      <Pressable style={{ alignItems: 'center' }}>
        <Text>Reset Cache</Text>
      </Pressable>
      <View style={{ alignItems: 'center', marginVertical: 50 }}>
        <Text>Powered by Odesli.co</Text>
      </View>
    </View>
  );
};

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;

export default Settings;
