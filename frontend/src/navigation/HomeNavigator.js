import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import DogProfileScreen from '../screens/forms/DogProfileScreen';
import NewDogScreen from '../screens/forms/NewDogScreen';
import colors from '../config/colors';
import routes from './routes';

const Stack = createStackNavigator();

function HomeNavigator({ navigation }) {
  // const dogExists = useAuth().user.currentDogId.length > 0;
  // const dogId = dogExists ? useAuth().user.currentDogId[0] : null;

  // const initialRoute = dogExists ? routes.HOME : routes.NEW_DOG;

  const initialRoute = routes.NEW_DOG;
  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <TouchableWithoutFeedback
              style={styles.dogButton}
              onPress={() => navigation.navigate(routes.DOG_PROFILE)}
            />
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
    backgroundColor: colors.black,
  },
});

export default HomeNavigator;
