import React from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../../config/colors';
import Icon from '../Icon';

function CompletedIcon(props) {
  return (
    <View style={styles.container}>
      <Icon 
        name='check' 
        backgroundColor={colors.grass}
        iconColor='white'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    position: 'absolute',
    top: 15,
    left: 15,
  },
});

export default CompletedIcon;