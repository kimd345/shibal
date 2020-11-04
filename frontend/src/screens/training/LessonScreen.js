import React from 'react';
import { StyleSheet, View } from 'react-native';

import Screen from '../../components/Screen';
import Text from '../../components/Text';
import colors from '../../config/colors';
import routes from '../../navigation/routes';
import LessonCard from '../../components/trainings/LessonCard';

function LessonScreen({ navigation, route }) {
  const programTitle = route.params.programTitle;
  const lesson = route.params.lesson;

  return (
    <Screen style={styles.screen}>
      <View style={styles.infoContainer}>
        <Text style={styles.programTitle}>{programTitle}</Text>
        <Text style={styles.lessonTitle}>{lesson.title.split(' - ')[0]} Plan</Text>
      </View>
      <LessonCard
        icon='question'
        title='Quiz'
        subTitle={lesson.quizzes[0].prompt}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
  },
  infoContainer: {
    alignSelf: 'flex-start',
    padding: 30,
  },
  programTitle: {
    color: colors.mossygrey,
    fontSize: 12,
    textAlign: 'left',
  },
  lessonTitle: {
    color: colors.mossygrey,
    fontSize: 18,
  },
});

export default LessonScreen;
