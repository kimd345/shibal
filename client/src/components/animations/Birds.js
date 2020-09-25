import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

function Birds(props) {
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
    bottom: 300,
    height: '100%',
    width: '100%',
  },
});

export default Birds;
