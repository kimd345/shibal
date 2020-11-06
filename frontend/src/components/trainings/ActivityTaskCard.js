import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import colors from '../../config/colors';
import { ListItemSeparator } from '../lists';
import ActivityTaskItem from './ActivityTaskItem';

function ActivityTaskCard({ tasks }) {

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(task) => tasks.indexOf(task).toString()}
        ItemSeparatorComponent={() => <ListItemSeparator />}
        renderItem={({ item }) => (
          <ActivityTaskItem task={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
});

export default ActivityTaskCard;