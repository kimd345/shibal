import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

import colors from '../../config/colors';
import { ListItemSeparator } from '../../components/lists';
import Text from '../../components/Text';
import LessonsItem from './LessonsItem';

function ModulesItem({ module, program }) {

  return (
    <>
      <View style={styles.moduleTextContainer}>
        <Text style={styles.moduleText}>{module.title}</Text>
      </View>
      <FlatList
        data={module.lessons}
        keyExtractor={(lesson) => lesson.id.toString()}
        ItemSeparatorComponent={() => <ListItemSeparator />}
        renderItem={({ item }) => (
          <LessonsItem lesson={item} program={program} module={module} />
        )}
      />
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
    marginHorizontal: 20,
    textAlign: 'left',
  },
});

export default ModulesItem;