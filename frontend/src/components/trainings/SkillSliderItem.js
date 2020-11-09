import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import Text from '../Text';
import Button from '../Button';

import useApi from '../../hooks/useApi';

import trainingsApi from '../../api/trainings';
import { actions } from '../../redux/ducks';

function SkillSliderItem({ stepNum, step, numSteps, entityId }) {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  
  const createSkillEnrollmentApi = useApi(trainingsApi.createEnrollment);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const dogId = useSelector(state => state.dog.id);
  const enrollment = useSelector(state => state.enrollments[entityId]);
  
  return (
    <View style={[styles.container, { width, height }]}>
      <Entypo name="traffic-cone" size={60} color="black" />
      <Text style={styles.step}>Step {stepNum}</Text>
      <Text style={styles.directions}>{step}</Text>
      {numSteps === stepNum
        && (<Button 
              title='Finish' 
              width={100}
              color='primaryButton'
              onPress={async () => {
                if (enrollment === undefined) {
                  await createSkillEnrollmentApi.request(entityId, dogId, 'Skill', 'Completed')
                    .then(result => dispatch(actions.addEnrollment(result.data)));
                }
                navigation.goBack();
              }}
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
  directions: {
    lineHeight: 28,
  },
});

export default SkillSliderItem;