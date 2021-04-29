import React, {useState} from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import Svg, {Path, Circle} from 'react-native-svg';

const CustomTabButton = ({accessibilityState, children, onPress}) => {
  let isSelected = accessibilityState.selected;

  if (isSelected) {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            backgroundColor: '#f2f2f2',
            top: 0,
          }}>
          <View
            style={{flex: 1, backgroundColor: '#fff'}}
          />
          <Svg width={75} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={'#fff'}
            />
          </Svg>
          <View style={{flex: 1, backgroundColor: '#fff'}} />
        </View>

        <TouchableOpacity
          style={{
            top: -20,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#fff',
          }}
          onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 60,
          backgroundColor: '#fff',
        }}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
};

export default CustomTabButton;
