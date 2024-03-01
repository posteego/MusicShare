import React from 'react';
import { string } from 'prop-types';
import {
  View, Text,
} from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import styles from './styles';

const propTypes = {
  platform: string,
  status: string,
};

const defaultProps = {
  platform: null,
  status: null,
};

const AnimatedToast = ({ status, platform }) => {
  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutUp}
      style={styles.toastContainer(status)}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title(status)}>{status ? 'Error': 'Link Copied!'}</Text>
        <Text style={styles.description(status)}>{status ? status : platform}</Text>
      </View>
    </Animated.View>
  );
};

AnimatedToast.propTypes = propTypes;
AnimatedToast.defaultProps = defaultProps;

export default AnimatedToast;
