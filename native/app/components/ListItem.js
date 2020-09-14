import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import AppText from './AppText';
import colors from '../config/colors';

function ListItem({ title, subTitle, image, IconComponent, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.65} onPress={onPress}>
      <View style={styles.container}>
        {IconComponent}
        {image && <Image style={styles.image} source={image} />}
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{title}</AppText>
          {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
        </View>
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
  title: {
    color: colors.darkgrey,
    textAlign: 'left',
  },
  subTitle: {
    color: colors.grey,
    textAlign: 'left',
  },
});

export default ListItem;
