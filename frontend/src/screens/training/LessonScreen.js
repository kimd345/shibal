import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text from '../../components/Text';
import colors from '../../config/colors';
import routes from '../../navigation/routes';
import LessonCard from '../../components/trainings/LessonCard';

function LessonScreen({ navigation, route }) {
  const program = route.params.program
  const lesson = route.params.lesson;
  const quizPrompt = lesson.quizzes[0].prompt;
  const skillsDuration = (lesson.skills.reduce((totalDuration, skill) => {
    return (totalDuration + skill.duration);
  }, 0) / 60);
  const activityTask = lesson.activities[0].tasks[0];

  return (
    <>
      <View style={styles.infoContainer}>
        <Text style={styles.programTitle}>{program.title}</Text>
        <Text style={styles.lessonTitle}>{lesson.title}</Text>
      </View>
      <LessonCard
        icon='question'
        title='Quiz'
        subTitle={quizPrompt}
        entity={lesson.quizzes[0]}
        onPress={() => navigation.navigate(routes.QUIZ, lesson.quizzes[0])}
      />
      <LessonCard
        icon='flag-checkered'
        title='Training'
        subTitle={`${skillsDuration} min`}
        entity={lesson.skills}
        onPress={() => navigation.navigate(routes.SKILLS, lesson.skills)}
      />
      <LessonCard
        icon='clipboard-list'
        title='Activity'
        subTitle={activityTask}
        entity={lesson.activities[0]}
        onPress={() => navigation.navigate(routes.ACTIVITY, lesson.activities[0])}
      />
    </>
  );
}

const styles = StyleSheet.create({
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
