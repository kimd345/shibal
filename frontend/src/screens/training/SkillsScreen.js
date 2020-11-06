import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import colors from '../../config/colors';
import Screen from '../../components/Screen';
import Text from '../../components/Text';

import routes from '../../navigation/routes';
import ProgramIcon from '../../components/trainings/ProgramIcon';

function SkillsScreen({ navigation, route }) {
  const skills = route.params;

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.header}>Training</Text>
          <Text style={styles.description}>Master a familiar trick or learn a new exercise. Repeat the exercise while the timer is running.</Text>
        </View>
        <View style={styles.skillsContainer}>
          {/* <FlatList
            data={skills}
            keyExtractor={(skill) => skill.id.toString()}
            // numColumns={3}
            renderItem={({ item }) => (
              <ProgramIcon
                item={item}
                onPress={() => navigation.navigate(routes.SKILL, item)}
              />
            )}
          /> */}
          {skills.map(skill => {
            return (
              <ProgramIcon
                key={skills.indexOf(skill)}
                item={skill}
                onPress={() => navigation.navigate(routes.SKILL, skill)}
              />
            )
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.grass,
    alignItems: 'center',
    flex: 1,
  },
  container: {
    top: 150,
    width: '90%',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2.5,
  },
  infoContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,
  },
  header: {
    color: colors.mossygrey,
    textAlign: 'left',
  },
  description: {
    color: colors.mossygrey,
    textAlign: 'left',
    fontSize: 12,
    lineHeight: 15,
  },
  skillsContainer: {
    backgroundColor: colors.pastelMintBlue,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
  },
});

export default SkillsScreen;
