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
  const [fontsLoaded] = useFonts({
    'DogeSans-Regular': require('./src/assets/fonts/DogeSans-Regular.otf'),
    Osake: require('./src/assets/fonts/Osake.otf'),
  });
  const [user, setUser] = useState();
  const [sessionLoaded, setSessionLoaded] = useState(false);

  if (!fontsLoaded) return <AppLoading />;

  if (!sessionLoaded) {
    const restoreUser = async () => {
      const user = await authStorage.getUser();
      if (user) setUser(user);
    };
    restoreUser().then(setSessionLoaded(true));
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

// const [fontsLoaded] = useFonts({
//   'DogeSans-Regular': require('./src/assets/fonts/DogeSans-Regular.otf'),
//   Osake: require('./src/assets/fonts/Osake.otf'),
// });
// if (!fontsLoaded) return <AppLoading />;

// const [user, setUser] = useState();
// const [sessionLoaded, setSessionLoaded] = useState(false);

// const restoreUser = async () => {
//   const user = await authStorage.getUser();
//   if (user) setUser(user);
// };

// if (!sessionLoaded)
//   return (
//     <AppLoading
//       startAsync={restoreUser}
//       onFinish={() => setSessionLoaded(true)}
//     />
//   );
