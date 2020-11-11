import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import useProgress from '../../hooks/useProgress';

import colors from '../../config/colors';
import Text from '../Text';
import Header from '../Header';
import ProgramStatus from './ProgramStatus';

function ProgramCard({ program, entityId, title, subTitle, image, onPress, backgroundColor }) {
  // temporary solution: programs are static in TrainingScreen for now
  const [status, setStatus] = useState();

  const progress = useProgress();

  progress.setTrainingIds(program);

  const enrollment = (entityId === 1)
    ? useSelector(state => state.enrollments[entityId])
    : undefined;

  useFocusEffect(() => {
    if (enrollment !== undefined) {
      setStatus(enrollment.status);
    }
  });
  
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors[backgroundColor] }]} 
      onPress={onPress}
      activeOpacity={0.65}
    >
      {status &&
        <ProgramStatus program={program} />
      }
      <Image style={styles.image} source={image} />
      <View style={styles.detailsContainer}>
        <Header style={styles.title}>{title}</Header>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: colors.mossygrey,
    marginHorizontal: 20,
    marginVertical: 5,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 150,
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
    width: '60%',
  },
  title: {
    marginBottom: 7,
    textAlign: 'left',
    color: colors.white,
  },
  subTitle: {
    fontSize: 12,
    textAlign: 'left',
    color: colors.white,
  },
  image: {
    width: 175,
    maxHeight: 150,
    position: 'absolute',
    bottom: 0,
    right: -20,
  },
});

export default ProgramCard;
