import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

import Text from '../Text';
import Header from '../Header';
import colors from '../../config/colors';
import Icon from '../Icon';
import CompletedIcon from './CompletedIcon';

function LessonCard({ title, subTitle, icon, onPress, entity }) {
  const enrollments = useSelector(state => state.enrollments);
  // const completed = enrollments[entity.id] !== undefined;
  const [completed, setCompleted] = useState(false);

  // console.log(entity);
  useFocusEffect(() => {
    if (entity.answer_idx !== undefined) {  // is quiz
      if (enrollments[entity.id] !== undefined) { // is enrolled
        if (enrollments[entity.id].status === 'Completed') { // is completed
          setCompleted(true);
        }
      }
    } else if (entity[0].duration !== undefined) {  // is skills
      const skillIds = entity.map(skill => skill.id);
      setCompleted(skillIds.every(id => enrollments.hasOwnProperty(id)));
    }
  }, [enrollments])

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress} 
      activeOpacity={0.65}
    > 
      {completed && <CompletedIcon />}
      <Icon name={icon} size={80} backgroundColor='white' iconColor='salmon' />
      <View style={styles.detailsContainer}>
        <Header style={styles.title}>{title}</Header>
        <Text style={styles.subTitle} numberOfLines={1}>{subTitle}</Text>
      </View>
      <FontAwesome5 name='chevron-right' color='#2e332e' size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginVertical: 5,
    height: 120,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  detailsContainer: {
    padding: 20,
    width: '70%',
  },
  title: {
    color: colors.mossygrey,
    textAlign: 'left',
  },
  subTitle: {
    color: colors.mossygrey,
    fontSize: 12,
    textAlign: 'left',
  },
});

export default LessonCard;
