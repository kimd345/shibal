import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import Text from '../Text';
import Likes from '../social/Likes';
import colors from '../../config/colors';

function PostCaptionListItem({
  postId,
  dogname,
  createdAt,
  profileImageUrl,
  IconComponent,
  onPress,
  activeOpacity = 0.65,
}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity}>
      <View style={styles.container}>
        {IconComponent}
        {profileImageUrl && (
          <Image style={styles.image} source={{ uri: profileImageUrl }} />
        )}
        <View style={styles.detailsContainer}>
          <Text style={styles.dogname}>{dogname}</Text>
          <Text style={styles.createdAt}>{createdAt}</Text>
        </View>
        <Likes postId={postId} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  dogname: {
    color: colors.primaryText,
    textAlign: 'left',
  },
  createdAt: {
    color: colors.greenishgrey,
    fontSize: 12,
    textAlign: 'left',
  },
});

export default PostCaptionListItem;
