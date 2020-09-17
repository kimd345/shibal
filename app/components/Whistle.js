import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';

function Whistle({}) {
  const whistle = new Audio.Sound();

  const HandleWhistlePress = async () => {
    try {
      await whistle.unloadAsync();
      await whistle.loadAsync(require('../assets/whistles/mariah_whistle.mp3'));
      await whistle.playAsync();
    } catch (error) {
      alert("Couldn't load whistle asset.");
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={HandleWhistlePress}>
      <MaterialCommunityIcons
        name='whistle'
        size={200}
        color={colors.mossygrey}
      />
    </TouchableOpacity>
  );
}

export default Whistle;
