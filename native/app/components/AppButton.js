import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import colors from '../config/colors';
import fonts from '../config/fonts';

function AppButton({
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
  fontWeight = '400',
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors[color],
          width,
          height,
          margin,
          borderColor: colors[borderColor],
          borderWidth,
        },
      ]}
      activeOpacity={0.65}
      onPress={onPress}
    >
      <Text
        style={{
          color: colors[textColor],
          fontFamily: fonts[fontFamily],
          fontSize,
          fontWeight,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1.5,
    elevation: 2.5,
  },
});

export default AppButton;
