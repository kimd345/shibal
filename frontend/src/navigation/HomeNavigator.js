import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Image, StyleSheet } from 'react-native';

import ActivityIndicator from '../components/animations/ActivityIndicator';
import DogProfileScreen from '../screens/forms/DogProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import NewDogScreen from '../screens/forms/NewDogScreen';
import { Picker } from '../components/inputs';
import colors from '../config/colors';

import useAuth from '../hooks/useAuth';
import useApi from '../hooks/useApi';

import usersApi from '../api/users';
import dogsApi from '../api/dogs';
import routes from './routes';
import { actions } from '../redux/ducks';

const Stack = createStackNavigator();

function HomeNavigator({ navigation }) {
  const [user, setUser] = useState();
  const [dogExists, setDogExists] = useState();
  const [dog, setDog] = useState(useSelector((state) => state.dog));
  const [dogs, setDogs] = useState(useSelector((state) => state.dogs));
  const [initialRoute, setInitialRoute] = useState(null);

  const getUserApi = useApi(usersApi.getUser);
  const getDogApi = useApi(dogsApi.getDog);
  const getDogsApi = useApi(dogsApi.getDogs);
  const putCurrentDogApi = useApi(usersApi.putCurrentDog);

  const dispatch = useDispatch();
  const userId = useAuth().user.id;

  console.log(useSelector((state) => state));
  
  useEffect(() => {
    (async () => await getUserApi.request(userId))().then((result) => {
      dispatch(actions.setUser(result.data));
      setUser(result.data);
    });
  }, []);

  useEffect(() => {
    if (user) {
      setDogExists(user.currentDogId !== null);
      if (dogExists === true) {
        (async () => await getDogApi.request(user.currentDogId))().then(
          (result) => {
            dispatch(actions.setDog(result.data));
            setDog(result.data);
          }
        );
        (async () => await getDogsApi.request(user.id))().then(
          (result) => {
            console.log('RESULT: ', result.data.dogs);
            dispatch(actions.setDogs(result.data.dogs));
            setDogs(result.data.dogs.map((dogItem) => {
              return { ...dogItem, value: dogItem.id, label: dogItem.name };
            }));
          }
        );
        setInitialRoute(routes.HOME);
      } else if (dogExists === false) {
        dispatch(actions.setDog({}));
        setInitialRoute(routes.NEW_DOG);
      }
    }
  }, [user, dogExists]);

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
              placeholder='hello'
              selectedItem={dog.name}
              onSelectItem={(item) => {
                dogs.forEach(async (dog) => {
                  if (dog.id === item.value) {
                    dispatch(actions.setDog(dog));
                    setDog(dog);
                    await putCurrentDogApi.request(user.id, dog.id);
                    dispatch(actions.setCurrentDogId(dog.id));
                  }
                });
                console.log(`${item.label}`);
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
          headerBackTitle: 'Back',
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
