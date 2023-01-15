import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;

const AlbumListing = ({navigation}) => {
  const albums = [1, 2, 3];

  const renderEachAlbum = () => {
    return (
      <TouchableOpacity
        style={{
          width: windowWidth / 2.5,
          marginBottom: 30,
        }}
        onPress={() => navigation.navigate('IndividualAlbum')}>
        <View style={styles.cd}></View>
        <View style={{position: 'absolute', borderRadius: 20}}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1524650359799-842906ca1c06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
            }}
            style={{width: windowWidth / 3, height: 100, borderRadius: 10}}
          />
        </View>
        <View>
          <Text>Kantara (May 2019)</Text>
          <Text>Harry styles, Joshua</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <View>
        <Text style={{textAlign: 'center', fontSize: 25}}>Popular Albums</Text>
      </View>

      <View style={{width: '90%', alignSelf: 'center', marginTop: 20}}>
        <FlatList
          data={albums}
          renderItem={renderEachAlbum}
          keyExtractor={item => item}
          horizontal={false}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
        />
      </View>
    </View>
  );
};

export default AlbumListing;
