import React from 'react';
import { StyleSheet } from 'react-native';

import colors from '../../config/colors';
import Screen from '../../components/Screen';
import SkillSlider from '../../components/trainings/SkillSlider';

import routes from '../../navigation/routes';

function SkillScreen({ navigation, route }) {
  const skill = route.params.skill;
  const program = route.params.program;
  
  return (
    <Screen style={styles.screen}>
      <SkillSlider steps={skill.steps} duration={skill.duration} entityId={skill.id} program={program} />
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
