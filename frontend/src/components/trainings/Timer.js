import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Button from '../Button';
import Text from '../Text';

import useApi from '../../hooks/useApi';

import trainingsApi from '../../api/trainings';
import { actions } from '../../redux/ducks';
import colors from '../../config/colors';

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
    <View>
      {seconds > 0
        ? <View style={styles.textWrapper}>
            <Text style={styles.text}>
              {`${new Date(seconds * 1000).toISOString().substr(15, 4)}`}
            </Text>
          </View>
        : <Button 
            icon='bone'
            width={125}
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
  textWrapper: {
    width: 50,
    marginLeft: 45,
    marginRight: 45,
    borderColor: colors.forest,
    borderWidth: 1,
    borderRadius: 7,
  },
  text: {
    color: colors.forest,
  }
});

export default Timer;