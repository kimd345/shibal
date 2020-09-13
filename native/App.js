// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

import WelcomeScreen from './app/screens/WelcomeScreen';
import AuthScreen from './app/screens/AuthScreen';

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
  );
}
