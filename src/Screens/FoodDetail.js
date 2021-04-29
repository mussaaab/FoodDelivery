import React, {Component} from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import {Header} from '../Components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../Config';

const {height, width} = Dimensions.get('window');

class FoodDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {item} = this.props.route.params;

    console.warn('dasda', item);
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Header
          leftIcon={() => (
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <AntDesign name="arrowleft" size={22} color="#000" />
            </TouchableOpacity>
          )}
          rigthIcon={() => (
            <TouchableOpacity>
              <AntDesign name="menufold" size={20} />
            </TouchableOpacity>
          )}
        />

        <View style={{flex: 1}}>
          <Image
            source={item.image}
            style={{
              width: width * 1,
              height: height * 0.4,
              resizeMode: 'cover',
            }}
          />

          <View style={{flex: 1}}>
            <View
              style={{
                width: width * 0.8,
                paddingVertical: 8,
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                {item.title} - ${item.price}
              </Text>
            </View>

            <Text style={{textAlign: 'center', fontSize: 16}}>
              {item.detail}
            </Text>

            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                color: Colors.Secondary,
                paddingTop: 10,
              }}>
              {item.cal} cal
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 0.5,
            backgroundColor: Colors.lightPrimary,
            borderTopWidth: 1,
            borderTopColor: Colors.Secondary,
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            elevation: 3,
          }}>
          <View style={{flex: 1}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  margin: 15,
                  // width: 140,
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  padding: 10,
                }}>
                <Text style={{fontSize: 16}}>1 Item In Chart</Text>
              </View>

              <View
                style={{
                  margin: 15,
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  padding: 10,
                }}>
                <Text style={{fontSize: 16}}>${item.price}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={{
              width: width * 0.7,
              padding: 15,
              borderWidth: 1,
              borderColor: '#fff',
              marginVertical: 20,
              alignSelf: 'center',
              alignItems: 'center',
              borderRadius: 14,
              backgroundColor: '#fff',
            }}>
            <Text style={{fontSize: 16}}>Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default FoodDetail;
