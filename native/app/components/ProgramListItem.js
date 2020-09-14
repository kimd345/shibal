import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import AppText from './AppText';
import AppHeader from './AppHeader';
import colors from '../config/colors';

function ProgramListItem({ title, subTitle, image, onPress, backgroundColor }) {
  return (
    <TouchableOpacity activeOpacity={0.65} onPress={onPress}>
      <View
        style={[styles.container, { backgroundColor: colors[backgroundColor] }]}
      >
        <Image style={styles.image} source={image} />
        <View style={styles.detailsContainer}>
          <AppHeader style={styles.title}>{title}</AppHeader>
          <AppText style={styles.subTitle}>{subTitle}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: colors.secondaryBackground, // white
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
  },
  subTitle: {
    color: colors.secondary,
    textAlign: 'left',
    fontSize: 12,
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
