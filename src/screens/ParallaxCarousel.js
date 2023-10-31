import {
  View,
  Image,
  Animated,
  StatusBar,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useRef} from 'react';

const images = [
  'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800&q=80',
  'https://images.unsplash.com/photo-1562569633-622303bafef5?w=800&q=80',
  'https://images.unsplash.com/photo-1503656142023-618e7d1f435a?w=800&q=80',
  'https://images.unsplash.com/photo-1555096462-c1c5eb4e4d64?w=800&q=80',
  'https://images.unsplash.com/photo-1517957754642-2870518e16f8?w=800&q=80',
  'https://images.unsplash.com/photo-1546484959-f9a381d1330d?w=800&q=80',
  'https://images.unsplash.com/photo-1548761208-b7896a6ff225?w=800&q=80',
  'https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?w=800&q=80',
  'https://images.unsplash.com/photo-1548614606-52b4451f994b?w=800&q=80',
  'https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=800&q=80',
];

const data = images.map((image, index) => ({
  key: String(index),
  photo: image,
  avatar_url: `https://randomuser.me/api/portraits/women/${Math.floor(
    Math.random() * 40,
  )}.jpg`,
}));

const {width, height} = Dimensions.get('screen');

const ParallaxCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {x: scrollX}},
            },
          ],
          {useNativeDriver: true},
        )}
        horizontal
        data={data}
        pagingEnabled={true}
        keyExtractor={item => item?.key}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-250, 0, 260],
          });
          return (
            <View style={styles.FlatListView}>
              <View style={styles.imageViewShado}>
                <View style={styles.imageView}>
                  <Animated.Image
                    source={{uri: item?.photo}}
                    style={[styles.imageStyle, {transform: [{translateX}]}]}
                  />
                </View>
                <Image
                  source={{uri: item?.avatar_url}}
                  style={styles.imageAvtar}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ParallaxCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  FlatListView: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 300,
    height: 450,
    resizeMode: 'cover',
  },
  imageView: {
    width: 300,
    height: 450,
    borderRadius: 18,
    overflow: 'hidden',
    alignItems: 'center',
  },
  imageViewShado: {
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    padding: 12,
    backgroundColor: 'white',
  },
  imageAvtar: {
    width: 60,
    height: 60,
    borderRadius: 60,
    resizeMode: 'cover',
    borderWidth: 6,
    borderColor: 'white',
    position: 'absolute',
    bottom: -30,
    right: 60,
  },
});
