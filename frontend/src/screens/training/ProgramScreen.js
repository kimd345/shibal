import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import Screen from '../../components/Screen';
import Header from '../../components/Header';
import Text from '../../components/Text';
import colors from '../../config/colors';
import routes from '../../navigation/routes';
import { ListItem, ListItemSeparator } from '../../components/lists';

function ProgramScreen({ navigation, route }) {
  const program = route.params;

  return (
    <Screen style={styles.screen}>
      <View style={styles.infoContainer}>
        <Header style={styles.header}>{program.title}</Header>
        <Text>{program.description}</Text>
      </View>
      
      <FlatList
        data={program.modules}
        keyExtractor={(module) => module.id.toString()}
        renderItem={({ item }) => (
          <>
            <Text style={styles.moduleText}>{item.title}</Text>
            <FlatList 
              data={item.lessons}
              keyExtractor={(lesson) => lesson.id.toString()}
              renderItem={({ item }) => (
                <>
                  <ListItem
                    title={item.title}
                  />
                  <ListItemSeparator />
                </>
              )}
            />
          </>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  infoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  header: {
    fontSize: 26,
    lineHeight: 26,
    marginBottom: 20,
  },
  moduleText: {
    fontSize: 20,
    marginHorizontal: 20,
    textAlign: 'left',
  }
});

export default ProgramScreen;
