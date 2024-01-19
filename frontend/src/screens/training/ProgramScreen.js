import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import colors from '../../config/colors';
import Header from '../../components/Header';
import Text from '../../components/Text';
import ModulesItem from '../../components/trainings/ModulesItem';

function ProgramScreen({ navigation, route }) {
  const program = route.params;
  const modules = route.params.modules

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.infoContainer}>
        <Header style={styles.header}>{program.title}</Header>
        <Text style={styles.description}>{program.description}</Text>
      </View>
      
      {modules.map(module => {
          return (
            <ModulesItem 
              key={modules.indexOf(module).toString()} 
              module={module} 
              program={program} 
            />
          );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    // alignItems: 'center',
  },
  infoContainer: {
    backgroundColor: colors.palegrey,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  header: {
    fontSize: 26,
    lineHeight: 26,
    marginBottom: 20,
  },
  description: {},
});

export default ProgramScreen;
