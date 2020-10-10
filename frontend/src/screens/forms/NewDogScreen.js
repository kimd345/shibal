import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import ActivityIndicator from '../../components/animations/ActivityIndicator';
import Screen from '../../components/Screen';
import {
  ErrorMessage,
  Form,
  FormDatePicker,
  FormField,
  FormPicker,
  FormProfileImagePicker,
  SubmitButton,
} from '../../components/forms';
import colors from '../../config/colors';

import useAuth from '../../hooks/useAuth';
import useApi from '../../hooks/useApi';

import dogsApi from '../../api/dogs';
import usersApi from '../../api/users';
import routes from '../../navigation/routes';
import { actions } from '../../redux/ducks';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().max(50).label('Name'),
});

const genders = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

function NewDogScreen({ navigation }) {
  const [error, setError] = useState();
  
  const createDogApi = useApi(dogsApi.createDog);
  const putCurrentDogApi = useApi(usersApi.putCurrentDog);

  const userId = useAuth().user.id;
  const dispatch = useDispatch();

  const handleSubmit = async (dogInfo) => {
    dogInfo = { ...dogInfo, ...{ userId: userId } };
    const resultDog = await createDogApi.request(dogInfo);
    dispatch(actions.setDog(resultDog.data));

    if (!resultDog.ok) {
      if (resultDog.data) setError(resultDog.data.msg);
      else {
        setError('An unexpected error occurred');
      }
      return;
    }

    const dogId = resultDog.data.id;
    await putCurrentDogApi.request(userId, dogId);
    dispatch(actions.addDog(resultDog.data));
    dispatch(actions.setCurrentDogId(dogId));

    navigation.navigate(routes.HOME);
  };

  return (
    <>
      <ActivityIndicator
        visible={createDogApi.loading}
        backgroundColor='primaryBackground'
      />
      <Screen style={styles.screen}>
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
          <FormProfileImagePicker name='imageUrl' />
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
});

export default NewDogScreen;
