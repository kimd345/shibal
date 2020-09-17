import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import AuthScreen from '../screens/AuthScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import colors from '../config/colors';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.primaryBackground },
      headerTintColor: colors.white,
      headerBackTitle: 'Back',
    }}
  >
    <Stack.Screen
      name='Welcome'
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name='Auth'
      component={AuthScreen}
      options={{ title: 'Login' }}
    />
    <Stack.Screen name='Login' component={LoginScreen} />
    <Stack.Screen
      name='Register'
      component={RegisterScreen}
      options={{ title: 'Sign Up' }}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
