import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../config/defaultStyles';
import colors from '../config/colors';

function AppButton({
  icon = '',
  title = 'Coming Soon!',
  onPress = () => alert('Coming Soon!'),
  color = 'primaryButton',
  width = '100%',
  height = 50,
  margin = 15,
  marginBottom = 15,
  borderWidth = 0,
  borderColor = 'black',
  textColor = 'white',
  fontFamily = 'fontFamily',
  fontSize = 15,
  fontWeight = '500',
  textDecorationLine = 'none',
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
          marginBottom,
          borderWidth,
          borderColor: colors[borderColor],
        },
      ]}
      activeOpacity={0.65}
      onPress={onPress}
    >
      {icon ? (
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={textColor}
          style={{ position: 'absolute', left: 20 }}
        />
      ) : null}
      <View 
        style={[
          styles.textWrapper,
          {
            width: width,
            paddingLeft: icon ? 30 : 0
          }
        ]}
      >
        <Text
          style={{
            color: colors[textColor],
            fontFamily: defaultStyles.systemText[fontFamily],
            fontSize,
            fontWeight,
            textDecorationLine,
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2.5,
  },
  textWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default AppButton;
