import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import TrainingScreen from '../screens/TrainingScreen';
import ProgramScreen from '../screens/training/ProgramScreen';

import colors from '../config/colors';

const Stack = createStackNavigator();

function TrainingNavigator({ navigation }) { 
  return (
	<Stack.Navigator
		screenOptions={{
			headerTintColor: colors.mossygrey,
		}}
	>
	  <Stack.Screen
			name='Training'
			component={TrainingScreen}
	  />
	  <Stack.Screen
			name='Program'
			component={ProgramScreen}
	  />
	</Stack.Navigator>
  );
}

const styles = StyleSheet.create({
});

export default TrainingNavigator;
