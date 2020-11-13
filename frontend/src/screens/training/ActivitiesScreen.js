import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../config/colors';
import Header from '../../components/Header';
import Text from '../../components/Text';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import ActivityTaskCard from '../../components/trainings/ActivityTaskCard';
import ProgramCompleteScreen from './ProgramCompleteScreen';

import useApi from '../../hooks/useApi';

import trainingsApi from '../../api/trainings';
import { actions } from '../../redux/ducks';

function ActivitiesScreen({ navigation, route }) {
  const activityId = route.params.activity.id;
  const tasks = route.params.activity.tasks;
  const program = route.params.program;

  const createActivityEnrollmentApi = useApi(trainingsApi.createEnrollment);

  const dispatch = useDispatch();

  const dogId = useSelector(state => state.dog.id);
  const trainingIds = useSelector(state => state.trainingIds);
  const enrollments = useSelector(state => state.enrollments);
  const enrollment = enrollments[activityId];

  const handlePress = async () => {
    await createActivityEnrollmentApi.request(activityId, dogId, 'Activity', 'Completed')
      .then(result => dispatch(actions.addEnrollment(result.data)))
      .then(() => {
        checkCompletion()
          ? setModalVisible(true)
          : navigation.goBack();
      })
  };

  const checkCompletion = () => {
    const enrollmentIds = Object.keys(enrollments).map(key => parseInt(key));
    const isComplete = trainingIds.join() === enrollmentIds.join()

    return isComplete;
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.screen}>
      <ProgramCompleteScreen modalVisible={modalVisible} program={program} />
      <View style={styles.infoContainer}>
        <Icon name='clipboard-list' size={120} iconColor='salmon' />
        <Header style={styles.header}>List of activity tasks</Header>
        <Text style={styles.prompt}>Spend some time with your dog and complete these tasks during the day</Text>
      </View>
      <ActivityTaskCard
        entityId={activityId}
        tasks={tasks}
      />
      {!enrollment
        && <Button
              icon='check'
              title='Complete' 
              width={155}
              color='primaryButton'
              onPress={handlePress}
          />}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.palegrey,
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
