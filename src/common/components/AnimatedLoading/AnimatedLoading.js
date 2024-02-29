import Animated from 'react-native-reanimated';
import { View } from 'react-native';

const TopLine = ({ }) => {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 10,
      width: 200,
    }}>
      <Animated.View style={{ height: '100%', width: 30, backgroundColor: 'rgba(0,0,0,0.2)' }} />
      <Animated.View style={{ height: '100%', width: 100, backgroundColor: 'rgba(0,0,0,0.4)' }} />
    </View>
  );
};

const Box = ({ height, width }) => {
  return (
    <View style={{ height, width, marginVertical: 10 }}>
      <Animated.View style={{ height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 5 }} />
    </View>
  );
};

const ButtonGrid = () => {
  return (
    <Animated.FlatList />
  )
}

const AnimatedLoading = () => {
  return (
    <>
      <TopLine />
      <Box height={200} width={200}/>
      <ButtonGrid />
    </>
  );
};

export default AnimatedLoading;
