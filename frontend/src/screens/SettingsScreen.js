import React from 'react';
import { StyleSheet, View, FlatList, Text, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import Screen from '../components/Screen';
import { ListItem, ListItemSeparator } from '../components/lists';
import Icon from '../components/Icon';
import colors from '../config/colors';
import useAuth from '../hooks/useAuth';

const menuItems = [
  {
    title: 'GitHub',
    icon: {
      name: 'github-alt',
      backgroundColor: colors.github,
    },
    handleOpenBio: () =>
      WebBrowser.openBrowserAsync('https://github.com/kimd345'),
  },
  {
    title: 'LinkedIn',
    icon: {
      name: 'linkedin-in',
      backgroundColor: colors.linkedin,
    },
    handleOpenBio: () =>
      WebBrowser.openBrowserAsync('https://linkedin.com/in/dong-hyuk-kim'),
  },
  {
    title: 'AngelList',
    icon: {
      name: 'angellist',
      backgroundColor: colors.angellist,
    },
    handleOpenBio: () =>
      WebBrowser.openBrowserAsync('https://angel.co/u/dong-hyuk-kim'),
  },
  {
    title: 'Portfolio',
    icon: {
      name: 'briefcase',
      backgroundColor: colors.mossygrey,
    },
  },
];

function SettingsScreen(props) {
  const { user, logOut } = useAuth();

  return (
    <Screen style={styles.screen}>
      <View style={styles.listContainer}>
        <ListItem
          title={user.email}
          subtitle={`Joined on: ${user.createdAt
            .split(' ')
            .slice(0, 4)
            .join(' ')}`}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={item.handleOpenBio}
            />
          )}
        />
      </View>
      <Text style={styles.thankYouText}>
        Shibal is a React Native application inspired by DOGO. Please support
        DOGO in making millions of dogs happy around the world! Thank you for
        checking out my app!
      </Text>
      <ListItem
        title='DOGO'
        onPress={() => WebBrowser.openBrowserAsync('https://dogo.app')}
        IconComponent={
          <Image
            style={styles.dogoIcon}
            source={require('../assets/dogo.png')}
          />
        }
      />
      <View style={styles.listContainer}>
        <ListItem
          title='Log Out'
          onPress={() => logOut()}
          IconComponent={
            <Icon
              name='sign-out-alt'
              backgroundColor={colors.white}
              iconColor={colors.greenishgrey}
            />
          }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.palegrey,
  },
  listContainer: {
    marginVertical: 20,
  },
  thankYouText: {
    marginHorizontal: 20,
    marginTop: 20,
    color: colors.greenishgrey,
    fontSize: 12,
  },
  dogoIcon: {
    resizeMode: 'contain',
    height: 40,
    width: 40,
  },
});

export default SettingsScreen;
