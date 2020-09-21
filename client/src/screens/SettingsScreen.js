import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import Screen from '../components/Screen';
import { ListItem, ListItemSeparator } from '../components/lists';
import Icon from '../components/Icon';
import colors from '../config/colors';
import useAuth from '../auth/useAuth';

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
        Thank you for checking out my app!
      </Text>
      <ListItem
        title='Logout'
        onPress={() => logOut()}
        IconComponent={
          <Icon
            name='sign-out-alt'
            backgroundColor={colors.white}
            iconColor={colors.greenishgrey}
          />
        }
      />
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
    marginLeft: 20,
    color: colors.greenishgrey,
    fontSize: 12,
  },
});

export default SettingsScreen;
