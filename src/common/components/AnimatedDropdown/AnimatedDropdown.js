import React, { useState } from 'react';
import Animated, { FadeIn, FadeOut, useAnimatedProps, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { string, array, func } from 'prop-types';
import {
  Pressable, View, Text,
} from 'react-native';
import styles from './styles';

const propTypes = {
  theme: string,
  data: array,
  setSelectedId: func,
  selectedId: string,
  onSelect: func,
  setSelectedName: func,
  selectedName: string,
};

const defaultProps = {
  theme: null,
  data: null,
  setSelectedId: () => { },
  selectedId: null,
  onSelect: () => { },
  setSelectedName: () => {},
  selectedName: null,
};

const AnimatedDropdown = ({
  data, setSelectedId, selectedId, setSelectedName, selectedName, onSelect,
}) => {
  const height = useSharedValue(50);
  const selectTextOpacity = useSharedValue(0);
  const defaultPlatOpacity = useSharedValue(100);
  const [show, setShow] = useState(false);

  const handlePress = () => {
    if (height.value >= 150) {
      setShow(false);
      height.value = 50;
      selectTextOpacity.value = 0;
      defaultPlatOpacity.value = 100;
    } else {
      setShow(true);
      height.value *= 6;
      selectTextOpacity.value = 100;
      defaultPlatOpacity.value = 0;
    }
  };

  const animatedProps = useAnimatedProps(() => ({
    height: withSpring(height.value, {
      duration: 1000,
      dampingRatio: 0.75,
    }),
  }));

  const onSelectItem = (item) => {
    onSelect && onSelect(item);
  }

  const renderListItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? 'hsl(58, 70%, 60%)' : 'hsl(58, 50%, 85%)';

    return (
      <Pressable
        style={{
          marginVertical: 4,
          padding: 8,
          backgroundColor,
        }}
        onPress={() => {
          setSelectedId(item.id);
          setSelectedName(item.name);
          onSelectItem(item);
          handlePress();
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
          }}
        >
          {item.name}
        </Text>
      </Pressable>
    )
  };

  return (
    <Animated.View
      animatedProps={animatedProps}
      style={{
        borderWidth: 3,
        borderColor: 'hsl(58,50%, 0%)',
        borderRadius: 4,
        width: 285,
        marginHorizontal: 16,
        padding: 8,
        backgroundColor: 'hsl(58, 50%, 85%)',
      }}
    >
      <Pressable
        style={{ backgroundColor: 'hsl(58, 50%, 85%)', borderRadius: 2 }}
        onPress={handlePress}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center', height: 28 }}>
          {selectedId ? (
            show ? (
              <Text style={{ fontSize: 16, fontWeight: '600' }}>Select Platform</Text>
            ) : (
                <Text style={{ fontSize: 16, fontWeight: '600' }}>{selectedName}</Text>
            )
          ) : (
              <Text style={{ fontSize: 16, fontWeight: '600' }}>Select Platform</Text>
          )}
        </View>
      </Pressable>
      {show && (
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          style={{
            borderTopWidth: 2,
            borderRadius: 4,
            borderTopColor: 'hsl(58, 25%, 75%)',
            marginTop: 8
          }}
          data={data}
          extraData={selectedId}
          renderItem={renderListItem}
          keyExtractor={item => item.id}
        />
      )}
    </Animated.View>
  );
};

AnimatedDropdown.propTypes = propTypes;
AnimatedDropdown.defaultProps = defaultProps;

export default AnimatedDropdown;
