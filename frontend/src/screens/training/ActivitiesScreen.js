import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../config/colors';
import Header from '../../components/Header';
import Text from '../../components/Text';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import ActivityTaskCard from '../../components/trainings/ActivityTaskCard';

import routes from '../../navigation/routes';

import useApi from '../../hooks/useApi';

import trainingsApi from '../../api/trainings';
import { actions } from '../../redux/ducks';

function ActivitiesScreen({ navigation, route }) {
  const activityId = route.params.id;
  const tasks = route.params.tasks;

  const createActivityEnrollmentApi = useApi(trainingsApi.createEnrollment);

  const dispatch = useDispatch();

  const dogId = useSelector(state => state.dog.id);
  const enrollment = useSelector(state => state.enrollments[activityId]);

  return (
    <View style={styles.screen}>
      <View style={styles.infoContainer}>
        <Icon name='clipboard-list' size={120} backgroundColor='white' iconColor='salmon' />
        <Header style={styles.header}>List of activity tasks</Header>
        <Text style={styles.prompt}>Spend some time with your dog and complete these tasks during the day</Text>
      </View>
      <ActivityTaskCard
        entityId={activityId}
        tasks={tasks}
      />
      {!enrollment
        && <Button 
              title='Finish' 
              width={100}
              color='primaryButton'
              onPress={async () => {
                await createActivityEnrollmentApi.request(activityId, dogId, 'Activity', 'Completed')
                  .then(result => dispatch(actions.addEnrollment(result.data)));
                navigation.goBack();
              }}
          />}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    alignItems: 'center',
    flex: 1,
  },
  infoContainer: {
    alignItems: 'center',
    margin: 20,
    width: '80%',
  },
  header: {
    lineHeight: 40,
  },
  prompt: {
    color: colors.mossygrey,
    lineHeight: 30,
  },
  lessonTitle: {
    color: colors.mossygrey,
    fontSize: 18,
  },
});

export default ActivitiesScreen;
