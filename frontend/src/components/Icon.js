import React from 'react';
import { View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import colors from '../config/colors';

function Icon({
  name,
  size = 40,
  backgroundColor,
  iconColor = '#fff',
  borderWidth = 0,
  borderColor = colors.primaryButton,
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth,
        borderColor,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FontAwesome5 name={name} color={iconColor} size={size * 0.5} />
    </View>
  );
}

export default Icon;
