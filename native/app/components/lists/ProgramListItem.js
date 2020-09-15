import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import Text from '../Text';
import Header from '../Header';
import colors from '../../config/colors';

function ProgramListItem({ title, subTitle, image, onPress, backgroundColor }) {
  return (
    <TouchableOpacity activeOpacity={0.65} onPress={onPress}>
      <View
        style={[styles.container, { backgroundColor: colors[backgroundColor] }]}
      >
        <Image style={styles.image} source={image} />
        <View style={styles.detailsContainer}>
          <Header style={styles.title}>{title}</Header>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: colors.mossygrey,
    marginHorizontal: 20,
    marginVertical: 5,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 150,
  },
  detailsContainer: {
    padding: 20,
    width: '60%',
  },
  title: {
    marginBottom: 7,
    textAlign: 'left',
    color: colors.white,
  },
  subTitle: {
    color: colors.secondary,
    textAlign: 'left',
    fontSize: 12,
    color: colors.white,
  },
  image: {
    width: 175,
    maxHeight: 150,
    position: 'absolute',
    bottom: 0,
    right: -20,
  },
});

export default ProgramListItem;
