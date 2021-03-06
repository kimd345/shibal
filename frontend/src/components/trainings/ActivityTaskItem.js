import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import colors from '../../config/colors';
import Icon from '../Icon';
import Text from '../Text';

function ActivityTaskItem({ task, entityId }) {
  const enrollment = useSelector(state => state.enrollments[entityId] !== undefined);
  const [checked, setChecked] = useState(enrollment);


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
        <Text 
          style={[
            styles.text, 
            {
              textDecorationLine: checked ? 'line-through' : 'none',
              color: checked ? colors.greenishgrey : colors.mossygrey,
            }
          ]}
        >
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
    paddingHorizontal: 10,
    fontSize: 14,
    lineHeight: 18,
  },
});

export default ActivityTaskItem;