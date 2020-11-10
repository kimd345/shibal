import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import Screen from '../../components/Screen';
import Header from '../../components/Header';
import Text from '../../components/Text';
import { ListItemSeparator } from '../../components/lists';
import ModulesItem from '../../components/trainings/ModulesItem';

function ProgramScreen({ navigation, route }) {
  const program = route.params;

  return (
    <Screen style={styles.screen}>
      <View style={styles.infoContainer}>
        <Header style={styles.header}>{program.title}</Header>
        <Text style={styles.description}>{program.description}</Text>
      </View>
      
      <FlatList
        data={program.modules}
        keyExtractor={(module) => module.id.toString()}
        ItemSeparatorComponent={() => <ListItemSeparator />}
        renderItem={({ item }) => (
          <ModulesItem module={item} program={program} />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
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
  description: {
    lineHeight: 28,
  },
});

export default ProgramScreen;
