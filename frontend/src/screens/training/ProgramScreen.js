import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import Screen from '../../components/Screen';
import colors from '../../config/colors';
import routes from '../../navigation/routes';

function ProgramScreen({ navigation }) {

  return (
    <Screen style={styles.screen}>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.palegrey,
  },
});

export default ProgramScreen;
