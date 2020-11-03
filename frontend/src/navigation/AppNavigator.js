import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import HomeNavigator from './HomeNavigator';
import TrainingNavigator from './TrainingNavigator';
import SocialNavigator from './SocialNavigator';
import WhistleScreen from '../screens/WhistleScreen';
import SettingsScreen from '../screens/SettingsScreen';
import colors from '../config/colors';


const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: colors.tabButton,
      keyboardHidesTabBar: true,
    }}
  >
    <Tab.Screen
      name='Home'
      component={HomeNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name='home' color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name='Training'
      component={TrainingNavigator}
      options={{
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name='hand-holding-heart' color={color} size={20} />
        ),
      }}
    />
    <Tab.Screen
      name='Social'
      component={SocialNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name='paw' color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name='Whistle'
      component={WhistleScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name='whistle' color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name='Settings'
      component={SettingsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name='settings' color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
