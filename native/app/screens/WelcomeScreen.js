import React from 'react';
import { ImageBackground, StyleSheet, View, Image } from 'react-native';

import colors from '../config/colors';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import AppHeader from '../components/AppHeader';

function WelcomeScreen(props) {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/welcome.png')}
    >
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      <View style={styles.welcomeContainer}>
        <AppHeader style={styles.welcomeHeader}>Welcome to Shibal !</AppHeader>
        <AppText style={styles.welcomeMessage}>
          Train your Shiba Inu daily, and strengthen your friendship
        </AppText>
      </View>
      <View style={styles.loginContainer}>
        <AppButton
          iconName='arrow-right'
          title='GET STARTED'
          /* onPress={} */
          width='55%'
        />
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
  logo: {
    position: 'absolute',
    top: 50,
    width: 50,
    height: 50,
  },
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
  welcomeMessage: {
    color: colors.primaryText,
    textAlign: 'center',
    lineHeight: 27,
  },
  loginContainer: {
    position: 'absolute',
    top: '40%',
    alignItems: 'center',
    width: '100%',
  },
});

export default WelcomeScreen;
