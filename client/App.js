import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';
import OfflineNotice from './src/components/OfflineNotice';

export default function App() {
  const [fontsLoaded] = useFonts({
    'DogeSans-Regular': require('./src/assets/fonts/DogeSans-Regular.otf'),
    Osake: require('./src/assets/fonts/Osake.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <OfflineNotice />
      <NavigationContainer>
        {/* <AuthNavigator /> */}
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}
