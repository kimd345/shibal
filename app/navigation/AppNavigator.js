import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import TrainingScreen from '../screens/TrainingScreen';
import SocialScreen from '../screens/SocialScreen';
import WhistleScreen from '../screens/WhistleScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator>
    {/* <Tab.Screen name='Home' component={HomeScreen} /> */}
    {/* <Tab.Screen name='Training' component={TrainingScreen} /> */}
    {/* <Tab.Screen name='Social' component={SocialScreen} /> */}
    <Tab.Screen name='Whistle' component={WhistleScreen} />
    {/* <Tab.Screen name='Settings' component={SettingsScreen} /> */}
  </Tab.Navigator>
);

export default AppNavigator;
