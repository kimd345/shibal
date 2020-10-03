import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';
import OfflineNotice from './src/components/OfflineNotice';
import AuthContext from './src/auth/context';
import authStorage from './src/auth/storage';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

export default function App() {
  const [fontsLoaded] = useFonts({
    'DogeSans-Regular': require('./src/assets/fonts/DogeSans-Regular.otf'),
    Osake: require('./src/assets/fonts/Osake.otf'),
  });
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState();

  if (!fontsLoaded) return <AppLoading />;

  if (!isReady) {
    const restoreUser = async () => {
      const user = await authStorage.getUser();
      if (user) setUser(user);
    };
    restoreUser().then(setIsReady(true));
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
