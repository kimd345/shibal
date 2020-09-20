import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import Screen from '../components/Screen';
import { PostCard } from '../components/lists';
import Text from '../components/Text';
import Button from '../components/Button';
import colors from '../config/colors';
import postsApi from '../api/posts';

function SocialScreen(props) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const response = await postsApi.getPosts();
    if (!response.ok) return setError(true);

    setError(false);
    console.log(response.data.posts);
    setPosts(response.data.posts);
  };

  return (
    <Screen style={styles.screen}>
      {error && (
        <View>
          <Text>Couldn't retrieve the listings.</Text>
          <Button title='Retry' onPress={loadPosts} width='60%' />
        </View>
      )}
      <FlatList
        data={posts}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            dogname={item.dogId} // change later to name
            profileImageUrl={item.postImageUrl} // change later to profileImageUrl
            postImageUrl={item.postImageUrl}
            body={item.body}
            createdAt={item.createdAt}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.palegrey,
  },
});

export default SocialScreen;
