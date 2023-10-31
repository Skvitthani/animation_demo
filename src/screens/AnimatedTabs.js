import {
  Text,
  View,
  Image,
  Animated,
  StatusBar,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {createRef, useEffect, useRef, useState} from 'react';

const images = {
  man: 'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  women:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  kids: 'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  skullcandy:
    'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  help: 'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};
const data = Object.keys(images).map(i => ({
  key: i,
  title: i,
  image: images[i],
  ref: createRef(),
}));

const {height, width} = Dimensions.get('screen');

const Indicator = ({measures, scrollX}) => {
  const inputRange = data?.map((_, i) => i * width);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures?.map(m => m?.width),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures?.map(m => m?.x),
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        height: 4,
        backgroundColor: 'white',
        width: indicatorWidth,
        bottom: -10,
        transform: [{translateX}],
      }}
    />
  );
};

const Tabs = ({scrollX, data}) => {
  const [measures, setMeasures] = useState([]);
  const container = useRef();
  useEffect(() => {
    let m = [];

    data?.forEach(element => {
      element?.ref?.current?.measureLayout(
        container.current,
        (x, y, width, height) => {
          m.push({
            x,
            y,
            width,
            height,
          });
          if (m.length == data?.length) {
            setMeasures(m);
          }
        },
      );
    });
  }, []);

  return (
    <View style={{position: 'absolute', top: 100, width}}>
      <View style={styles.listView} ref={container}>
        {data?.map(item => {
          return (
            <View key={item?.key} ref={item?.ref}>
              <Text style={styles.itemFontStyle}>{item?.title}</Text>
            </View>
          );
        })}
      </View>
      {measures?.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} />
      )}
    </View>
  );
};

const AnimatedTabs = () => {
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
          {useNativeDriver: false},
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        bounces={false}
        data={data}
        keyExtractor={item => item?.key}
        renderItem={({item}) => {
          return (
            <View style={{width, height}}>
              <Image
                source={{uri: item?.image}}
                style={{flex: 1, resizeMode: 'cover'}}
              />
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  {backgroundColor: 'rgba(0,0,0,0.3)'},
                ]}
              />
            </View>
          );
        }}
      />
      <Tabs scrollX={scrollX} data={data} />
    </View>
  );
};

export default AnimatedTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemFontStyle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  listView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
