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
        <AppText style={styles.loginText}>Login</AppText>
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
  facebookButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#3b5998',
    borderRadius: 50,
    margin: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1.5,
    elevation: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebookButtonText: {
    color: colors.white,
  },
  googleButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#de5246',
    borderRadius: 50,
    margin: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1.5,
    elevation: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButtonText: {
    color: colors.white,
  },
  authContainer: {
    position: 'absolute',
    top: '75%',
    alignItems: 'center',
    width: '80%',
  },
  signupButton: {
    width: '100%',
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 50,
    margin: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1.5,
    elevation: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupButtonText: {
    color: colors.primaryText,
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
