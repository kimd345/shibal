import React, { useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import Text from '../Text';
import Button from '../Button';
import ProgramCompleteScreen from '../../screens/training/ProgramCompleteScreen';

import useApi from '../../hooks/useApi';

import trainingsApi from '../../api/trainings';
import { actions } from '../../redux/ducks';

function SkillSliderItem({ stepNum, step, numSteps, entityId, program }) {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  
  const createSkillEnrollmentApi = useApi(trainingsApi.createEnrollment);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const dogId = useSelector(state => state.dog.id);
  const trainingIds = useSelector(state => state.trainingIds);
  const enrollments = useSelector(state => state.enrollments);
  const enrollment = enrollments[entityId];

  const handlePress = async () => {
    if (enrollment === undefined) {
      await createSkillEnrollmentApi.request(entityId, dogId, 'Skill', 'Completed')
        .then(result => dispatch(actions.addEnrollment(result.data)))
        .then(() => {
          checkCompletion()
            ? setModalVisible(true)
            : navigation.goBack();
      });
    }
  };

  const checkCompletion = () => {
    const enrollmentIds = Object.keys(enrollments).map(key => parseInt(key));
    const isComplete = trainingIds.join() === enrollmentIds.join()

    return isComplete;
  };

  const [modalVisible, setModalVisible] = useState(false);
  
  return (
    <View style={[styles.container, { width, height }]}>
      <ProgramCompleteScreen modalVisible={modalVisible} program={program} />
      <Entypo name="traffic-cone" size={60} color="black" />
      <Text style={styles.step}>Step {stepNum}</Text>
      <Text style={styles.directions}>{step}</Text>
      {numSteps === stepNum
        && (<Button 
              icon='bone'
              title='Finish' 
              width={125}
              color='primaryButton'
              onPress={handlePress}
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
    marginBottom: 50,
  },
  directions: {},
});

export default SkillSliderItem;