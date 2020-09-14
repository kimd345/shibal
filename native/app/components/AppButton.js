import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../config/defaultStyles';

function AppButton({
  iconName = '',
  title = 'Coming Soon!',
  onPress = () => alert('Coming Soon!'),
  color = 'primaryButton',
  width = '100%',
  height = 50,
  margin = 10,
  borderWidth = 0,
  borderColor = 'black',
  textColor = 'white',
  fontFamily = 'primary',
  fontSize = 14,
  fontWeight = '500',
}) {
  return (
    <TouchableOpacity
      style={[
        defaultStyles.button,
        {
          backgroundColor: defaultStyles.colors[color],
          width,
          height,
          margin,
          borderWidth,
          borderColor: defaultStyles.colors[borderColor],
        },
      ]}
      activeOpacity={0.65}
      onPress={onPress}
    >
      {iconName ? (
        <MaterialCommunityIcons
          name={iconName}
          size={24}
          color={textColor}
          style={{ position: 'absolute', left: 20, marginRight: 10 }}
        />
      ) : null}
      <Text
        style={{
          color: defaultStyles.colors[textColor],
          fontFamily: defaultStyles.button[fontFamily],
          fontSize,
          fontWeight,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default AppButton;
