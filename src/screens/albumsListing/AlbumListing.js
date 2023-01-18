import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import axios from 'axios';
import Config from 'react-native-config';
import {albumData} from './albumData';
import moment from 'moment';
import Shimmer from 'react-native-shimmer';

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
        setAllAlbums(albumData.albums);
      });
  };

  const renderEachAlbum = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          width: windowWidth / 2.5,
          marginBottom: 30,
        }}
        onPress={() =>
          navigation.navigate('IndividualAlbum', {
            itemId: item.id,
            trackUrl: item.links.tracks.href,
          })
        }>
        <View style={styles.cd}></View>
        <View style={{position: 'absolute', borderRadius: 20}}>
          <Image
            source={{
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
          <Text>{item.trackCount} Track(s)</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEachAlbumLoad = ({item}) => {
    return (
      <Shimmer
        style={{
          width: windowWidth / 2.5,
          marginBottom: 30,
        }}>
        <View style={[styles.cd, {backgroundColor: 'grey'}]}></View>
      </Shimmer>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View>
        <Text style={{textAlign: 'center', fontSize: 25}}>Popular Albums</Text>
      </View>

      {loading ? (
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 20,
            paddingBottom: 50,
          }}>
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8]}
            renderItem={renderEachAlbumLoad}
            keyExtractor={item => item}
            horizontal={false}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
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
