import { Text, StyleSheet } from 'react-native';

import colors from '../config/colors';

function AppText({ children, style, ...otherProps }) {
  return (
    <Text style={[styles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'DogeSans-Regular',
    fontSize: 16,
    color: colors.primaryText,
    textAlign: 'center',
    lineHeight: 28,
  },
});

export default AppText;
