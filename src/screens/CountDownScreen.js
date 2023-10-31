import {
  View,
  Animated,
  StatusBar,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';

const {width, height} = Dimensions.get('window');

const timers = [...Array(13).keys()].map(i => (i === 0 ? 1 : i * 5));

const CountDownScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;
  const timeranimation = useRef(new Animated.Value(height)).current;
  const textInputanimation = useRef(new Animated.Value(timers[0])).current;
  const textInputref = useRef();

  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const listener = textInputanimation.addListener(({value}) => {
      textInputref?.current?.setNativeProps({
        text: Math.ceil(value).toString(),
      });
    });

    return () => {
      textInputanimation.removeListener(listener);
      textInputanimation.removeAllListeners();
    };
  });

  const animation = useCallback(() => {
    textInputanimation.setValue(duration);
    Animated.sequence([
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(timeranimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(textInputanimation, {
          toValue: 0,
          duration: duration * 1000,
          useNativeDriver: true,
        }),
        Animated.timing(timeranimation, {
          toValue: height,
          duration: duration * 1000,
          useNativeDriver: true,
        }),
      ]),
    ]).start(e => {
      Animated.timing(buttonAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [duration]);

  const opacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const translateY = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 200],
  });
  const textOpacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            height,
            width,
            backgroundColor: '#F76A6A',
            transform: [{translateY: timeranimation}],
          },
        ]}
      />
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          styles.animatedRoundView,
          {transform: [{translateY}], opacity},
        ]}>
        <TouchableOpacity onPress={animation}>
          <View style={styles.roundButton} />
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.textView}>
        <Animated.View style={[styles.textInputView, {opacity: textOpacity}]}>
          <TextInput
            ref={textInputref}
            style={styles.text}
            defaultValue={duration?.toString()}
          />
        </Animated.View>
        <Animated.FlatList
          snapToInterval={150}
          decelerationRate={'fast'}
          onMomentumScrollEnd={en => {
            const index = Math.round(
              Math.floor(en?.nativeEvent?.contentOffset?.x / 150),
            );
            setDuration(timers[index]);
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {contentOffset: {x: scrollX}},
              },
            ],
            {useNativeDriver: true},
          )}
          data={timers}
          horizontal
          bounces={false}
          style={{flexGrow: 0, opacity}}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 120}}
          renderItem={({item, index}) => {
            const inputRange = [
              (index - 1) * 150,
              index * 150,
              (index + 1) * 150,
            ];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.4, 1, 0.4],
            });
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.7, 1, 0.7],
            });
            return (
              <View
                style={{
                  width: 150,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Animated.Text
                  style={[styles.text, {opacity, transform: [{scale}]}]}>
                  {item}
                </Animated.Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default CountDownScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#323F4E',
  },
  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: '#F76A6A',
  },
  animatedRoundView: {
    paddingBottom: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 100,
    color: '#ffffff',
    fontWeight: '900',
  },
  textView: {
    position: 'absolute',
    top: height / 3,
    left: 0,
    right: 0,
    flex: 1,
  },
  textInputView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
