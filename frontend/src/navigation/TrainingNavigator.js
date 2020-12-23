import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import colors from '../config/colors';
import TrainingScreen from '../screens/TrainingScreen';
import ProgramScreen from '../screens/training/ProgramScreen';
import LessonScreen from '../screens/training/LessonScreen';
import QuizScreen from '../screens/training/QuizScreen';
import SkillsScreen from '../screens/training/SkillsScreen';
import SkillScreen from '../screens/training/SkillScreen';
import ActivitiesScreen from '../screens/training/ActivitiesScreen';


const Stack = createStackNavigator();

function TrainingNavigator({ navigation }) { 
  return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: colors.palegrey },
				headerTintColor: colors.mossygrey,
				headerBackTitle: 'Back',
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
			<Stack.Screen
				name='Quiz'
				component={QuizScreen}
			/>
			<Stack.Screen
				name='Skills'
				component={SkillsScreen}
				options={{
					headerTintColor: colors.white,
					headerStyle: { backgroundColor: colors.grass },
				}}
			/>
			<Stack.Screen
				name='Skill'
				component={SkillScreen}
				options={{
					headerTintColor: colors.white,
					headerStyle: { backgroundColor: colors.grass },
				}}
			/>
			<Stack.Screen
				name='Activity'
				component={ActivitiesScreen}
			/>
		</Stack.Navigator>
  );
}

const styles = StyleSheet.create({
});

export default TrainingNavigator;
