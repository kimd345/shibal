import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import colors from '../../config/colors';
import Screen from '../../components/Screen';
import Header from '../../components/Header';
import Text from '../../components/Text';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

import routes from '../../navigation/routes';

function QuizScreen({ navigation, route }) {
  const quiz = route.params;
  const choices = route.params.choices;

  return (
    <Screen style={styles.screen}>
        <View style={styles.infoContainer}>
          <Icon name='question' size={120} backgroundColor='white' iconColor='salmon' />
          <Header style={styles.header}>Daily Question</Header>
          <Text style={styles.prompt}>{quiz.prompt}</Text>
        </View>
        <FlatList
          data={choices}
          keyExtractor={(choice) => choices.indexOf(choice).toString()}
          renderItem={({ item }) => (
            <Button
              title={item}
              height={70}
              width='80%'
              color='white'
              textColor='mossygrey'
            />
          )}
        />
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
