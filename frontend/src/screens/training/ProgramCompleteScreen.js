import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import colors from '../../config/colors';
import Text from '../../components/Text';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Screen from '../../components/Screen';

function ProgramCompleteScreen({ modalVisible, program }) {
  const navigation = useNavigation();

  return (
    <Modal visible={modalVisible} animationType='slide'>
      <View style={styles.screen}>
        <View style={styles.textWrapper}>
          <Text style={styles.congratsText}>Congratulations!</Text>
          <Text style={styles.congratsSubtext}>You completed the following program:</Text>
          <Header style={styles.header}>{program.title}</Header>
        </View>
        <LottieView
          autoPlay
          loop={false}
          source={require('../../assets/animations/completed/trophy.json')}
        />
        <View style={styles.buttonWrapper}>
          <Button
            icon='check'
            title='COMPLETE' 
            onPress={() => navigation.popToTop()} 
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.grass,
  },
  textWrapper: {
    top: 125,
  },
  congratsText: {
    fontSize: 30,
    marginBottom: 20,
  },
  congratsSubtext: {
    lineHeight: 50,
  },
  header: {
    fontSize: 30,
    lineHeight: 50,
  },
  buttonWrapper: {
    top: '60%',
    width: 200,
  },
});

export default ProgramCompleteScreen;