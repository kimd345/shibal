import { StyleSheet } from 'react-native';
import Whistle from '../components/Whistle';

import Screen from '../components/Screen';
import colors from '../config/colors';

function WhistleScreen(props) {
  return (
    <Screen style={styles.screen}>
      <Whistle size={200} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.grass,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WhistleScreen;
