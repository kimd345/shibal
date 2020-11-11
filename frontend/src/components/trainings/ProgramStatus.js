import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import colors from '../../config/colors';
import Text from '../Text';

import trainingsApi from '../../api/trainings';
import { actions } from '../../redux/ducks';

function ProgramStatus({ program }) {
  const [completed, setCompleted] = useState(false);

  const dogId = useSelector(state => state.dog.id);
  const trainingIds = useSelector(state => state.trainingIds);
  const enrollments = useSelector(state => state.enrollments);

  const dispatch = useDispatch();

  useFocusEffect(() => {
    setCompleted(checkCompletion());
    // if (completed) {
    //   fetchProgramCompletion(program.id, dogId);
    // }
  });

  const checkCompletion = () => {
    const enrollmentIds = Object.keys(enrollments).map(key => parseInt(key));
    const isComplete = trainingIds.join() === enrollmentIds.join()

    return isComplete;
  };

  const fetchProgramCompletion = async (programId, dogId) => {
    await trainingsApi.completeProgramEnrollment(programId, dogId)
      .then(result => dispatch(actions.editProgramEnrollment(result.data)));
  };
  
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