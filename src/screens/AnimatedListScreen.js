import {
  Text,
  View,
  Image,
  Animated,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {getFackerData} from '../services/GetFackerData';
import React, {useEffect, useRef, useState} from 'react';

const SPACING = 20;
const IMAGE_HEIGHT = 60;
const ITEM_SIZE = IMAGE_HEIGHT + SPACING * 3;

const AnimatedListScreen = () => {
  const [userdata, setUaseData] = useState([]);

  const BIG_Image =
    'https://cdn.pixabay.com/photo/2023/08/26/17/49/dahlias-8215514_640.jpg';

  useEffect(() => {
    (async () => {
      if (userdata?.length == 0) {
        const response = await getFackerData();
        setUaseData(response);
      }
    })();
  }, []);

  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.containerView}>
      <Image
        source={{uri: BIG_Image}}
        style={[StyleSheet.absoluteFillObject]}
        blurRadius={80}
      />
      <Animated.FlatList
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {y: scrollY}},
            },
          ],
          {useNativeDriver: true},
        )}
        data={userdata}
        keyExtractor={item => item?.userId}
        contentContainerStyle={styles.listContainerstyle}
        renderItem={({item, index}) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
            extrapolate: 'extend',
          });

          return (
            <Animated.View
              style={[styles.listmainView, {transform: [{scale}]}]}>
              <Image source={{uri: item?.avatar}} style={styles.avatar} />
              <View>
                <Text style={styles.displayNameFont}>{item?.displayName}</Text>
                <Text style={styles.usernameFont}>{item?.username}</Text>
                <Text style={styles.emailFont}>{item?.email}</Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default AnimatedListScreen;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 50,
    height: IMAGE_HEIGHT,
    // borderRadius: 50,
  },
  displayNameFont: {
    marginLeft: 10,
    fontSize: 22,
    fontWeight: '700',
  },
  emailFont: {
    marginLeft: 10,
    fontSize: 14,
    opacity: 0.8,
    color: '#0099cc',
  },
  usernameFont: {
    marginLeft: 10,
    fontSize: 18,
    opacity: 0.8,
  },
  listmainView: {
    padding: SPACING,
    marginBottom: SPACING,
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255,0.8)',
    shadowColor: '#000',
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  listContainerstyle: {
    marginHorizontal: 20,
  },
});
