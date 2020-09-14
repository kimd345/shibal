import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import Screen from '../components/Screen';
import ProgramListItem from '../components/ProgramListItem';

const initialPrograms = [
  {
    id: 1,
    title: 'New Dog',
    subTitle: '42 new skills | 4 weeks',
    image: require('../assets/programIcons/newDog.png'),
  },
  {
    id: 2,
    title: 'Little Helper',
    subTitle: '11 new skills | 2 weeks',
    image: require('../assets/programIcons/littleHelper.png'),
  },
  {
    id: 3,
    title: 'Strengthen Your Friendship',
    subTitle: '12 new skills | 2 weeks',
    image: require('../assets/programIcons/strengthenYourFriendship.png'),
  },
  {
    id: 4,
    title: 'Basic Obedience',
    subTitle: '25 new skills | 3 weeks',
    image: require('../assets/programIcons/basicObedience.png'),
  },
  {
    id: 5,
    title: 'Stay Active',
    subTitle: '12 new skills | 2 weeks',
    image: require('../assets/programIcons/stayActive.png'),
  },
];

function ProgramsScreen(props) {
  const [programs, setPrograms] = useState(initialPrograms);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <Screen>
      <FlatList
        data={programs}
        keyExtractor={(program) => program.id.toString()}
        renderItem={({ item }) => (
          <ProgramListItem
            title={item.title}
            subTitle={item.subTitle}
            image={item.image}
            onPress={() => console.log('Program selected', item)}
          />
        )}
        refreshing={refreshing}
        onRefresh={() => {
          setPrograms([
            {
              id: 1,
              title: 'New Dog',
              subTitle: '42 new skills | 4 weeks',
              image: require('../assets/programIcons/newDog.png'),
            },
          ]);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default ProgramsScreen;
