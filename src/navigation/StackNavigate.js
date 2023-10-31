import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import GalleryViewAnimation from '../screens/GalleryViewAnimation';
import AnimatedListScreen from '../screens/AnimatedListScreen';
import AnimatedCarousel from '../screens/AnimatedCarousel';
import ThreeDCarousel from '../screens/ThreeDCarousel';
import CountDownScreen from '../screens/CountDownScreen';
import ParallaxCarousel from '../screens/ParallaxCarousel';

const Stack = createNativeStackNavigator();

const StackNavigate = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="ParallaxCarousel">
        <Stack.Screen name="ParallaxCarousel" component={ParallaxCarousel} />
        <Stack.Screen name="CountDownScreen" component={CountDownScreen} />
        <Stack.Screen name="ThreeDCarousel" component={ThreeDCarousel} />
        <Stack.Screen name="Carousel" component={AnimatedCarousel} />
        <Stack.Screen name="AmnimatedList" component={AnimatedListScreen} />
        <Stack.Screen name="Gallery" component={GalleryViewAnimation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigate;
