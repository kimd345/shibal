import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Image, StyleSheet } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import DogProfileScreen from '../screens/home/DogProfileScreen';
import NewDogScreen from '../screens/home/NewDogScreen';

import ActivityIndicator from '../components/animations/ActivityIndicator';
import { Picker } from '../components/inputs';

import colors from '../config/colors';
import routes from './routes';

import useAuth from '../hooks/useAuth';
import useApi from '../hooks/useApi';

import usersApi from '../api/users';
import dogsApi from '../api/dogs';
import trainingsApi from '../api/trainings';
import { actions } from '../redux/ducks';

const Stack = createStackNavigator();

function HomeNavigator({ navigation }) {
  const user = useSelector(state => state.user);
  const dog = useSelector(state => state.dog);
  const dogs = useSelector(state => state.dogs);
  const [dogExists, setDogExists] = useState(null);
  const [initialRoute, setInitialRoute] = useState(null);

  const getUserApi = useApi(usersApi.getUser);
  const getDogApi = useApi(dogsApi.getDog);
  const getDogsApi = useApi(dogsApi.getDogs);
  const putCurrentDogApi = useApi(usersApi.putCurrentDog);
  const getEnrollmentsApi = useApi(trainingsApi.getEnrollments);

  const dispatch = useDispatch();
  const userId = useAuth().user.id;

  console.log('STORE - HOME NAVIGATOR: ', useSelector((state) => state.enrollments));
  
  useEffect(() => { // set user on mount
    (async () => await getUserApi.request(userId))().then((result) => {
      dispatch(actions.setUser(result.data));
    });
  }, []);

  useEffect(() => { // set dogExists on user change
    if (Object.keys(user).length > 0) {
      setDogExists(user.currentDogId.length === 1);
    }
  }, [user]);

  useEffect(() => { // set dog, dogs and initial route on dogExists change
    if (dogExists === true) {
      (async () => await getDogApi.request(user.currentDogId))()
        .then(result => dispatch(actions.setDog(result.data)));
      (async () => await getDogsApi.request(user.id))()
        .then(result => dispatch(actions.setDogs(result.data.dogs)));
      setInitialRoute(routes.HOME);
    } else if (dogExists === false) {
      dispatch(actions.setDog({}));
      setInitialRoute(routes.NEW_DOG);
    }
  }, [dogExists]);

  useEffect(() => { // set enrollments on dog change
    (async () => await getEnrollmentsApi.request(dog.id))()
      .then(result => {
        dispatch(actions.setEnrollments(result.data.enrollments))
      });
  }, [dog]);

  if (initialRoute === null || getUserApi.loading || getDogApi.loading || getDogsApi.loading ) {
    return <ActivityIndicator visible={true} backgroundColor='palegrey' />;
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate(routes.DOG_PROFILE)}
            >
              <Image
                style={styles.dogButton}
                source={{ uri: dog.profileImageUrl }}
              />
            </TouchableWithoutFeedback>
          ),
          headerTitle: () => (
            <Picker
              width={150}
              items={dogs}
              placeholder='Your Inu'
              style={{ 
                alignItems: 'center',
                backgroundColor: colors.white,
                borderColor: colors.leafygrey,
                borderWidth: 1,
                padding: 2, 
                height: 30, 
              }}
              selectedItem={dog}
              onSelectItem={(item) => {
                dogs.forEach(async (dog) => {
                  if (dog.id === item.value) {
                    await putCurrentDogApi.request(user.id, dog.id);
                    dispatch(actions.setCurrentDogId(dog.id));
                    dispatch(actions.setDog(dog));
                  }
                });
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name='DogProfile'
        component={DogProfileScreen}
        options={{
          headerTitle: 'Your Inu',
          headerStyle: { backgroundColor: colors.primaryBackground },
          headerTintColor: colors.white,
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name='NewDog'
        component={NewDogScreen}
        options={{
          headerTitle: 'New Inu',
          headerStyle: { backgroundColor: colors.primaryBackground },
          headerTintColor: colors.white,
          headerLeft: null,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  dogButton: {
    width: 40,
    height: 40,
    margin: 10,
    borderRadius: 50,
    backgroundColor: colors.palegrey,
  },
});

export default HomeNavigator;
