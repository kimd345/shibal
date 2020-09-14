import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import AppText from './AppText';
import AppHeader from './AppHeader';
import colors from '../config/colors';

function ProgramCard({ title, subTitle, image }) {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={image} />
      <View style={styles.detailsContainer}>
        <AppHeader style={styles.title}>{title}</AppHeader>
        <AppText style={styles.subTitle}>{subTitle}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: colors.secondaryBackground, // white
    marginBottom: 20,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '20%',
    width: '90%',
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
    maxWidth: '25%',
    height: 120,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default ProgramCard;
