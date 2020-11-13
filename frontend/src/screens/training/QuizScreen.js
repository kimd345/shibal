import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import colors from '../../config/colors';
import Screen from '../../components/Screen';
import Header from '../../components/Header';
import Text from '../../components/Text';
import Icon from '../../components/Icon';
import QuizChoiceItem from '../../components/trainings/QuizChoiceItem';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../components/Button';

function QuizScreen({ navigation, route }) {
  const quiz = route.params.quiz;
  const choices = route.params.quiz.choices;
  const program = route.params.program;

  const quizEnrollment = useSelector(state => state.enrollments[quiz.id]);

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.infoContainer}>
        <Icon name='question' size={120} backgroundColor='white' iconColor='salmon' />
        <Header style={styles.header}>Daily Question</Header>
        <Text style={styles.prompt}>{quiz.prompt}</Text>
      </View>
      {(quizEnrollment === undefined)
        ? choices.map(choice => (
              <QuizChoiceItem
                key={choices.indexOf(choice).toString()}
                choice={choice}
                quiz={quiz}
                choices={choices}
                program={program}
              />
            ))
        : <>
            <View style={styles.answerWrapper}>
              <Text>{choices[quiz.answer_idx]}</Text>
            </View>
            <View style={styles.explanationView}>
              {quiz.explanation.map(paragraph => {
                return (
                  <Text
                    style={styles.paragraph}
                    key={quiz.explanation.indexOf(paragraph).toString()}
                  >
                    {paragraph}
                  </Text>
                )
              })}
              <Button
                onPress={() => navigation.goBack()}
                title='GOT IT' 
                icon='check' 
                width={135} 
              />
            </View>        
          </>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 30,
    backgroundColor: colors.white,
  },
  infoContainer: {
    alignItems: 'center',
    margin: 20,
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
  answerWrapper: {
    backgroundColor: colors.grass,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  explanationView: {
    backgroundColor: colors.palegrey,
    borderRadius: 10,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  paragraph: {
    fontSize: 14,
    textAlign: 'left',
  },
});

export default QuizScreen;
