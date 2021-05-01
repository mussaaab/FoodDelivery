import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, } from 'react-native';
import { useSelector } from 'react-redux'
import { Colors, Images } from '../Config';



export const FoodCategories = ({ item, index, AddToCart, removeFromCart, navigation }) => {
    const { height, width } = Dimensions.get("window");

    let foodItem = useSelector(state => state.cartItems)

    let id =  foodItem.findIndex((cartIndex, abc) => abc == index)

    console.warn(id);

    


    return (
        <View style={{ width: width * 0.9, alignSelf: "center" }}>
            <TouchableOpacity
                onPress={() => navigation.navigate("FoodDetail", { item })}
                style={{
                    flex: 1,
                    marginVertical: 20,
                    alignSelf: "center",
                    borderRadius: 10,
                    elevation: 2,
                }}
            >
                <View
                    style={{
                        borderRadius: 10,
                        flex: 1,
                        justifyContent: "flex-end",
                        overflow: "hidden",
                    }}
                >
                    <Image
                        source={item.image}
                        style={{
                            width: width * 0.9,
                            height: height * 0.25,
                            resizeMode: "cover",
                            overflow: "hidden",
                        }}
                    />

                    <View
                        style={{
                            position: "absolute",
                            backgroundColor: "#fff",
                            borderTopRightRadius: 10,
                        }}
                    >
                        <Text
                            style={{
                                paddingVertical: 15,
                                paddingHorizontal: 20,
                                fontWeight: "bold",
                            }}
                        >
                            {item.time} min
                </Text>
                    </View>
                </View>
            </TouchableOpacity>

            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                    alignSelf: "center",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Text style={{ fontSize: 22 }}>{item.title}</Text>
                {!item.cartStatus ? (
                    <TouchableOpacity onPress={() => AddToCart(item, index)}>
                        <Text
                            style={{
                                color: Colors.Primary,
                                fontSize: 12,
                                fontWeight: "bold",
                            }}
                        >
                            Add to cart
                </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => removeFromCart(item, index)}>
                        <Text
                            style={{
                                color: Colors.Primary,
                                fontSize: 12,
                                fontWeight: "bold",
                            }}
                        >
                            Remove
                </Text>
                    </TouchableOpacity>
                )}
            </View>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    height: 30,
                }}
            >
                <Image
                    source={Images.star}
                    style={{
                        width: 17,
                        height: 17,
                        resizeMode: "contain",
                        tintColor: Colors.Primary,
                    }}
                />
                <Text style={{ paddingHorizontal: 8, fontSize: 16 }}>
                    {item.rating}
                </Text>
                <Text style={{ paddingHorizontal: 6, fontSize: 16 }}>
                    {item.name}
                </Text>

                <View
                    style={{
                        width: 10,
                        height: 30,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            width: 3,
                            height: 3,
                            borderRadius: 100,
                            backgroundColor: Colors.Secondary,
                            marginTop: 5,
                        }}
                    />
                </View>
            </View>
        </View>
    )
}