import React from 'react';
import Constants from 'expo-constants';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Platform,
  FlatList,
} from 'react-native';

function Screen({ children, style }) {
  if (Platform.OS === 'web') {
    return children;
  }
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={style}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
});

export default Screen;
