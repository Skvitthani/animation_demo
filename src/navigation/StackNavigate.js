import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import GalleryViewAnimation from '../screens/GalleryViewAnimation';

const Stack = createNativeStackNavigator();

const StackNavigate = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Gallery" component={GalleryViewAnimation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigate;
