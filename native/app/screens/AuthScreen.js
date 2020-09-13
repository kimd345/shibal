import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

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
        <Button title='Login' style={styles.loginText} />
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
    color: colors.primaryText,
    textAlign: 'center',
    marginBottom: 20,
  },
  authContainer: {
    position: 'absolute',
    top: '75%',
    alignItems: 'center',
    width: '80%',
  },
  bottomText: {
    color: colors.primaryText,
    margin: 20,
  },
  loginText: {
    color: colors.white,
  },
});

export default AuthScreen;
