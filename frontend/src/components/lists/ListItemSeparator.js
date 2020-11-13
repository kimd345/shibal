import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../../config/colors';

function ListItemSeparator({ height=1, color=colors.palegrey }) {
  return <View style={[{ height, backgroundColor: color }, styles.separator]} />;
}

const styles = StyleSheet.create({
  separator: {
    width: '100%',
  },
});

export default ListItemSeparator;
