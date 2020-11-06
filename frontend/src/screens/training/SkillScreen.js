import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../../config/colors';
import Screen from '../../components/Screen';
import Text from '../../components/Text';
import Button from '../../components/Button';
import SkillSlider from '../../components/trainings/SkillSlider';

import routes from '../../navigation/routes';

function SkillScreen({ navigation, route }) {
  const skill = route.params;
  
  return (
    <Screen style={styles.screen}>
      <SkillSlider steps={skill.steps} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.grass,
    alignItems: 'center',
  },
});

export default SkillScreen;
