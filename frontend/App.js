import { useCallback, useState } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';
import OfflineNotice from './src/components/OfflineNotice';
import AuthContext from './src/auth/context';
import authStorage from './src/auth/storage';
import store from './src/redux/store';

import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';

Amplify.configure(amplifyconfig);
SplashScreen.preventAutoHideAsync();

export default function App() {
	const [fontsLoaded, fontError] = useFonts({
		'DogeSans-Regular': require('./src/assets/fonts/DogeSans-Regular.otf'),
		Osake: require('./src/assets/fonts/Osake.otf'),
	});
	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	const [isReady, setIsReady] = useState(false);
	const [user, setUser] = useState();

	if (!fontsLoaded || fontError) return null;

	if (!isReady) {
		const restoreUser = async () => {
			const user = await authStorage.getUser();
			if (user) setUser(user);
		};
		restoreUser().then(setIsReady(true));
	}

	return (
		<View
			style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
			onLayout={onLayoutRootView}
		>
      {/* TODO: configure status bar according to theme */}
      <StatusBar style='auto' />
      <Text>Open up App.js to start working on your app!</Text>
			<AuthContext.Provider value={{ user, setUser }}>
				<Provider store={store}>
					<OfflineNotice />
					<NavigationContainer>
						{user ? <AppNavigator /> : <AuthNavigator />}
					</NavigationContainer>
				</Provider>
			</AuthContext.Provider>
		</View>
	);
}
