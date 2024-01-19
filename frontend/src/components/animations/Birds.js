import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

function Birds() {
  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        loop
        style={styles.lottieView}
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
  lottieView: {
    flex: 1,
  },
});

export default Birds;
