import React from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native';

import colors from '../config/colors';
import AppButton from '../components/AppButton';

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
        <AppButton title='GET STARTED' /* onPress={} */ width='60%' />
        <AppButton
          title='LOGIN'
          /* onPress={} */
          color='primaryBackground'
          width='40%'
          height={40}
          borderWidth={1}
          borderColor='rosybrown'
        />
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
    paddingBottom: 10,
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  welcomeMessage: {
    color: colors.primaryText,
    textAlign: 'center',
    lineHeight: 30,
  },
  loginContainer: {
    position: 'absolute',
    top: '40%',
    alignItems: 'center',
    width: '100%',
  },
});

export default WelcomeScreen;
