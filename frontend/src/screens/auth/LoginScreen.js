import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import ActivityIndicator from '../../components/animations/ActivityIndicator';
import Screen from '../../components/Screen';
import Text from '../../components/Text';
import {
	ErrorMessage,
	Form,
	FormField,
	SubmitButton,
} from '../../components/forms';

import useApi from '../../hooks/useApi';
import useAuth from '../../hooks/useAuth';

import authApi from '../../api/auth';

import colors from '../../config/colors';

const validationSchema = Yup.object().shape({
	email: Yup.string().required().email().label('Email'),
	password: Yup.string().required().min(4).label('Password'),
});

function LoginScreen() {
	const loginApi = useApi(authApi.login);
	const auth = useAuth();
	const [error, setError] = useState();

	const handleSubmit = async ({ email, password }) => {
		const result = await loginApi.request(email, password);

		if (!result.ok) {
			if (result.data) setError(result.data.msg);
			else {
				setError('An unexpected error occurred');
			}
			return;
		}
		auth.logIn(result.data);
	};

	return (
		<>
			<ActivityIndicator
				visible={loginApi.loading}
				backgroundColor='primaryBackground'
			/>
			<Screen style={styles.screen}>
				<Text style={styles.text}>Log in to your account</Text>
				<Form
					initialValues={{ email: '', password: '' }}
					onSubmit={handleSubmit}
					validationSchema={validationSchema}
				>
					<ErrorMessage error={error} visible={error} />
					<FormField
						autoCapitalize='none'
						autoCorrect={false}
						icon='email'
						keyboardType='email-address'
						name='email'
						placeholder='Enter your email'
						textContentType='emailAddress'
					/>
					<FormField
						autoCapitalize='none'
						autoCorrect={false}
						icon='lock'
						name='password'
						placeholder='Please enter your password'
						secureTextEntry
						textContentType='password'
					/>
					<SubmitButton title='Login' />
				</Form>
			</Screen>
		</>
	);
}

const styles = StyleSheet.create({
	screen: {
		backgroundColor: colors.primaryBackground,
		padding: 10,
	},
	text: {
		color: colors.secondaryText,
		fontSize: 24,
		marginVertical: 20,
		letterSpacing: 0.5,
	},
});

export default LoginScreen;
