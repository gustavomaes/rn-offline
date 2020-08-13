import React from 'react';
import {View, Text, Image, Button} from 'react-native';

const Movie = ({movie, updateTitle, deleteItem}) => {
  const {Title, Plot, Images} = movie;
  return (
    <View
      style={{
        width: '100%',
        padding: 16,
        backgroundColor: '#CCC',
      }}>
      <Text style={{fontSize: 18, fontWeight: '600'}}>{Title}</Text>
      <Text style={{fontSize: 14, fontWeight: '300'}}>{Plot}</Text>
      <Image
        source={{uri: Images}}
        resizeMode="contain"
        style={{width: '100%', height: 200, alignSelf: 'center'}}
      />
      <Button title="update" onPress={() => updateTitle(movie)} />
      <Button title="delete" onPress={() => deleteItem(movie)} />
      <View
        style={{
          width: '90%',
          height: 1,
          backgroundColor: 'black',
          marginTop: 16,
        }}
      />
    </View>
  );
};

export default Movie;
