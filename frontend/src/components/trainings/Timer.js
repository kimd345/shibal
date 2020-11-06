import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
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
      <Text style={styles.text}>
        {
          `${new Date(seconds * 1000).toISOString().substr(15, 4)}`
        }
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 50,
  },
});

export default Timer;