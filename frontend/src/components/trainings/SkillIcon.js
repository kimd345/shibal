import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import Icon from '../Icon';
import Text from '../Text';
import CompletedIcon from './CompletedIcon';

function SkillIcon({ item, onPress }) {
  const [completed, setCompleted] = useState(false);
  const enrollments = useSelector(state => state.enrollments);

  useFocusEffect(() => {
    if (enrollments[item.id] !== undefined) {
      if (enrollments[item.id].status === 'Completed') {
        setCompleted(true);
      }
    }
  });

  return (
    <View style={styles.container}>
      {completed && <CompletedIcon />}
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

export default SkillIcon;
