import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../config/colors';
import Screen from '../../components/Screen';
import Header from '../../components/Header';
import Text from '../../components/Text';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import ActivityTaskCard from '../../components/trainings/ActivityTaskCard';
import ProgramCompleteScreen from './ProgramCompleteScreen';

import useApi from '../../hooks/useApi';
import useProgress from '../../hooks/useProgress';

import trainingsApi from '../../api/trainings';
import { actions } from '../../redux/ducks';
import LessonCompleteScreen from './LessonCompleteScreen';

function ActivitiesScreen({ navigation, route }) {
  const activityId = route.params.activity.id;
  const tasks = route.params.activity.tasks;
  const program = route.params.program;
  const lesson = route.params.lesson;

  const createActivityEnrollmentApi = useApi(trainingsApi.createEnrollment);

  const dispatch = useDispatch();
  const progress = useProgress();

  const dogId = useSelector(state => state.dog.id);
  const trainingIds = useSelector(state => state.trainingIds);
  const enrollments = useSelector(state => state.enrollments);
  const enrollment = enrollments[activityId];

  const handlePress = async () => {
    await createActivityEnrollmentApi.request(activityId, dogId, 'Activity', 'Completed')
      .then(result => dispatch(actions.addEnrollment(result.data)))
      .then(() => {
        if (progress.checkProgramCompletion(enrollments, trainingIds)) {
            setProgramCompleteVisible(true);
          } else if (progress.checkTrainingCompletion(enrollments, lesson)) {
            setLessonCompleteVisible(true);
          } else {
            navigation.goBack();
          }
      })
  };

  const [programCompleteVisible, setProgramCompleteVisible] = useState(false);
  const [lessonCompleteVisible, setLessonCompleteVisible] = useState(false);

  return (
    <Screen style={styles.screen}>
      <ProgramCompleteScreen modalVisible={programCompleteVisible} program={program} />
      <LessonCompleteScreen modalVisible={lessonCompleteVisible} lesson={lesson} />
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.palegrey,
    alignItems: 'center',
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
