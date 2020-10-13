import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { View, StyleSheet } from 'react-native';

import SocialScreen from '../screens/SocialScreen';
import NewPostScreen from '../screens/social/NewPostScreen';

import Icon from '../components/Icon';

import colors from '../config/colors';

import routes from './routes';


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
          headerTintColor: colors.mossygrey,
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
      <Stack.Screen
        name='NewPost'
        component={NewPostScreen}
        options={{
          headerTitle: 'New Post',
          headerStyle: { backgroundColor: colors.leafygrey },
          headerTintColor: colors.mossygrey,
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

export default SocialNavigator;
