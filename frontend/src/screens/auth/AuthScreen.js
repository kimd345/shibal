import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../../config/colors';
import Button from '../../components/Button';
import Text from '../../components/Text';
import routes from '../../navigation/routes';

function AuthScreen({ navigation }) {
  return (
    <View style={styles.background}>
      <View style={styles.oauthContainer}>
        <Text style={styles.topText}>
          Want to learn how to best train your Shiba Inu? Sign up, it's free!
        </Text>
        <Button
          icon='facebook'
          title='Continue with Facebook'
          width={260}
          // onPress={}
          color={'facebook'}
        />
        <Button
          icon='google'
          title='Continue with Google'
          // onPress={}
          width={260}
          color={'google'}
        />
      </View>
      <View style={styles.authContainer}>
        <Button
          title='Sign up with email'
          onPress={() => navigation.navigate(routes.REGISTER)}
          width={260}
          color={'palegrey'}
          textColor={'mossygrey'}
        />
        <Text style={styles.bottomText}>Already have an account?</Text>
        <Text
          onPress={() => navigation.navigate(routes.LOGIN)}
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
    top: '5%',
    alignItems: 'center',
    width: '80%',
  },
  topText: {
    color: colors.secondaryText,
    marginBottom: 20,
  },
  authContainer: {
    position: 'absolute',
    top: '75%',
    alignItems: 'center',
    width: '80%',
  },
  bottomText: {
    color: colors.secondaryText,
    marginVertical: 10,
  },
  login: {
    color: colors.white,
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default AuthScreen;
