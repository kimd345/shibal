import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import colors from '../../config/colors';
import Screen from '../../components/Screen';
import Text from '../../components/Text';
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from '../../components/forms';
import dogsApi from '../../api/dogs';
import usersApi from '../../api/users';
import useApi from '../../hooks/useApi';
import useAuth from '../../auth/useAuth';
import ActivityIndicator from '../../components/animations/ActivityIndicator';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().max(50).label('Name'),
});

function NewDogScreen(props) {
  const createDogApi = useApi(dogsApi.createDog);
  const putCurrentDogApi = useApi(usersApi.putCurrentDog);
  const userId = useAuth().user.id;
  const [error, setError] = useState();

  const handleSubmit = async (dogInfo) => {
    dogInfo = { ...dogInfo, ...{ user_id: userId } };
    console.log('DogInfo: ', dogInfo);
    const result1 = await createDogApi.request(dogInfo);
    console.log('Result1: ', result.data);

    if (!result1.ok) {
      if (result1.data) setError(result1.data.msg);
      else {
        setError('An unexpected error occurred');
      }
      return;
    }

    const dogId = result.data.id;
    const result2 = await putCurrentDogApi.request(userId, dogId);
    console.log('NewDogScreen: ', result2.data);
    // navigate to home
  };

  return (
    <>
      <ActivityIndicator
        visible={createDogApi.loading}
        backgroundColor='primaryBackground'
      />
      <Screen style={styles.screen}>
        <Text style={styles.text}>Your Inu</Text>
        <Form
          initialValues={{ name: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <FormField
            autoCapitalize='words'
            autoCorrect={false}
            icon='dog-side'
            keyboardType='default'
            name='name'
            placeholder="Enter your Inu's name"
            textContentType='name'
          />
          <SubmitButton title='Submit' />
        </Form>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.primaryBackground,
    padding: 10,
  },
  text: {
    color: colors.secondaryText,
    fontSize: 24,
    marginVertical: 20,
    letterSpacing: 0.5,
  },
});

export default NewDogScreen;
