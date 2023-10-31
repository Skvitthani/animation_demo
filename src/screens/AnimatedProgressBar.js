import {Animated, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

const Progress = ({step, steps, height}) => {
  const AnimatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;

  const [width, setWidth] = useState(0);

  useEffect(() => {
    Animated.timing(AnimatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step, width]);

  return (
    <>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '900',
          marginBottom: 4,
        }}>
        {step}/{steps}
      </Text>
      <View
        onLayout={ev => {
          const newWidth = ev?.nativeEvent?.layout?.width;
          setWidth(newWidth);
        }}
        style={{
          height,
          overflow: 'hidden',
          borderRadius: height,
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}>
        <Animated.View
          style={{
            height,
            top: 0,
            left: 0,
            width: '100%',
            position: 'absolute',
            borderRadius: height,
            backgroundColor: 'rgba(0,0,0,0.5)',
            transform: [{translateX: AnimatedValue}],
          }}
        />
      </View>
    </>
  );
};

const AnimatedProgressBar = () => {
  const [index, setIndex] = useState(0);
  console.log('index', index);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % (10 + 1));
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [index]);
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Progress step={index} steps={10} height={20} />
    </View>
  );
};

export default AnimatedProgressBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
