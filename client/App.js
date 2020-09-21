import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';
import OfflineNotice from './src/components/OfflineNotice';
import AuthContext from './src/auth/context';
import authStorage from './src/auth/storage';

export default function App() {
  const [user, setUser] = useState();
  const [sessionLoaded, setSessionLoaded] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  const [fontsLoaded] = useFonts({
    'DogeSans-Regular': require('./src/assets/fonts/DogeSans-Regular.otf'),
    Osake: require('./src/assets/fonts/Osake.otf'),
  });

  if (!sessionLoaded && !fontsLoaded)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setSessionLoaded(true)}
      />
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
