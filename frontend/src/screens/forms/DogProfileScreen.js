import React from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/Button';
import Screen from '../../components/Screen';
import Text from '../../components/Text';
import colors from '../../config/colors';

import useAuth from '../../hooks/useAuth';
import useApi from '../../hooks/useApi';

import dogsApi from '../../api/dogs';
import usersApi from '../../api/users';
import routes from '../../navigation/routes';
import { actions } from '../../redux/ducks';
import ActivityIndicator from '../../components/animations/ActivityIndicator';


function DogProfileScreen({ navigation }) {
  const dog = useSelector((state) => state.dog);
  const dogs = useSelector((state) => state.dogs);

  const deleteDogApi = useApi(dogsApi.deleteDog);
  const putCurrentDogApi = useApi(usersApi.putCurrentDog);

  const userId = useAuth().user.id;
  const dispatch = useDispatch();

  const handleDelete = async () => {
    dispatch(actions.removeDog(dog.id));
    const dogsR = dogs.filter(dogR => dogR.id !== dog.id);
    dispatch(actions.setDog(dogsR[0]));
    await putCurrentDogApi.request(userId, dogsR[0].id);
    dispatch(actions.setCurrentDogId(dogsR[0].id));
    await deleteDogApi.request(dog.id);

    navigation.navigate(routes.HOME)
  }

  if (deleteDogApi.loading || putCurrentDogApi.loading ) {
    return <ActivityIndicator visible={true} backgroundColor='primaryBackground' />;
  }

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
        icon='playlist-edit'
        color='tabButton'
        onPress={() => {}}
        title='Edit Dog'
        width={200}
      />
      <Button
        icon='home-plus'
        color='tabButton'
        onPress={() => navigation.navigate(routes.NEW_DOG)}
        title='New Dog'
        width={200}
      />
      {(dogs.length > 1) && <Button
        icon='home-minus'
        color='secondaryText'
        onPress={() => Alert.alert(
          `Are you sure?`,
          `Removal is irreversible. ${dog.name}, training progress, and all related data will be deleted.`,
          [
            {
              text: 'Cancel',
              style: 'cancel'
            },
            {
              text: 'Delete',
              onPress: () => handleDelete(),
            }
          ]
        )}
        title='Remove Dog'
        width={200}
      />}
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
    borderRadius: 25,
    backgroundColor: colors.palegrey,
  },
  infoContainer: {
    backgroundColor: colors.secondaryBackground,
    borderRadius: 10,
    marginVertical: 30,
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
