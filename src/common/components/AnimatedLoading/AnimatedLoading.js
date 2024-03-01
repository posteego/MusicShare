import Animated from 'react-native-reanimated';
import { View, Text } from 'react-native';
import { useEffect } from 'react';
import FastImage from 'react-native-fast-image';
import { useSharedValue, withRepeat, withSpring } from 'react-native-reanimated';
import styles from './styles';

const Top = ({ theme }) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withRepeat(withSpring(1), 0, true);
  }, []);

  return (
    <Animated.View style={{ alignItems: 'center', opacity: opacity }}>
      <FastImage
        source={require('assets/home/beatbridge2-500.png')}
        style={{ height: 200, width: 200, marginBottom: 20 }}
      />
      <Text style={styles.mainText(theme)}>Fetching link information</Text>
    </Animated.View>
  );
};

const AnimatedLoading = ({ theme }) => {
  return (
    <View
      style={styles.container}
    >
      <Top theme={theme}/>
    </View>
  );
};

export default AnimatedLoading;
