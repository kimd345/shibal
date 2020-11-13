import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';

import colors from '../../config/colors';
import Whistle from '../Whistle';
import SkillSliderItem from './SkillSliderItem';
import Timer from './Timer';

function SkillSlider({ steps, duration, entityId, program }) {
  const [sliderState, setSliderState] = useState({ currentPage: 0 });

  const width = useWindowDimensions().width;

  const setSliderPage = (event) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const { currentPage: pageIndex } = sliderState;

  const stepsStr = steps.join(',');
  const showWhistle = stepsStr.includes('whistle')
                      || stepsStr.includes('treat')
                      || stepsStr.includes('W&T');

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            setSliderPage(event);
          }}
      >
        {steps.map(step => {
          const id = steps.indexOf(step) + 1;
          return (
            <SkillSliderItem
              key={id}
              stepNum={id}
              step={step} 
              numSteps={steps.length}
              entityId={entityId}
              program={program}
            />
          )
        })}
      </ScrollView>
      <View style={styles.paginationWrapper}>
        {Array.from(Array(steps.length).keys()).map((key, index) => (
          <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
        ))}
      </View>
      <View style={styles.timerWrapper}>
        <Timer duration={duration} entityId={entityId} />
        {showWhistle && 
          <View style={styles.whistleWrapper}>
            <Whistle size={75} />
          </View>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  paginationWrapper: {
    position: 'absolute',
    bottom: 150,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: colors.greenishgrey,
    marginLeft: 10,
  },
  timerWrapper: {
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  whistleWrapper: {
    marginBottom: 20,
  },
});

export default SkillSlider;