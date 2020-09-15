import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import Screen from '../components/Screen';
import { PostCard } from '../components/lists';
import colors from '../config/colors';

const posts = [
  {
    id: 1,
    title: 'Walnut',
    subTitle: '15 minutes ago',
    image: require('../assets/programIcons/basicObedience.png'),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 2,
    title: 'Dumpling',
    subTitle: '10 minutes ago',
    image: require('../assets/programIcons/stayActive.png'),
    description:
      'Id semper risus in hendrerit gravida. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Nec sagittis aliquam malesuada bibendum arcu vitae. Quis lectus nulla at volutpat. Cum sociis natoque penatibus et magnis dis parturient montes. Pharetra sit amet aliquam id diam. Amet risus nullam eget felis eget nunc lobortis mattis. Velit aliquet sagittis id consectetur purus ut. Quisque sagittis purus sit amet volutpat consequat mauris. Netus et malesuada fames ac turpis egestas integer. Sit amet aliquam id diam. In aliquam sem fringilla ut morbi tincidunt augue interdum. Consectetur lorem donec massa sapien faucibus et molestie ac. Ut ornare lectus sit amet est placerat in egestas erat. Sed velit dignissim sodales ut eu sem. Ac felis donec et odio pellentesque.',
  },
];

function PostsScreen(props) {
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={posts}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            image={item.image}
            subTitle={item.subTitle}
            title={item.title}
            description={item.description}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.palegrey,
  },
});

export default PostsScreen;
