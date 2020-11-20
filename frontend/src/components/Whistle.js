import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Audio } from 'expo-av';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import logger from '../utility/logger';

function Whistle({ size }) {
  const whistle = new Audio.Sound();

  const HandleWhistlePress = async () => {
    try {
      await whistle.unloadAsync();
      await whistle.loadAsync(require('../assets/whistles/light_whistle.mp3'));
      await whistle.playAsync();
    } catch (error) {
      alert("Couldn't load whistle asset.");
      logger.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={HandleWhistlePress}>
      <MaterialCommunityIcons
        name='whistle'
        size={size}
        color={colors.whistle}
      />
    </TouchableOpacity>
  );
}

export default Whistle;
