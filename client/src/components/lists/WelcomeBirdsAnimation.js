import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

function WelcomeBirdsAnimation(props) {
  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        loop
        source={require('../../assets/animations/birds.json')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    top: -300,
    height: '100%',
    width: '100%',
  },
});

export default WelcomeBirdsAnimation;
