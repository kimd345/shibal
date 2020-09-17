import { Platform } from 'react-native';

import colors from './colors';

export default {
  colors,
  systemText: {
    color: colors.leafygrey,
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },
};
