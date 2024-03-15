import React from 'react';
import { string, object } from 'prop-types';
import {
  View, Text,
} from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import styles from './styles';

const propTypes = {
  platform: string,
  status: object,
};

const defaultProps = {
  platform: null,
  status: {},
};

const AnimatedToast = ({ status, platform }) => {
  const themeStatus = status != {} ? true : false;
  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutUp}
      style={styles.toastContainer(status)}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title(status)}>{status != {} ? 'Error': 'Link Copied!'}</Text>
        <Text style={styles.description(status)}>{status != {} ? JSON.stringify(status) : platform}</Text>
      </View>
    </Animated.View>
  );
};

AnimatedToast.propTypes = propTypes;
AnimatedToast.defaultProps = defaultProps;

export default AnimatedToast;
