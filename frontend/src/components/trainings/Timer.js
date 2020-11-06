import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AppButton from '../Button';
import Text from '../Text';

function Timer({ duration }) {
  const [seconds, setSeconds] = useState(duration);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (seconds > 0) setSeconds(seconds - 1);
    }, 1000)
    return () => clearTimeout(timer);
  });

  return (
    <View style={styles.container}>
      {seconds > 0
        ? <Text style={styles.text}>
            {`${new Date(seconds * 1000).toISOString().substr(15, 4)}`}
          </Text>
        : <AppButton title='Finish' onPress={() => alert('Timer.js')} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 50,
    width: 100,
  },
});

export default Timer;