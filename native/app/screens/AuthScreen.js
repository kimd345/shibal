import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import colors from '../config/colors';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';

function AuthScreen(props) {
  return (
    <View style={styles.background}>
      <View style={styles.oauthContainer}>
        <AppText style={styles.topText}>
          Want to learn how to best train your Shiba Inu? Sign up, it's free!
        </AppText>
        <AppButton
          title='Continue with Facebook'
          // onPress={}
          color={'facebook'}
        />
        <AppButton
          title='Continue with Google'
          // onPress={}
          color={'google'}
        />
      </View>
      <View style={styles.authContainer}>
        <AppButton
          title='Sign up with email'
          // onPress={}
          color={'white'}
          textColor={'black'}
        />
        <AppText style={styles.bottomText}>Already have an account?</AppText>
        <Text
          onPress={() => alert('navigate to login form')}
          style={styles.login}
        >
          Login
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.primaryBackground,
    flex: 1,
    alignItems: 'center',
  },
  oauthContainer: {
    position: 'absolute',
    top: '15%',
    alignItems: 'center',
    width: '80%',
  },
  topText: {
    marginBottom: 20,
  },
  authContainer: {
    position: 'absolute',
    top: '75%',
    alignItems: 'center',
    width: '80%',
  },
  bottomText: {
    margin: 20,
  },
  login: {
    color: colors.white,
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default AuthScreen;
