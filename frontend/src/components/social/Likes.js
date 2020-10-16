import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import ActivityIndicator from '../animations/ActivityIndicator';
import Text from '../Text';
import colors from '../../config/colors';

import useApi from '../../hooks/useApi';

import likesApi from '../../api/likes';
import { actions } from '../../redux/ducks';

function Likes({ postId }) {
  const [currentLikes, setCurrentLikes] = useState();
  const [liked, setLiked] = useState(false);
  const dogId = useSelector(state => state.dog.id);
  const likes = useSelector(state => state.likes);
  
  const createLikeApi = useApi(likesApi.createLike);
  const deleteLikeApi = useApi(likesApi.deleteLike);

  const dispatch = useDispatch();

  console.log('STORE - LIKES: ', likes);
  
  useEffect(() => {
    setCurrentLikes(likes.filter(like => like.postId === postId));
    console.log('STATE - LIKES: ', currentLikes);
  }, [likes]);
  

  useEffect(() => {
    if (currentLikes !== undefined) {
      for (let i = 0; i < currentLikes.length; i++) {
        if (currentLikes[i].dogId === dogId) {
          return setLiked(true);
        }
      }
      setLiked(false);
    }
  }, [currentLikes]);

  const handleLike = async () => {
    await createLikeApi.request(dogId, postId)
      .then(result => dispatch(actions.addLike(result.data)));
  };

  const handleUnlike = async () => {
    await deleteLikeApi.request(dogId, postId)
      .then(result => dispatch(actions.removeLike(result.data)));
  };

  if (!currentLikes) return <ActivityIndicator visible={true} />;

  return (
    <View style={styles.container}>
      <View style={styles.likeItemContainer}>
      <Text style={styles.likesCount}>{currentLikes.length}</Text>
      </View>
      <View style={styles.likeItemContainer}>
        {!liked ?
          ((!currentLikes || createLikeApi.loading) ?
            <Ionicons name="md-heart-empty" size={26} color={colors.mossygrey} /> :
            <TouchableWithoutFeedback onPress={() => handleLike()}>
              <Ionicons name="md-heart-empty" size={26} color={colors.mossygrey} />
            </TouchableWithoutFeedback>) :
          ((!currentLikes || deleteLikeApi.loading) ?
            <Ionicons name="md-heart" size={26} color={colors.google} /> :
            <TouchableWithoutFeedback onPress={() => handleUnlike()}>
              <Ionicons name="md-heart" size={26} color={colors.google} />
            </TouchableWithoutFeedback>)

          // <TouchableWithoutFeedback onPress={()=> handleUnlike()}>
          //   <Ionicons name="md-heart" size={26} color={colors.google} />
          // </TouchableWithoutFeedback>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 30,
    alignItems: 'center',
  },
  likeItemContainer: {
    margin: 5,
  },
  likesCount: {
    fontSize: 14,
  },
});

export default Likes;