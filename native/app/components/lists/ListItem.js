import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import Text from '../Text';
import colors from '../../config/colors';

function ListItem({ title, subTitle, image, IconComponent, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.65} onPress={onPress}>
      <View style={styles.container}>
        {IconComponent}
        {image && <Image style={styles.image} source={image} />}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
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
    color: colors.mossygrey,
    textAlign: 'left',
  },
  subTitle: {
    color: colors.greenishgrey,
    textAlign: 'left',
  },
});

export default ListItem;
