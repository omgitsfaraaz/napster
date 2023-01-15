import 'react-native-gesture-handler';
import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AlbumListing from './src/screens/albumsListing/AlbumListing';
import {NavigationContainer} from '@react-navigation/native';
import IndividualAlbum from './src/screens/individualAlbum/IndividualAlbum';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle={'light-content'} />
      <Stack.Navigator
        initialRouteName="AlbumListing"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="AlbumListing" component={AlbumListing} />
        <Stack.Screen name="IndividualAlbum" component={IndividualAlbum} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
