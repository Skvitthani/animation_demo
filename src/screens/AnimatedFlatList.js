import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  FlatList,
  Image,
} from 'react-native';
import React, {useRef} from 'react';

const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];

const DATA = [
  {
    key: '3571572',
    title: 'Multi-lateral intermediate moratorium',
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image:
      'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800&q=80',
  },
  {
    key: '3571747',
    title: 'Automated radical data-warehouse',
    description:
      'Use the optical SAS system, then you can navigate the auxiliary alarm!',
    image:
      'https://images.unsplash.com/photo-1517957754642-2870518e16f8?w=800&q=80',
  },
  {
    key: '3571680',
    title: 'Inverse attitude-oriented system engine',
    description:
      'The ADP array is down, compress the online sensor so we can input the HTTP panel!',
    image:
      'https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=800&q=80',
  },
  {
    key: '3571603',
    title: 'Monitored global data-warehouse',
    description: 'We need to program the open-source IB interface!',
    image:
      'https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?w=800&q=80',
  },
  {
    key: '3571572',
    title: 'Multi-lateral intermediate moratorium',
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image:
      'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800&q=80',
  },
  {
    key: '3571747',
    title: 'Automated radical data-warehouse',
    description:
      'Use the optical SAS system, then you can navigate the auxiliary alarm!',
    image:
      'https://images.unsplash.com/photo-1517957754642-2870518e16f8?w=800&q=80',
  },
  {
    key: '3571680',
    title: 'Inverse attitude-oriented system engine',
    description:
      'The ADP array is down, compress the online sensor so we can input the HTTP panel!',
    image:
      'https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=800&q=80',
  },
  {
    key: '3571603',
    title: 'Monitored global data-warehouse',
    description: 'We need to program the open-source IB interface!',
    image:
      'https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?w=800&q=80',
  },
];

const {width, height} = Dimensions.get('screen');

const Indicator = ({scrollX}) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 100,
        flexDirection: 'row',
      }}>
      {DATA?.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`indicator${i}`}
            style={{
              height: 10,
              width: 10,
              opacity,
              borderRadius: 5,
              backgroundColor: '#fff',
              margin: 10,
              transform: [{scale}],
            }}
          />
        );
      })}
    </View>
  );
};

const BackDrop = ({scrollX}) => {
  const bg = scrollX.interpolate({
    inputRange: bgs?.map((_, i) => i * width),
    outputRange: bgs?.map(b => b),
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: bg,
        },
      ]}
    />
  );
};

const Square = ({scrollX}) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1,
  );

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['35deg', '0deg', '35deg'],
  });
  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        backgroundColor: 'white',
        borderRadius: 86,
        position: 'absolute',
        top: -height * 0.6,
        left: -height * 0.35,
        transform: [
          {
            rotate,
          },
        ],
      }}
    />
  );
};

const AnimatedFlatList = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <BackDrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <FlatList
        data={DATA}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {x: scrollX}},
            },
          ],
          {useNativeDriver: false},
        )}
        horizontal
        scrollEventThrottle={32}
        pagingEnabled={true}
        contentContainerStyle={{paddingBottom: 100}}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item?.key}
        renderItem={({item}) => {
          return (
            <View style={styles.listMainView}>
              <View style={styles.imageView}>
                <Image source={{uri: item?.image}} style={styles.itemImage} />
              </View>
              <View style={styles.itemTextView}>
                <Text style={styles.itemTitle}>{item?.title}</Text>
                <Text style={styles.itemDescription}>{item?.description}</Text>
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX} />
    </View>
  );
};

export default AnimatedFlatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 10,
    fontWeight: '800',
  },
  itemDescription: {
    color: '#fff',
    fontWeight: '300',
  },
  itemImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  listMainView: {
    width,
    padding: 2,
    alignItems: 'center',
  },
  imageView: {
    flex: 0.7,
    justifyContent: 'center',
  },
  itemTextView: {
    flex: 0.3,
  },
});
