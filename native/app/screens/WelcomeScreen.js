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
          <Text style={styles.getStartedText}>GET STARTED</Text>
        </View>
        <View style={styles.loginButton}>
          <Text style={styles.loginText}>LOGIN</Text>
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
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  getStartedText: {},
  loginText: {
    color: 'white',
  },
  welcomeContainer: {
    position: 'absolute',
    top: '20%',
    alignItems: 'center',
    width: '100%',
  },
  welcomeHeader: {
    color: 'white',
  },
  welcomeMessage: {
    width: '80%',
    color: 'maroon',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
