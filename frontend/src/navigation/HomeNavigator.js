import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Image, StyleSheet } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import DogProfileScreen from '../screens/forms/DogProfileScreen';
import NewDogScreen from '../screens/forms/NewDogScreen';
import routes from './routes';

import dogsApi from '../api/dogs';
import useAuth from '../hooks/useAuth'; // remove
import useApi from '../hooks/useApi';
import { actions } from '../redux/ducks';

const Stack = createStackNavigator();

function HomeNavigator({ navigation }) {
  // update with useSelector from newDogScreen
  const user = useAuth().user;
  console.log('USER: ', user);
  const dogExists = user.currentDogId.length > 0;
  const dogId = dogExists ? user.currentDogId[0] : null;
  const initialRoute = dogExists ? routes.HOME : routes.NEW_DOG;

  const getDogApi = useApi(dogsApi.getDog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setUser(user));
    if (dogExists)
      (async () => await getDogApi.request(dogId))().then((result) =>
        dispatch(actions.setDog(result.data))
      );
  }, [dispatch, dogExists]);

  console.log(useSelector((state) => state));
  const dog = useSelector((state) => state.dog);

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
                source={
                  dogExists
                    ? { uri: dog.profileImageUrl }
                    : require('../assets/defaultIcons/shiba_default.png')
                }
              />
            </TouchableWithoutFeedback>
          ),
        }}
      />
      <Stack.Screen
        name='DogProfile'
        component={DogProfileScreen}
        options={{ headerTitle: 'Your Inu' }}
      />
      <Stack.Screen
        name='NewDog'
        component={NewDogScreen}
        options={{ headerShown: false /* headerTitle: 'Your Inu' */ }}
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
    // backgroundColor: colors.black,
  },
});

export default HomeNavigator;
