import React from 'react';
import { Text, StyleSheet } from 'react-native';

import colors from '../config/colors';

function AppText({ children, style }) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'DogeSans-Regular',
    fontSize: 16,
    color: colors.primaryText,
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 27,
    margin: 10,
  },
});

export default AppText;
