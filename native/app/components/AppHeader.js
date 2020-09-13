import React from 'react';
import { Text, StyleSheet } from 'react-native';

import colors from '../config/colors';

function AppHeader({ children, style }) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Osake',
    fontSize: 20,
    color: colors.black,
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 34,
    margin: 10,
  },
});

export default AppHeader;
