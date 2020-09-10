import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen';
import SignupScreen from './app/screens/SignupScreen';

export default function App() {
  // return <WelcomeScreen />;
  return <SignupScreen />;
}
