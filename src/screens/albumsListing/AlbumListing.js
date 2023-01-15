import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import axios from 'axios';
import Config from 'react-native-config';
import {albumData} from './albumData';
import moment from 'moment';

const windowWidth = Dimensions.get('window').width;

const AlbumListing = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [allAlbums, setAllAlbums] = useState('');

  useEffect(() => {
    getAllAlbums();
  }, []);

  const getAllAlbums = async () => {
    setLoading(true);
    const config = {
      method: 'get',
      url: `${Config.API_URL}/v2.2/albums/new`,
      headers: {
        'Content-Type': 'application/json',
        apikey: Config.API_KEY,
      },
    };
    console.log('api key', config.headers.apikey);
    axios(config)
      .then(res => {
        if (res.data.albums.length == 0) {
          setLoading(false);
          setAllAlbums(albumData.albums);
        } else {
          setLoading(false);
          setAllAlbums(res.data.albums);
        }
      })
      .catch(err => {
        setLoading(false);
        console.log('err from api', err);
      });
  };

  const renderEachAlbum = ({item}) => {
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
              // uri: 'https://images.unsplash.com/photo-1524650359799-842906ca1c06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
              uri: `https://api.napster.com/imageserver/v2/albums/${item.id}/images/500x500.jpg`,
            }}
            style={{width: windowWidth / 3, height: 100, borderRadius: 10}}
          />
        </View>
        <View>
          <Text>
            {item.name} {moment(item.originallyReleased).format('MMM YYYY')}
          </Text>
          <Text>{item.artistName}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <View>
        <Text style={{textAlign: 'center', fontSize: 25}}>Popular Albums</Text>
      </View>

      {loading ? (
        <ActivityIndicator size={'small'} color={'#000'} />
      ) : (
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 20,
            paddingBottom: 50,
          }}>
          <FlatList
            data={allAlbums}
            renderItem={renderEachAlbum}
            keyExtractor={item => item.id}
            horizontal={false}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default AlbumListing;
