import React from 'react';
import { StyleSheet, View } from 'react-native';

import Screen from '../../components/Screen';
import Header from '../../components/Header';
import Text from '../../components/Text';
import colors from '../../config/colors';
import routes from '../../navigation/routes';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

function QuizScreen({ navigation, route }) {
  const quiz = route.params;
  const choices = route.params.choices;

  return (
    <Screen style={styles.screen}>
        <View style={styles.infoContainer}>
          <Icon name='question' size={120} backgroundColor='white' iconColor='#2e332e' />
          <Header style={styles.header}>Daily Question</Header>
          <Text style={styles.prompt}>{quiz.prompt}</Text>
        </View>
        {choices.map(choice => {
          return (
            <Button
              key={choices.indexOf(choice)}
              title={choice}
              height={70}
              width='70%'
            />
          )
        })}
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
});

export default QuizScreen;
