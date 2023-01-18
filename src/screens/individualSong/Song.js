import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const Song = ({route, navigation}) => {
  const [showPlayBtn, setShowPlayBtn] = useState(true);
  const {position, duration} = useProgress();

  const trackActions = [
    {
      id: 1,
      name: 'shuffle',
    },
    {
      id: 2,
      name: 'download',
    },
    {
      id: 3,
      name: 'heart',
    },
    {
      id: 4,
      name: 'list',
    },
  ];

  useEffect(() => {
    setupPlayerInComponent();
  }, []);

  useEffect(() => {
    console.log('useEffect => route outside', route);
    if (route.params.previewUrl) {
      console.log('Song => useEffect', route.params.previewUrl);
      start();
    }
  }, [route]);

  const start = async () => {
    console.log('inside start');
    // Set up the player

    await TrackPlayer.reset();
    // Add a track to the queue
    await TrackPlayer.add({
      id: '001',
      url: route.params.previewUrl,
      title: 'Track Title',
      artist: 'Track Artist',
      artwork: `https://api.napster.com/imageserver/v2/albums/${route.params.albumId}/images/500x500.jpg`,
    });

    // Start playing it
    // await TrackPlayer.play();
    console.log('playing');
  };

  const setupPlayerInComponent = async () => {
    await TrackPlayer.setupPlayer();
  };

  const songActions = async action => {
    if (action == 'play') {
      setShowPlayBtn(false);
      await TrackPlayer.play();
    }
    if (action == 'pause') {
      setShowPlayBtn(true);
      await TrackPlayer.pause();
    }
    if (action == 'forward') {
      await TrackPlayer.seekTo(position + 5);
    }
    if (action == 'back') {
      await TrackPlayer.seekTo(position - 5);
    }
  };
  return (
    <View style={{flex: 1}}>
      <View>
        <AntDesign
          name="left"
          size={25}
          style={{marginTop: 10, marginLeft: 10, width: 25}}
          onPress={() => navigation.goBack()}
          color={'black'}
        />
      </View>

      <View>
        <View
          style={{
            width: '80%',
            alignSelf: 'center',
            transform: [{rotate: '10 deg'}],
          }}>
          <Image
            source={{
              uri: `https://api.napster.com/imageserver/v2/albums/${route.params.albumId}/images/500x500.jpg`,
            }}
            style={{width: '100%', height: 300, borderRadius: 150}}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // backgroundColor: 'red',
            width: '80%',
            alignSelf: 'center',
            marginTop: 30,
            alignItems: 'center',
          }}>
          <AntDesign
            name="stepbackward"
            size={30}
            color={'black'}
            onPress={() => songActions('back')}
          />
          {showPlayBtn ? (
            <AntDesign
              name="play"
              size={45}
              onPress={() => songActions('play')}
              color={'black'}
            />
          ) : (
            <AntDesign
              name="pausecircle"
              size={45}
              onPress={() => songActions('pause')}
              color={'black'}
            />
          )}
          <AntDesign
            name="stepforward"
            size={30}
            color={'black'}
            onPress={() => songActions('forward')}
          />
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '80%',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignSelf: 'center',
          paddingBottom: 20,
        }}>
        {trackActions.map(action => (
          <Entypo name={action.name} size={25} />
        ))}
      </View>
    </View>
  );
};

export default Song;
