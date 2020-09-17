import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Whistle from '../components/Whistle';

import Screen from '../components/Screen';
import colors from '../config/colors';

function WhistleScreen(props) {
  return (
    <Screen style={styles.screen}>
      <View style={webStyles.view}>
        <Whistle size={200} />
      </View>
    </Screen>
  );
}

const container = {
  backgroundColor: colors.grass,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const styles = StyleSheet.create({
  screen: container,
});

const webStyles =
  Platform.OS === 'web'
    ? StyleSheet.create({
        view: { ...container, flex: 1 },
      })
    : {};

export default WhistleScreen;
