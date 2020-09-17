import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

import AuthNavigator from './app/navigation/AuthNavigator';

import ProgramsScreen from './app/screens/ProgramsScreen';
import SocialScreen from './app/screens/SocialScreen';
import PostCreateScreen from './app/screens/PostCreateScreen';
import SettingsScreen from './app/screens/SettingsScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'DogeSans-Regular': require('./app/assets/fonts/DogeSans-Regular.otf'),
    Osake: require('./app/assets/fonts/Osake.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    // <NavigationContainer>
    //   <AuthNavigator />
    // </NavigationContainer>
    // <ProgramsScreen />
    // <SocialScreen />
    <PostCreateScreen />
    // <SettingsScreen />
  );
}
