import {
  Image,
  View,
  FlatList,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {getData} from '../services/Api';
import React, {useEffect, useRef, useState} from 'react';

const {width, height} = Dimensions.get('screen');

const GalleryViewAnimation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [productdata, setProductData] = useState([]);

  useEffect(() => {
    (async () => {
      if (productdata?.length == 0) {
        const response = await getData();
        setProductData(response);
      }
    })();
  }, []);

  const topRef = useRef();
  const bottomRef = useRef();

  const scrollToActiveIndex = index => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animation: true,
    });
    bottomRef.current.scrollToIndex({index, animated: true});

    // if (index * (80 + 10) - 80 / 2 > width / 2) {
    // bottomRef?.current?.scrollToOffset({
    //   offset: index * (80 + 10) - width / 2 + 80 / 2,
    //   animation: true,
    // });
    // }
  };

  return (
    <View style={styles.containerView}>
      <StatusBar hidden />
      <FlatList
        ref={topRef}
        horizontal
        pagingEnabled
        data={productdata}
        onMomentumScrollEnd={res => {
          scrollToActiveIndex(
            Math.floor(res.nativeEvent.contentOffset.x / width),
          );
        }}
        renderItem={({item}) => {
          return (
            <View style={{width, height}}>
              <Image
                source={{uri: item?.src?.portrait}}
                style={[StyleSheet.absoluteFillObject]}
              />
            </View>
          );
        }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item?.id.toString()}
      />
      <FlatList
        ref={bottomRef}
        horizontal
        data={productdata}
        style={styles.bottomFlatListStyle}
        contentContainerStyle={{paddingHorizontal: 10}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
              <Image
                source={{uri: item?.src?.portrait}}
                style={[
                  styles.bottomListImageStyle,
                  {
                    borderColor: activeIndex === index ? '#fff' : 'transparent',
                  },
                ]}
              />
            </TouchableOpacity>
          );
        }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item?.id.toString()}
      />
    </View>
  );
};

export default GalleryViewAnimation;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: 'white',
  },
  bottomListImageStyle: {
    width: 80,
    height: 80,
    borderWidth: 2,
    marginRight: 10,
    borderRadius: 12,
  },
  bottomFlatListStyle: {
    bottom: 80,
    position: 'absolute',
  },
});
