import {View, Text, Image} from 'react-native';
import React from 'react';

const IndividualAlbum = ({route}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#ac9a1e'}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{backgroundColor: 'red', width: '30%'}}>
          <Image
            source={{
              uri: `https://api.napster.com/imageserver/v2/albums/${route.params.itemId}/images/500x500.jpg`,
            }}
            style={{width: '100%', height: 100, borderRadius: 10}}
          />
        </View>
        <View
          style={{backgroundColor: 'blue', height: 50, width: '70%'}}></View>
      </View>
    </View>
  );
};

export default IndividualAlbum;
