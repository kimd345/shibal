import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Text from '../Text';
import colors from '../../config/colors';

function ListItem({
  title,
  subtitle,
  IconComponent,
  onPress,
  activeOpacity=0.65,
}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity}>
      <View style={styles.container}>
        {IconComponent}
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={2}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    color: colors.primaryText,
    textAlign: 'left',
  },
  subtitle: {
    color: colors.greenishgrey,
    fontSize: 12,
    textAlign: 'left',
  },
});

export default ListItem;
