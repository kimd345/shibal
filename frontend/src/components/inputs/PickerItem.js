import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Text from '../Text';

function PickerItem({ item, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Text style={styles.text}>{item.label}</Text>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});

export default PickerItem;
