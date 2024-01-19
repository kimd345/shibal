import { View, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';

import colors from '../../config/colors';
import Text from '../../components/Text';
import Button from '../../components/Button';
import Header from '../../components/Header';

function LessonCompleteScreen({ modalVisible, lesson }) {
  const dogName = useSelector(state => state.dog.name);
  const navigation = useNavigation();

  const randomCliche = (cliches) => {
    const idx = Math.floor((Math.random() * cliches.length));

    return cliches[idx];
  };

  const cliches = [
    'is on a roll!', 
    'has what it takes!',
    'is on the path to becoming a star!',
    'is on another level!',
    'is dripping with discipline!',
    'could become the next hokage at this rate!'
  ];

  return (
    <Modal visible={modalVisible} animationType='slide'>
      <View style={styles.screen}>
        <View style={styles.textWrapper}>
          <Header style={styles.header}>Lesson {lesson.title.split(' ')[1]} Complete</Header>
          <Text style={styles.clicheText}>{dogName} {randomCliche(cliches)}</Text>
        </View>
        <LottieView
          autoPlay
          loop={false}
          source={require('../../assets/animations/completed/check.json')}
        />
        <View style={styles.buttonWrapper}>
          <Text >Come back tomorrow for the next lesson!</Text>
          <Button
            icon='check'
            title='COMPLETE'
            width={200}
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
    top: 150,
  },
  clicheText: {
    fontSize: 18,
    marginBottom: 20,
  },
  header: {
    fontSize: 30,
    lineHeight: 50,
  },
  buttonWrapper: {
    top: '65%',
    width: '90%',
  },
});

export default LessonCompleteScreen;