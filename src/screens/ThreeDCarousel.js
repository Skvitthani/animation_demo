import {
  Text,
  View,
  Image,
  Animated,
  StatusBar,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {getData} from '../services/Api';
import React, {useEffect, useRef, useState} from 'react';

const {width} = Dimensions.get('screen');

const IMAGE_WIDTH = width * 0.65;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.7;
const SPACING = 20;

const ThreeDCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const progress = Animated.modulo(Animated.divide(scrollX, width), width);
  const ref = useRef();

  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    (async () => {
      if (images?.length == 0) {
        const response = await getData();
        setImages(response);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <SafeAreaView style={{marginTop: SPACING * 4}}>
        <View style={{height: 400}}>
          <Animated.FlatList
            ref={ref}
            onMomentumScrollEnd={en => {
              setIndex(Math.floor(en?.nativeEvent?.contentOffset.x / width));
            }}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {contentOffset: {x: scrollX}},
                },
              ],
              {useNativeDriver: true},
            )}
            horizontal
            pagingEnabled
            data={images}
            bounces={false}
            style={{flexGrow: 0, zIndex: 9999}}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginHorizontal: SPACING * 2,
            }}
            renderItem={({index, item}) => {
              const inputRange = [
                (index - 1) * width, // next slice
                index * width, // current
                (index + 1) * width, // Previous
              ];
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0],
              });
              const translateY = scrollX.interpolate({
                inputRange,
                outputRange: [50, 0, 20],
              });
              return (
                <Animated.View
                  style={{
                    width,
                    opacity,
                    transform: [{translateY}],
                  }}>
                  <Image
                    source={{uri: item?.src?.portrait}}
                    style={styles.images}
                  />
                </Animated.View>
              );
            }}
          />
          <View style={styles.imageDMView}>
            {images.map((item, index) => {
              const inputRange = [
                (index - 0.2) * width, // next slice
                index * width, // current
                (index + 0.2) * width, // Previous
              ];
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0],
              });
              const rotateY = scrollX.interpolate({
                inputRange,
                outputRange: ['90deg', '0deg', '90deg'],
              });
              return (
                <Animated.View
                  style={[
                    styles.imageDView,
                    {
                      opacity,
                      transform: [{perspective: IMAGE_WIDTH * 4}, {rotateY}],
                    },
                  ]}>
                  <Text style={styles.imageDText1}>{images[index]?.alt}</Text>
                  <Text style={styles.imageDText2}>
                    {images[index]?.photographer}
                  </Text>
                </Animated.View>
              );
            })}
          </View>
          <Animated.View
            style={[
              styles.backgroundView,
              {
                transform: [
                  {perspective: IMAGE_WIDTH * 4},
                  {
                    rotateY: progress.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: ['0deg', '90deg', '180deg'],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
        <View style={styles.bottomButtonStyle}>
          <TouchableOpacity
            onPress={() => {
              ref?.current?.scrollToOffset({
                offset: (index - 1) * width,
              });
            }}
            disabled={index == 0}
            style={{opacity: index == 0 ? 0.2 : 1}}>
            <Text style={styles.buttonFont}>PREV</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{opacity: index == images?.length - 1 ? 0.5 : 1}}
            onPress={() => {
              ref?.current?.scrollToOffset({
                offset: (index + 1) * width,
              });
            }}
            disabled={index == images?.length - 1}>
            <Text style={styles.buttonFont}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ThreeDCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A5F1FA',
  },
  images: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: 'cover',
  },
  backgroundView: {
    width: 300,
    bottom: 0,
    zIndex: -1,
    left: SPACING,
    top: SPACING * 2,
    position: 'absolute',
    backgroundColor: '#fff',
  },
  bottomButtonStyle: {
    width: 300,
    marginTop: SPACING,
    flexDirection: 'row',
    marginHorizontal: SPACING,
    justifyContent: 'space-between',
  },
  buttonFont: {
    fontSize: 12,
    fontWeight: '800',
  },
  imageDText1: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  imageDText2: {
    fontSize: 16,
    marginTop: 10,
  },
  imageDMView: {
    width: IMAGE_WIDTH,
    marginTop: SPACING,
    alignItems: 'center',
    marginLeft: SPACING * 2,
    zIndex: 999,
  },
  imageDView: {
    position: 'absolute',
  },
});
