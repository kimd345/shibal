import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';

import WelcomeScreen from './app/screens/WelcomeScreen';
import AuthScreen from './app/screens/AuthScreen';

export default function App() {
  return (
    // <WelcomeScreen />
    <AuthScreen />
  );
}
