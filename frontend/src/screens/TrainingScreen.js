import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ActivityIndicator from '../components/animations/ActivityIndicator';
import Screen from '../components/Screen';
import ProgramCard from '../components/programs/ProgramCard';
import colors from '../config/colors';

import useApi from '../hooks/useApi';

import trainingsApi from '../api/trainings';
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
  const [trainings, setTrainings] = useState();

  const getTrainingsApi = useApi(trainingsApi.getTrainings);

  useEffect(() => {
    (async () => await getTrainingsApi.request())().then((result) => {
      setTrainings(result.data);
    });
  }, []);

  // console.log('TRAINING SCREEN: ', trainings);

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
            onPress={() => navigation.navigate(routes.PROGRAM, trainings.programs[item.id-1])}
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
