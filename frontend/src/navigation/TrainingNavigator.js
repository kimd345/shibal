import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import colors from '../config/colors';
import TrainingScreen from '../screens/TrainingScreen';
import ProgramScreen from '../screens/training/ProgramScreen';
import LessonScreen from '../screens/training/LessonScreen';


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
	  <Stack.Screen
			name='Lesson'
			component={LessonScreen}
	  />
	</Stack.Navigator>
  );
}

const styles = StyleSheet.create({
});

export default TrainingNavigator;
