import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';

import colors from '../../config/colors';
import Whistle from '../Whistle';
import SliderItem from './SliderItem';

function Slider({ items }) {
  const [sliderState, setSliderState] = useState({ currentPage: 0 });

  const width = useWindowDimensions().width;
  const showWhistle = items.join(',').includes('whistle');

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
        {items.map(item => {
          const id = items.indexOf(item) + 1;
          return (
            <SliderItem
              key={id}
              stepNum={id}
              item={item} 
              numSteps={items.length}
            />
          )
        })}
      </ScrollView>
      <View style={styles.paginationWrapper}>
        {Array.from(Array(items.length).keys()).map((key, index) => (
          <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
        ))}
      </View>
      {showWhistle && 
        <View style={styles.whistleWrapper}>
          <Whistle size={100} />
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
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
  whistleWrapper: {
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default Slider;