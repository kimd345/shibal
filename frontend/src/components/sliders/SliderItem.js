import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import Text from '../Text';

function SliderItem(props) {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  
  return (
    <View style={[styles.container, { width, height }]}>
      <Entypo name="traffic-cone" size={60} color="black" />
      <Text>Step {props.stepNum}</Text>
      <Text style={styles.directions}>{props.item}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 30,
  },
  directions: {
    top: '15%',
    lineHeight: 28,
  },
});

export default SliderItem;