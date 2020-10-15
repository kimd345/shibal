import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

import colors from '../../config/colors';
import PostCaptionListItem from './PostCaptionListItem';

function PostCard({ postId, dogname, profileImageUrl, postImageUrl, body, createdAt }) {
  return (
    <View>
      <Image style={styles.postImage} source={{ uri: postImageUrl }} />
      <View>
        <View>
          <PostCaptionListItem
            postId={postId}
            dogname={dogname}
            profileImageUrl={profileImageUrl}
            createdAt={createdAt}
            activeOpacity={1}
          />
          <Text style={styles.body} numberOfLines={2}>
            {body}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postImage: {
    width: '100%',
    height: 350,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
});

export default PostCard;
