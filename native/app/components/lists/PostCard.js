import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import colors from '../../config/colors';
import ListItem from './ListItem';
import Text from '../Text';

function PostCard({ title, subTitle, image, description }) {
  return (
    <View>
      <Image style={styles.image} source={image} />
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <ListItem image={image} title={title} subTitle={subTitle} />
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: '100%',
    height: 350,
  },
  profileContainer: {},
  description: {
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
});

export default PostCard;
