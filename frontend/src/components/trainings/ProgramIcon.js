import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../../config/colors';
import Icon from '../Icon';
import Text from '../Text';

function ProgramIcon({ item, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Icon
          backgroundColor='salmon'
          name='flag-checkered'
          size={80}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: 'center',
    width: '33%',
  },
  title: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default ProgramIcon;
