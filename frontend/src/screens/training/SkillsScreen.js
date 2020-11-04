import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import colors from '../../config/colors';
import Screen from '../../components/Screen';
import Header from '../../components/Header';
import Text from '../../components/Text';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

import routes from '../../navigation/routes';

function SkillsScreen({ navigation, route }) {
  const skills = route.params;

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>

      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.grass,
    alignItems: 'center',
  },
});

export default SkillsScreen;
