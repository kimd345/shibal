import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ActivityIndicator from '../components/animations/ActivityIndicator';
import PostCard from '../components/social/PostCard';
import Text from '../components/Text';
import Button from '../components/Button';

import colors from '../config/colors';

import postsApi from '../api/posts';
import useApi from '../hooks/useApi';
import routes from '../navigation/routes';

function SocialScreen({ navigation }) {
  const [scrolling, setScrolling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const { data: posts, error, loading, request: loadPosts } = useApi(
    postsApi.getPosts,
    'posts'
  );

  const dispatch = useDispatch();

  useEffect(() => {
    loadPosts();
  }, []);


  return (
    <>
      <ActivityIndicator visible={loading} backgroundColor='palegrey' />
      {error && (
        <View style={styles.error}>
          <Text>Couldn't retrieve the posts.</Text>
          <Button title='Retry' onPress={loadPosts} width='60%' />
        </View>
      )}
      {!(scrolling || loading) && (
        <View style={styles.newPostButton}>
          <Button 
            title='Participate!'
            icon='star'
            onPress={() => navigation.navigate(routes.NEW_POST)}
          />
        </View>
      )}
      <FlatList
        onScrollBeginDrag={() => setScrolling(true)}
        onMomentumScrollEnd={() => setScrolling(false)}
        onRefresh={() => loadPosts()}
        refreshing={refreshing}
        data={posts}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            dogname={item.dog.name}
            profileImageUrl={item.dog.profileImageUrl}
            postImageUrl={item.postImageUrl}
            body={item.body}
            createdAt={item.createdAt.toString().split(' ').slice(1, 5).join(' ')}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  error: {
    top: 300,
  },
  newPostButton: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    alignSelf: 'center',
  }
});

export default SocialScreen;
