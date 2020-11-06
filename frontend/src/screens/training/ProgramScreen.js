import React from 'react';
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
        <Text style={styles.description}>{program.description}</Text>
      </View>
      
      <FlatList
        data={program.modules}
        keyExtractor={(module) => module.id.toString()}
        ItemSeparatorComponent={() => <ListItemSeparator />}
        renderItem={({ item }) => (
          <>
            <View style={styles.moduleTextContainer}>
              <Text style={styles.moduleText}>{item.title}</Text>
            </View>
            <FlatList
              style={styles.flatList}
              data={item.lessons}
              keyExtractor={(lesson) => lesson.id.toString()}
              ItemSeparatorComponent={() => <ListItemSeparator />}
              renderItem={({ item }) => (
                <>
                  <ListItem
                    title={item.title}
                    onPress={() => navigation.navigate(routes.LESSON, { programTitle: program.title, lesson: item })}
                  />
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
  moduleTextContainer: {
    backgroundColor: colors.white,
    width: '100%',
  },
  moduleText: {
    fontSize: 20,
    marginHorizontal: 20,
    textAlign: 'left',
  }
});

export default ProgramScreen;
