import React from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import {
  Form,
  FormField,
  FormImagePicker,
  SubmitButton,
} from '../../components/forms';
import Screen from '../../components/Screen';

const validationSchema = Yup.object().shape({
  description: Yup.string().label('Description'),
  images: Yup.array().min(1, 'Please select at least one image.'),
});

function NewPostScreen() {
  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{
          description: '',
          images: [],
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <FormImagePicker name='images' />
        <FormField
          maxLength={255}
          multiline
          name='description'
          numberOfLines={3}
          placeholder='Description'
        />
        <SubmitButton title='Post' />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default NewPostScreen;
