import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import colors from '../../config/colors';
import Screen from '../../components/Screen';
import Text from '../../components/Text';
import {
  ErrorMessage,
  Form,
  FormDatePicker,
  FormField,
  FormPicker,
  SubmitButton,
} from '../../components/forms';
import dogsApi from '../../api/dogs';
import usersApi from '../../api/users';
import useApi from '../../hooks/useApi';
import useAuth from '../../hooks/useAuth';
import ActivityIndicator from '../../components/animations/ActivityIndicator';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().max(50).label('Name'),
});

const genders = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  },
];

function NewDogScreen(props) {
  const createDogApi = useApi(dogsApi.createDog);
  const putCurrentDogApi = useApi(usersApi.putCurrentDog);
  const userId = useAuth().user.id;
  const [error, setError] = useState();

  const handleSubmit = async (dogInfo) => {
    dogInfo = { ...dogInfo, ...{ user_id: userId } };
    console.log('DogInfo: ', dogInfo);
    const responseDog = await createDogApi.request(dogInfo);
    console.log('responseDog: ', responseDog.data);

    if (!responseDog.ok) {
      if (responseDog.data) setError(responseDog.data.msg);
      else {
        setError('An unexpected error occurred');
      }
      return;
    }

    const dogId = responseDog.data.id;
    const responseCurrentDog = await putCurrentDogApi.request(userId, dogId);
    console.log('NewDogScreen: ', responseCurrentDog.data);
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
          <FormPicker
            items={genders}
            name='gender'
            placeholder='Gender'
            width='50%'
          />
          <FormDatePicker name='birthday' />
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
