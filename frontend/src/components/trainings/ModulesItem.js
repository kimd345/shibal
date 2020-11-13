import React from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../../config/colors';
import { ListItemSeparator } from '../../components/lists';
import Text from '../../components/Text';
import LessonsItem from './LessonsItem';

function ModulesItem({ module, program }) {
  const lessons = module.lessons;

  return (
    <>
      <View style={styles.moduleTextContainer}>
        <ListItemSeparator height={3} />
        <Text style={styles.moduleText}>{module.title}</Text>
        <ListItemSeparator height={3} />
      </View>
      {lessons.map(lesson => {
        return (
          <LessonsItem
            key={lessons.indexOf(lesson).toString()}
            lesson={lesson}
            program={program}
            module={module}
          />
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  moduleTextContainer: {
    backgroundColor: colors.white,
    width: '100%',
  },
  moduleText: {
    fontSize: 20,
    marginHorizontal: 10,
    textAlign: 'left',
  },
});

export default ModulesItem;