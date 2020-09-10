import React from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native';

function SignupScreen(props) {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/background.png')}
    >
      <View style={styles.oauthContainer}>
        <Text style={styles.topText}>
          Want to learn how to best train your Shiba Inu? Sign up, it's free!
        </Text>
        <View style={styles.facebookButton}>
          <Text style={styles.facebookButtonText}>Continue with Facebook</Text>
        </View>
        <View style={styles.googleButton}>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </View>
      </View>
      <View style={styles.authContainer}>
        <View style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Sign up with email</Text>
        </View>
        <Text style={styles.bottomText}>Already have an account?</Text>
        <Text style={styles.loginText}>Login</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
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
    color: 'maroon',
    textAlign: 'center',
    marginBottom: 20,
  },
  facebookButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#3b5998',
    borderRadius: 50,
    margin: 10,
    shadowColor: '#000',
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
    color: 'white',
  },
  googleButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#de5246',
    borderRadius: 50,
    margin: 10,
    shadowColor: '#000',
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
    color: 'white',
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
    backgroundColor: 'white',
    borderRadius: 50,
    margin: 10,
    shadowColor: '#000',
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
    color: 'maroon',
  },
  bottomText: {
    color: 'maroon',
    margin: 20,
  },
  loginText: {
    color: 'white',
  },
});

export default SignupScreen;
