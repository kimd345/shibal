import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../../config/colors';
import Icon from '../Icon';
import Text from '../Text';

function ActivityTaskItem({ task }) {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(true);
  };

  return (
    <TouchableOpacity 
      style={styles.taskItemWrapper}
      onPress={handleCheck} 
      activeOpacity={0.65}
    >
      <View style={styles.iconWrapper}>
        {checked
          ? <Icon 
              name='check' 
              backgroundColor={colors.primaryButton}
              iconColor='white'
            />
          : <Icon
              backgroundColor='white'
              borderWidth={1}
              borderColor={colors.primaryButton}
            />}
      </View>
      <View style={styles.textWrapper}>
        <Text style={[styles.text, {textDecorationLine: checked ? 'line-through' : 'none' }]}>
          {task}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  taskItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  iconWrapper: {
    margin: 10
  },
  textWrapper: {
    width: '80%',
  },
  text: {
    textAlign: 'left',
    color: colors.mossygrey,
    paddingHorizontal: 10,
    fontSize: 14,
    lineHeight: 18,
  },
});

export default ActivityTaskItem;