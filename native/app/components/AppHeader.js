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
    lineHeight: 22,
  },
});

export default AppHeader;
