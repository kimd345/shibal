import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import ActivityIndicator from '../../components/animations/ActivityIndicator';
import Screen from '../../components/Screen';
import {
  ErrorMessage,
  Form,
  FormField,
  FormImagePicker,
  SubmitButton,
} from '../../components/forms';
import Button from '../../components/Button';
import colors from '../../config/colors';

import useApi from '../../hooks/useApi';

import postsApi from '../../api/posts';

const validationSchema = Yup.object().shape({
  imageUrl: Yup.string().required('Please upload an image'),
  body: Yup.string().max(280).label('body'),
});

function NewPostScreen({ navigation }) {
  const [error, setError] = useState();
  const dog = useSelector(state => state.dog);

  const createPostApi = useApi(postsApi.createPost);

  const handleSubmit = async (postInfo) => {
    postInfo = { ...postInfo, ...{ dogId: dog.id } };
    const resultPost = await createPostApi.request(postInfo);

    if (!resultPost.ok) {
      if (resultPost.data) setError(resultPost.data.msg);
      else {
        setError('An unexpected error occurred');
      }
      return;
    }
    
    navigation.popToTop();
  };

  return (
    <>
      <ActivityIndicator
        visible={createPostApi.loading}
        backgroundColor='leafygrey'
      />
      <Screen style={styles.screen}>
        <Form
          initialValues={{
            imageUrl: '',
            body: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <FormImagePicker name='imageUrl' category='posts' />
          <FormField
            maxLength={280}
            multiline
            name='body'
            numberOfLines={3}
            placeholder='Share some details?'
          />
          <SubmitButton title='Post' />
        </Form>
        <Button
          color='tabButton'
          onPress={() => navigation.goBack()}
          title='Cancel'
          width='60%'
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.leafygrey,
  },
});
export default NewPostScreen;
