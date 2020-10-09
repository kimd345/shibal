import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Image, StyleSheet } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import DogProfileScreen from '../screens/forms/DogProfileScreen';
import NewDogScreen from '../screens/forms/NewDogScreen';
import routes from './routes';

import usersApi from '../api/users';
import dogsApi from '../api/dogs';
import useAuth from '../hooks/useAuth';
import useApi from '../hooks/useApi';
import { actions } from '../redux/ducks';
import ActivityIndicator from '../components/animations/ActivityIndicator';
import colors from '../config/colors';
import { Picker } from '../components/inputs';

const Stack = createStackNavigator();

function HomeNavigator({ navigation }) {
  const [user, setUser] = useState();
  const [dog, setDog] = useState(useSelector((state) => state.dog));
  const [dogExists, setDogExists] = useState();
  const [initialRoute, setInitialRoute] = useState(null);
  console.log(useSelector((state) => state));
  const userId = useAuth().user.id;
  const dispatch = useDispatch();
  const [dogs, setDogs] = useState();
  const putCurrentDogApi = useApi(usersApi.putCurrentDog);

  const getUserApi = useApi(usersApi.getUser);
  const getDogApi = useApi(dogsApi.getDog);

  useEffect(() => {
    (async () => await getUserApi.request(userId))().then((result) => {
      dispatch(actions.setUser(result.data));
      setUser(result.data);
    });
  }, []);

  useEffect(() => {
    if (user) {
      setDogExists(user.currentDogId.length > 0);
      if (dogExists === true) {
        (async () => await getDogApi.request(user.currentDogId[0]))().then(
          (result) => {
            dispatch(actions.setDog(result.data));
            setDog(result.data);
          }
        );
        setDogs(
          user.dogs.map((dogItem) => {
            return { ...dogItem, value: dogItem.id, label: dogItem.name };
          })
        );
        setInitialRoute(routes.HOME);
      } else if (dogExists === false) {
        dispatch(actions.setDog({}));
        setInitialRoute(routes.NEW_DOG);
      }
    }
  }, [user, dogExists]);

  if (initialRoute === null) {
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
