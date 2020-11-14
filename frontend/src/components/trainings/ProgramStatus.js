import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import colors from '../../config/colors';
import Text from '../Text';

import useProgress from '../../hooks/useProgress';

import trainingsApi from '../../api/trainings';
import { actions } from '../../redux/ducks';

function ProgramStatus({ program }) {
  const [completed, setCompleted] = useState(false);

  // const dogId = useSelector(state => state.dog.id);
  const trainingIds = useSelector(state => state.trainingIds);
  const enrollments = useSelector(state => state.enrollments);

  const dispatch = useDispatch();
  const checkProgramCompletion = useProgress().checkProgramCompletion;

  useFocusEffect(() => {
    setCompleted(checkProgramCompletion(enrollments, trainingIds));
    // if (completed) {
    //   fetchProgramCompletion(program.id, dogId);
    // }
  });

  // const fetchProgramCompletion = async (programId, dogId) => {
  //   await trainingsApi.completeProgramEnrollment(programId, dogId)
  //     .then(result => dispatch(actions.editProgramEnrollment(result.data)));
  // };
  
  return (
    <View style={styles.statusWrapper}>
      <Text style={styles.statusText}>
        {completed ? 'Complete' : 'In Progress'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statusWrapper: {
    position: 'absolute',
    top: 10,
    left: 10,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: colors.white,
    paddingHorizontal: 10,
  },
  statusText: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default ProgramStatus;