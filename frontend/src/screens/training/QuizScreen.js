import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import colors from '../../config/colors';
import Screen from '../../components/Screen';
import Header from '../../components/Header';
import Text from '../../components/Text';
import Icon from '../../components/Icon';
import QuizChoiceItem from '../../components/trainings/QuizChoiceItem';

function QuizScreen({ navigation, route }) {
  const quiz = route.params;
  const choices = route.params.choices;

  const quizEnrollment = useSelector(state => state.enrollments[quiz.id]);

  return (
    <Screen style={styles.screen}>
      <View style={styles.infoContainer}>
        <Icon name='question' size={120} backgroundColor='white' iconColor='salmon' />
        <Header style={styles.header}>Daily Question</Header>
        <Text style={styles.prompt}>{quiz.prompt}</Text>
      </View>
      {(quizEnrollment === undefined)
        ? <FlatList
            data={choices}
            keyExtractor={(choice) => choices.indexOf(choice).toString()}
            renderItem={({ item }) => (
              <QuizChoiceItem
                choice={item}
                quiz={quiz}
                choices={choices}
              />
            )}
          />
        : <View style={styles.answerContainer}>
            <View style={styles.answerWrapper}>
              <Text>{choices[quiz.answer_idx]}</Text>
            </View>
            <View style={styles.explanationWrapper}>
              <FlatList
                data={quiz.explanation}
                keyExtractor={(paragraph) => quiz.explanation.indexOf(paragraph).toString()}
                renderItem={({ item }) => (
                  <Text>{item}</Text>
                )}
              />
            </View>
          </View>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
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
  answerContainer: {
    width: '90%',
  },
  answerWrapper: {
    backgroundColor: colors.grass,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  explanationWrapper: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

export default QuizScreen;
