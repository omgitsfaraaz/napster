import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import {styles} from './styles';

const windowWidth = Dimensions.get('window').width;

const AlbumListing = props => {
  const albums = [1, 2, 3];
  return (
    <View>
      <View style={{backgroundColor: 'red'}}>
        <Text style={{textAlign: 'center', fontSize: 25}}>Popular Albums</Text>
      </View>

      <View>
        <View style={{width: windowWidth / 2.5}}>
          <View style={styles.cd}></View>
          <View style={{position: 'absolute', borderRadius: 20}}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1524650359799-842906ca1c06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
              }}
              style={{width: windowWidth / 3, height: 100, borderRadius: 10}}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AlbumListing;
