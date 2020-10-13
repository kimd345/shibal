import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { View, StyleSheet } from 'react-native';

import SocialScreen from '../screens/SocialScreen';

import colors from '../config/colors';
import Icon from '../components/Icon';

const Stack = createStackNavigator();

function SocialNavigator({ navigation }) { 
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Social'
        component={SocialScreen}
        options={{
          headerRight: () => (
            <View>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate(routes.DOG_PROFILE)}
                >
                <Icon name='clone' iconColor={colors.mossygrey} backgroundColor={colors.transparent} />
              </TouchableWithoutFeedback>
            </View>
          ),
        }}
      />
      {/* <Stack.Screen
        name='DogProfile'
        component={DogProfileScreen}
        options={{
          headerTitle: 'Your Inu',
          headerStyle: { backgroundColor: colors.primaryBackground },
          headerTintColor: colors.white,
          headerBackTitle: 'Back',
        }}
      /> */}
      {/* <Stack.Screen
        name='NewDog'
        component={NewDogScreen}
        options={{
          headerTitle: 'New Inu',
          headerStyle: { backgroundColor: colors.primaryBackground },
          headerTintColor: colors.white,
          headerBackTitle: 'Back',
          headerLeft: null,
        }}
      /> */}
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

export default SocialNavigator;
