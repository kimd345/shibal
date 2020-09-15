import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../config/colors';
import Button from '../components/Button';
import Text from '../components/Text';

function AuthScreen(props) {
  return (
    <View style={styles.background}>
      <View style={styles.oauthContainer}>
        <Text style={styles.topText}>
          Want to learn how to best train your Shiba Inu? Sign up, it's free!
        </Text>
        <Button
          iconName='facebook'
          title='Continue with Facebook'
          // onPress={}
          color={'facebook'}
        />
        <Button
          iconName='google'
          title='Continue with Google'
          // onPress={}
          color={'google'}
        />
      </View>
      <View style={styles.authContainer}>
        <Button
          title='Sign up with email'
          // onPress={}
          color={'white'}
          textColor={'darkgrey'}
        />
        <Text style={styles.bottomText}>Already have an account?</Text>
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
    marginVertical: 20,
  },
  login: {
    color: colors.white,
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default AuthScreen;
