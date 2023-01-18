import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {styles} from './styles';
import {trackData} from '../albumsListing/albumData';
import Shimmer from 'react-native-shimmer';
import Config from 'react-native-config';
import axios from 'axios';

const IndividualAlbum = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [allTracks, setAllTracks] = useState('');
  const actions = [
    {
      id: 1,
      icon: 'share',
      name: 'Share',
    },
    {
      id: 2,
      icon: 'download',
      name: 'Download',
    },
    {
      id: 3,
      icon: 'heart',
      name: 'Favourite',
    },
  ];

  useEffect(() => {
    if (route.params.trackUrl) {
      console.log('track url => useEffect', route.params.trackUrl);
      getAllTracks();
    }
  }, [route]);

  const renderEachAlbum = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}
        onPress={() =>
          navigation.navigate('Song', {
            previewUrl: item.previewURL,
            albumId: route.params.itemId,
          })
        }>
        <View style={{width: '10%'}}>
          <Text style={{textAlign: 'center'}}>
            {index.toString().length == 1 ? `0${index + 1}` : index + 1}
          </Text>
        </View>
        <View style={{width: '80%'}}>
          <Text style={{marginLeft: 10, fontSize: 20}}>{item.name}</Text>
          <Text style={{marginLeft: 10}}>{item.artistName}</Text>
        </View>
        <View style={{width: '10%'}}>
          <SimpleLineIcons name="options-vertical" size={15} color={'grey'} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderEachAlbumLoad = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
          justifyContent: 'space-between',
        }}>
        <Shimmer style={{width: '5%'}}>
          <View style={{height: 30, backgroundColor: 'grey'}}></View>
        </Shimmer>
        <Shimmer style={{width: '75%'}}>
          <View style={{height: 30, backgroundColor: 'grey'}}></View>
        </Shimmer>
        <Shimmer style={{width: '5%'}}>
          <View style={{height: 30, backgroundColor: 'grey'}}></View>
        </Shimmer>
      </View>
    );
  };

  const getAllTracks = async () => {
    setLoading(true);
    const config = {
      method: 'get',
      url: `${route.params.trackUrl}`,
      headers: {
        'Content-Type': 'application/json',
        apikey: Config.API_KEY,
      },
    };
    console.log('getAllTracks => config', config);
    axios(config)
      .then(res => {
        if (res.data.tracks.length == 0) {
          setLoading(false);
          setAllTracks(trackData.tracks);
        } else {
          setLoading(false);
          setAllTracks(res.data.tracks);
        }
      })
      .catch(err => {
        setLoading(false);
        console.log('err from tracks', err);
        setAllTracks(trackData.tracks);
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#ac9a1e'}}>
      <View>
        <AntDesign
          name="left"
          size={25}
          style={{marginTop: 10, marginLeft: 10, width: 25}}
          onPress={() => navigation.goBack()}
          color={'white'}
        />
        <ScrollView>
          <View style={{paddingBottom: 100}}>
            <View>
              <View style={styles.header}>
                {loading ? (
                  <Shimmer style={{width: '30%'}}>
                    <View
                      style={{
                        width: '30%',
                        height: 100,
                        backgroundColor: 'white',
                        borderRadius: 10,
                      }}></View>
                  </Shimmer>
                ) : (
                  <View style={{width: '30%'}}>
                    <Image
                      source={{
                        uri: `https://api.napster.com/imageserver/v2/albums/${route.params.itemId}/images/500x500.jpg`,
                      }}
                      style={{width: '100%', height: 100, borderRadius: 10}}
                    />
                  </View>
                )}
                <View style={{width: '70%'}}>
                  {loading ? (
                    <Shimmer>
                      <View
                        style={{
                          height: 10,
                          backgroundColor: 'white',
                          marginLeft: 20,
                        }}></View>
                    </Shimmer>
                  ) : (
                    <Text style={styles.albumNameText}>Kantara</Text>
                  )}
                  <View
                    style={{
                      marginLeft: 20,
                      marginTop: 10,
                      flexDirection: 'row',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Feather name="headphones" size={20} color={'white'} />
                      <Text
                        style={{marginLeft: 10, color: 'white', fontSize: 12}}>
                        64k
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 10,
                      }}>
                      <AntDesign name="hearto" size={20} color={'white'} />
                      <Text
                        style={{marginLeft: 10, color: 'white', fontSize: 12}}>
                        1.0k
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.actionsView}>
                {actions.map(action => (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Feather name={action.icon} size={30} color={'white'} />
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      {action.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.tracksView}>
              <View style={styles.playAllChecklist}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={styles.playAll}>
                    <AntDesign name="play" size={20} color={'white'} />
                    <Text style={{marginLeft: 10}}>Play All</Text>
                  </View>
                  <Feather name={'list'} size={25} color={'grey'} />
                </View>

                <View style={{marginTop: 10}}>
                  {loading ? (
                    <FlatList
                      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                      renderItem={renderEachAlbumLoad}
                      keyExtractor={item => item}
                      showsVerticalScrollIndicator={false}
                    />
                  ) : (
                    <FlatList
                      data={allTracks}
                      renderItem={renderEachAlbum}
                      keyExtractor={item => item.id}
                      showsVerticalScrollIndicator={false}
                    />
                  )}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default IndividualAlbum;
