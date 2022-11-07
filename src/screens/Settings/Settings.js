import React from 'react';
import { string } from 'prop-types';
import {
  View, Text,
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
    <View>
      <Text>Setup</Text>
    </View>
  );
};

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;

export default Settings;
