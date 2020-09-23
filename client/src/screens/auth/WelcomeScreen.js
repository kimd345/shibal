import React from 'react';
import { ImageBackground, StyleSheet, View, Image } from 'react-native';

import colors from '../../config/colors';
import Button from '../../components/Button';
import Text from '../../components/Text';
import Header from '../../components/Header';
import routes from '../../navigation/routes';
import WelcomeBirdsAnimation from '../../components/lists/WelcomeBirdsAnimation';

function WelcomeScreen({ navigation }) {
  return (
    <>
      {/* <WelcomeBirdsAnimation /> */}
      <ImageBackground
        style={styles.background}
        source={require('../../assets/welcome.png')}
      >
        <Image style={styles.logo} source={require('../../assets/logo.png')} />
        <View style={styles.welcomeContainer}>
          <Header style={styles.welcomeHeader}>Welcome to Shibal</Header>
          <Text style={styles.welcomeMessage}>
            Train your Shiba Inu daily, and strengthen your friendship
          </Text>
        </View>
        <View style={styles.loginContainer}>
          <Button
            iconName='arrow-right'
            title='GET STARTED'
            /* onPress={} */
            width='55%'
          />
          <Button
            title='LOGIN'
            onPress={() => navigation.navigate(routes.AUTH)}
            color='welcomeLogin'
            width='40%'
            height={40}
          />
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginTop: 50,
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
  welcomeHeader: {
    fontSize: 22,
    marginBottom: 10,
  },
  welcomeMessage: {
    color: colors.secondaryText,
  },
  loginContainer: {
    position: 'absolute',
    top: '40%',
    alignItems: 'center',
    width: '100%',
  },
  getStartedButton: {},
});

export default WelcomeScreen;
