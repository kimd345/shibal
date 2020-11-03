import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import Screen from '../components/Screen';
import ProgramCard from '../components/programs/ProgramCard';
import colors from '../config/colors';
import routes from '../navigation/routes';

const programs = [
  {
    id: 1,
    title: 'New Dog',
    subTitle: '42 new skills | 4 weeks',
    image: require('../assets/programIcons/newDog.png'),
    backgroundColor: 'newDog',
  },
  {
    id: 2,
    title: 'Little Helper',
    subTitle: '11 new skills | 2 weeks',
    image: require('../assets/programIcons/littleHelper.png'),
    backgroundColor: 'littleHelper',
  },
  {
    id: 3,
    title: 'Strengthen Your Friendship',
    subTitle: '12 new skills | 2 weeks',
    image: require('../assets/programIcons/strengthenYourFriendship.png'),
    backgroundColor: 'strengthenYourFriendship',
  },
  {
    id: 4,
    title: 'Basic Obedience',
    subTitle: '25 new skills | 3 weeks',
    image: require('../assets/programIcons/basicObedience.png'),
    backgroundColor: 'basicObedience',
  },
  {
    id: 5,
    title: 'Stay Active',
    subTitle: '12 new skills | 2 weeks',
    image: require('../assets/programIcons/stayActive.png'),
    backgroundColor: 'stayActive',
  },
];

function TrainingScreen({ navigation }) {

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={programs}
        keyExtractor={(program) => program.id.toString()}
        renderItem={({ item }) => (
          <ProgramCard
            title={item.title}
            subTitle={item.subTitle}
            image={item.image}
            onPress={() => navigation.navigate(routes.PROGRAM)}
            backgroundColor={item.backgroundColor}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.palegrey,
  },
});

export default TrainingScreen;
