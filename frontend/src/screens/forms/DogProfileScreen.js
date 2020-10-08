import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import Screen from '../../components/Screen';
import Text from '../../components/Text';
import colors from '../../config/colors';
import routes from '../../navigation/routes';

function DogProfileScreen({ navigation }) {
  const dog = useSelector((state) => state.dog);

  return (
    <Screen style={styles.screen}>
      <Image style={styles.image} source={{ uri: dog.profileImageUrl }} />
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{dog.name}</Text>
        </View>
        {dog.gender && (
          <View style={styles.textContainer}>
            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.value}>{dog.gender}</Text>
          </View>
        )}
        {dog.birthday && (
          <View style={styles.textContainer}>
            <Text style={styles.label}>Birthday:</Text>
            <Text style={styles.value}>
              {dog.birthday.split(' ').slice(1, 4).join(' ')}
            </Text>
          </View>
        )}
      </View>
      <Button
        icon='home-plus'
        color='tabButton'
        onPress={() => navigation.navigate(routes.NEW_DOG)}
        title='New Dog'
        width={200}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.primaryBackground,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 50,
    borderRadius: 25,
    backgroundColor: colors.palegrey,
  },
  infoContainer: {
    backgroundColor: colors.secondaryBackground,
    borderRadius: 10,
    width: 300,
    padding: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 20,
    lineHeight: 40,
  },
  value: {
    color: colors.mossygrey,
    fontSize: 20,
    lineHeight: 40,
  },
});

export default DogProfileScreen;
