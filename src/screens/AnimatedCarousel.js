import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {getData} from '../services/Api';

const {width, height} = Dimensions.get('screen');

const imageW = width * 0.7;
const imageH = imageW * 1.54;

const AnimatedCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [images, setImages] = useState([]);
  useEffect(() => {
    (async () => {
      if (images?.length == 0) {
        const response = await getData();
        console.log('response', response);
        setImages(response);
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={[StyleSheet.absoluteFillObject]}>
        {images?.map((item, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.Image
              key={index}
              source={{uri: item?.src?.portrait}}
              style={[StyleSheet.absoluteFillObject, {opacity}]}
              blurRadius={50}
            />
          );
        })}
      </View>
      <Animated.FlatList
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {x: scrollX}},
            },
          ],
          {useNativeDriver: true},
        )}
        data={images}
        horizontal
        pagingEnabled
        keyExtractor={item => item?.id?.toString()}
        renderItem={({item, index}) => {
          return (
            <View style={styles.flatListRenderView}>
              <Image
                source={{uri: item?.src?.portrait}}
                style={styles.imgesStyle}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default AnimatedCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  imgesStyle: {
    width: imageW,
    height: imageH,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  flatListRenderView: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 20,
  },
});
