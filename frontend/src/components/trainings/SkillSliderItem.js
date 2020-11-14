import React, { useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import Text from '../Text';
import Button from '../Button';
import ProgramCompleteScreen from '../../screens/training/ProgramCompleteScreen';
import LessonCompleteScreen from '../../screens/training/LessonCompleteScreen';

import useApi from '../../hooks/useApi';
import useProgress from '../../hooks/useProgress';

import trainingsApi from '../../api/trainings';
import { actions } from '../../redux/ducks';

function SkillSliderItem({ stepNum, step, numSteps, entityId, program, lesson }) {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  
  const createSkillEnrollmentApi = useApi(trainingsApi.createEnrollment);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const progress = useProgress();

  const dogId = useSelector(state => state.dog.id);
  const trainingIds = useSelector(state => state.trainingIds);
  const enrollments = useSelector(state => state.enrollments);
  const enrollment = enrollments[entityId];

  const handlePress = async () => {
    if (enrollment === undefined) {
      await createSkillEnrollmentApi.request(entityId, dogId, 'Skill', 'Completed')
        .then(result => dispatch(actions.addEnrollment(result.data)))
        .then(() => {
          if (progress.checkProgramCompletion(enrollments, trainingIds)) {
            setProgramCompleteVisible(true);
          } else if (progress.checkTrainingCompletion(enrollments, lesson)) {
            setLessonCompleteVisible(true);
          } else {
            navigation.goBack();
          }
      });
    }
  };

  const [programCompleteVisible, setProgramCompleteVisible] = useState(false);
  const [lessonCompleteVisible, setLessonCompleteVisible] = useState(false);
  
  return (
    <View style={[styles.container, { width, height }]}>
      <ProgramCompleteScreen modalVisible={programCompleteVisible} program={program} />
      <LessonCompleteScreen modalVisible={lessonCompleteVisible} lesson={lesson} />
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