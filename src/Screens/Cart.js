import React, { Component } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { Header } from "../Components";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from "react-native-vector-icons/FontAwesome";

export class Cart extends Component {
    renderCartItems = ({ item }) => {
        console.warn(item);
        return (
            <View style={{ width: '95%', paddingVertical: 10, paddingHorizontal: 8, alignSelf: 'center', flexDirection: 'row', borderRadius: 12, borderWidth: 1, marginVertical: 8 }}>
                <View style={{ width: 100, height: 90 }}>
                    <Image source={item.image} style={{ width: 100, height: 90, borderRadius: 6 }} />
                </View>

                <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 8, }}>
                    <Text style={{ fontSize: 18 }}>{item.title}</Text>
                    <Text>Price: ${item.price}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <AntDesign name="star" size={16} color="orange" />
                        <Text style={{ paddingLeft: 3 }}>{item.rating}</Text>
                    </View>
                </View>
            </View>
        )
    }
    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header
                    leftIcon={() => (
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <AntDesign name="arrowleft" size={24} color="#000" />
                        </TouchableOpacity>
                    )}
                    rigthIcon={() => (
                        <TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("Cart")}
                            >
                                {/* <View
                                    style={{
                                        width: 20,
                                        height: 20,
                                        backgroundColor: "red",
                                        borderRadius: 50,
                                    }}
                                >
                                    <Text> {this.props.foodItem.length}</Text>
                                </View> */}
                                <FontAwesome name="shopping-basket" size={20} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                />

                <FlatList data={this.props.foodItem} renderItem={this.renderCartItems} />
            </View>
        )
    }
}


const mapStateToProps = (state) => ({
    foodItem: state.cartItems
})

export default connect(mapStateToProps, null)(Cart);
