import 'react-native-gesture-handler';
import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AlbumListing from './src/screens/albumsListing/AlbumListing';
import {NavigationContainer} from '@react-navigation/native';
import IndividualAlbum from './src/screens/individualAlbum/IndividualAlbum';
import Song from './src/screens/individualSong/Song';

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
        <Stack.Screen name="Song" component={Song} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
