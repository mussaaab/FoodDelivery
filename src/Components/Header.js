import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Header = ({leftIcon, rigthIcon}) => {
  const {height, width} = Dimensions.get('window');

  return (
    <View style={{height: 50, flexDirection: 'row'}}>
      <View
        style={{
          width: width * 0.15,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity>{leftIcon()}</TouchableOpacity>
      </View>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            paddingHorizontal: 25,
            paddingVertical: 8,
            backgroundColor: '#f2f2f2',
            borderRadius: 20,
          }}>
          <Text style={{fontWeight: 'bold', color: '#000'}}>
            745 Lincoln Pi
          </Text>
        </View>
      </View>

      <View
        style={{
          width: width * 0.15,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity>{rigthIcon()}</TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
