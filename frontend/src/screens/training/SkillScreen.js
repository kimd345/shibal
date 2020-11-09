import React from 'react';
import { StyleSheet } from 'react-native';

import colors from '../../config/colors';
import Screen from '../../components/Screen';
import SkillSlider from '../../components/trainings/SkillSlider';

import routes from '../../navigation/routes';

function SkillScreen({ navigation, route }) {
  const skill = route.params;
  
  return (
    <Screen style={styles.screen}>
      <SkillSlider steps={skill.steps} duration={skill.duration} entityId={skill.id} />
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
