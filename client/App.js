import React, { useEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';
import OfflineNotice from './src/components/OfflineNotice';
import AuthContext from './src/auth/context';
import authStorage from './src/auth/storage';
import store from './src/redux/store';
import { actions } from './src/redux/ducks';

export default function App() {
  const [fontsLoaded] = useFonts({
    'DogeSans-Regular': require('./src/assets/fonts/DogeSans-Regular.otf'),
    Osake: require('./src/assets/fonts/Osake.otf'),
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

function AppContent() {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState();

  // put redux logic in home screen later
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.setUser(user));
  }, [dispatch, user]);

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
