import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Button from '../Button';
import Text from '../Text';

import useApi from '../../hooks/useApi';

import trainingsApi from '../../api/trainings';
import { actions } from '../../redux/ducks';

function Timer({ duration, entityId }) {
  const [seconds, setSeconds] = useState(duration);

  const createSkillEnrollmentApi = useApi(trainingsApi.createEnrollment);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const dogId = useSelector(state => state.dog.id);
  const enrollment = useSelector(state => state.enrollments[entityId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (seconds > 0) setSeconds(seconds - 1);
    }, 1000)
    return () => clearTimeout(timer);
  });

  return (
    <View style={styles.container}>
      {seconds > 0
        ? <Text style={styles.text}>
            {`${new Date(seconds * 1000).toISOString().substr(15, 4)}`}
          </Text>
        : <Button 
            title='Finish'
            onPress={async () => {
              if (enrollment === undefined) {
                await createSkillEnrollmentApi.request(entityId, dogId, 'Skill', 'Completed')
                  .then(result => dispatch(actions.addEnrollment(result.data)));
              }
              navigation.goBack();
            }} 
          />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 50,
    width: 100,
  },
});

export default Timer;