import React from 'react';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

import WelcomeScreen from './app/screens/WelcomeScreen';
import AuthScreen from './app/screens/AuthScreen';
import ProgramsScreen from './app/screens/ProgramsScreen';
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
    <WelcomeScreen />
    // <AuthScreen />
    // <ProgramsScreen />
    // <SettingsScreen />
  );
}
