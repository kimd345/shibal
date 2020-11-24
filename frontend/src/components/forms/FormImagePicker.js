import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Auth, Storage } from 'aws-amplify';
import { useFormikContext } from 'formik';

import Button from '../Button';
import Text from '../Text';
import colors from '../../config/colors';
import useAuth from '../../hooks/useAuth';
import logger from '../../utility/logger';

function FormImagePicker({ name, category }) {
  const { setFieldValue, values } = useFormikContext();
  const [image, setImage] = useState(values[name]);
  const [percentage, setPercentage] = useState(0);
  const userId = useAuth().user.id;

  useEffect(() => {
    (async () => {
      const cameraRollStatus = await ImagePicker.requestCameraRollPermissionsAsync();
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (
        cameraRollStatus.status !== 'granted' ||
        cameraStatus.status !== 'granted'
      ) {
        alert(
          'Please enable camera and library permissions to upload a photo.'
        );
      }
    })();
  }, []);

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: 'Images',
      aspect: [4, 3],
    });

    this.handleImagePicked(result);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      aspect: [4, 3],
      quality: 1,
    });

    this.handleImagePicked(result);
  };

  handleImagePicked = async (pickerResult) => {
    try {
      if (pickerResult.cancelled) {
        alert('Upload cancelled');
        return;
      } else {
        setPercentage(0);
        const img = await fetchImageFromUri(pickerResult.uri);
        const uploadUrl = await uploadImage(
          `${category}/user-${userId}_${Date.now()}.jpg`,
          img
        );
        downloadImage(uploadUrl);
      }
    } catch (e) {
      logger.log(e);
      alert('Upload failed');
    }
  };

  uploadImage = (filename, img) => {
    Auth.currentCredentials();
    return Storage.put(filename, img, {
      level: 'public',
      contentType: 'image/jpeg',
      progressCallback(progress) {
        setLoading(progress);
      },
    })
      .then((response) => {
        return response.key;
      })
      .catch((error) => {
        logger.log(error);
        return error.response;
      });
  };

  const setLoading = (progress) => {
    const calculated = parseInt((progress.loaded / progress.total) * 100);
    updatePercentage(calculated);
  };

  const updatePercentage = (number) => {
    setPercentage(`${number}%`);
    if (number === 100) setPercentage('Uploaded!');
  };

  downloadImage = (uri) => {
    Storage.get(uri)
      .then((result) => {
        result = result.split('?')[0];  // remove longass uri params
        setImage(result);
        setFieldValue(name, result); // setFieldValue
      })
      .catch((err) => logger.log(err));
  };

  const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={{ width: 125, height: 125 }} />
        ) : percentage !== 0 ? (
          <Text style={styles.percentage}>{percentage}</Text>
        ) : (
          <Text style={styles.text}>Upload a photo!</Text>
        )}
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          onPress={pickImage}
          color='palegrey'
          icon='image'
          textColor='black'
          title='Pick'
          width={105}
        />
        <Button
          onPress={takePhoto}
          color='palegrey'
          icon='camera'
          textColor='black'
          title='Take'
          width={105}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  imageContainer: {
    width: 125,
    height: 125,
    backgroundColor: colors.palegrey,
    justifyContent: 'center',
  },
  text: {
    color: colors.leafygrey,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    marginHorizontal: 15,
  },
  percentage: {
    zIndex: 1,
  },
  result: {
    paddingTop: 5,
  },
});

export default FormImagePicker;
