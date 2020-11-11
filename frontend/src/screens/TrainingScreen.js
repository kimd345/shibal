import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ActivityIndicator from '../components/animations/ActivityIndicator';
import ProgramCard from '../components/trainings/ProgramCard';

import routes from '../navigation/routes';

import useApi from '../hooks/useApi';

import trainingsApi from '../api/trainings';
import { actions } from '../redux/ducks';

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
  const createProgramEnrollmentApi = useApi(trainingsApi.createEnrollment);

  const dispatch = useDispatch();
  const dogId = useSelector(state => state.dog.id);
  const enrollments = useSelector(state => state.enrollments);

  useEffect(() => {
    (async () => await getTrainingsApi.request())()
      .then((result) => setTrainings(result.data));
  }, []);

  return (
    <>
      <ActivityIndicator
        visible={getTrainingsApi.loading}
        backgroundColor='white'
      />
      {trainings 
        && <FlatList
            data={programs}
            keyExtractor={(program) => program.id.toString()}
            renderItem={({ item }) => (
              <ProgramCard
                program={trainings.programs[item.id - 1]}
                entityId={item.id}
                title={item.title}
                subTitle={item.subTitle}
                image={item.image}
                onPress={item.id === 1
                          ? async () => {
                              (enrollments[item.id] === undefined)
                              && (await createProgramEnrollmentApi.request(item.id, dogId, 'Program', 'In Progress')
                                  .then(result => dispatch(actions.addEnrollment(result.data))));
                              navigation.navigate(routes.PROGRAM, trainings.programs[item.id-1]);
                            } 
                          : () => alert('Coming Soon!')}
                backgroundColor={item.backgroundColor}
              />
            )}
          />}
    </>
  );
}

export default TrainingScreen;
