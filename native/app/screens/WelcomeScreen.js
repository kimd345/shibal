import React from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native';

function WelcomeScreen(props) {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/welcome.png')}
    >
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeHeader}>Welcome to Shibal!</Text>
        <Text style={styles.welcomeMessage}>
          Train your Shiba Inu daily, and strengthen your friendship
        </Text>
      </View>
      <View style={styles.loginContainer}>
        <View style={styles.getStartedButton}>
          <Text style={styles.getStartedButtonText}>GET STARTED</Text>
        </View>
        <View style={styles.loginButton}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
  },
  welcomeContainer: {
    position: 'absolute',
    top: '20%',
    alignItems: 'center',
    width: '80%',
  },
  welcomeHeader: {
    color: 'white',
  },
  welcomeMessage: {
    color: 'maroon',
    textAlign: 'center',
  },
  loginContainer: {
    position: 'absolute',
    top: '40%',
    alignItems: 'center',
    width: '100%',
  },
  getStartedButton: {
    width: '50%',
    height: 50,
    backgroundColor: '#ff9999',
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
  getStartedButtonText: {},
  loginButton: {
    width: '40%',
    height: 40,
    backgroundColor: '#ff999900',
    borderWidth: 1,
    borderColor: 'rosybrown',
    borderRadius: 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
  },
});

export default WelcomeScreen;
