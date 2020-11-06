import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import Text from '../Text';
import Button from '../Button';

function SkillSliderItem(props) {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  
  return (
    <View style={[styles.container, { width, height }]}>
      <Entypo name="traffic-cone" size={60} color="black" />
      <Text style={styles.step}>Step {props.stepNum}</Text>
      <Text style={styles.directions}>{props.item}</Text>
      {props.numSteps === props.stepNum
        && (<Button 
              title='Finish' 
              width='50%'
              color='primaryButton'
              onPress={() => alert('SkillSliderItem.js')}
            />)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 30,
  },
  step: {
    marginBottom: 100,
  },
  directions: {
    lineHeight: 28,
  },
});

export default SkillSliderItem;