import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import colors from '../../config/colors';
import Screen from '../../components/Screen';
import Header from '../../components/Header';
import Text from '../../components/Text';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import ActivityTaskCard from '../../components/trainings/ActivityTaskCard';

import routes from '../../navigation/routes';

function QuizScreen({ navigation, route }) {
  const activity = route.params;
  const tasks = route.params.tasks;

  return (
    <View style={styles.screen}>
      <View style={styles.infoContainer}>
        <Icon name='clipboard-list' size={120} backgroundColor='white' iconColor='salmon' />
        <Header style={styles.header}>List of activity tasks</Header>
        <Text style={styles.prompt}>Spend some time with your dog and complete these tasks during the day</Text>
      </View>
      <ActivityTaskCard
        tasks={tasks}
      />
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

export default QuizScreen;
