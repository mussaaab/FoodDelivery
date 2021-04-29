import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Header } from "../Components";
import { Images, Colors } from "../Config";

// Icons
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";

const { height, width } = Dimensions.get("window");

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodCategory: [
        { title: "Burgers", image: Images.burger, index: 0 },
        { title: "Pizza", image: Images.pizza, addToCart: false, index: 1 },
        { title: "Drinks", image: Images.drink, addToCart: false, index: 2 },
        { title: "Sushi", image: Images.sushi, addToCart: false, index: 3 },
        { title: "Salad", image: Images.salad, addToCart: false, index: 4 },
      ],

      foodItemCategories: [
        {
          id: 1,
          title: "Large Pizza",
          time: "18-26",
          rating: 4.7,
          name: "Pizza",
          image: Images.pizza2,
          price: 15.54,
          detail: "Pizza with tikka flavor, extra cheese",
          cal: 225.2,
          cartStatus: false,
        },
        {
          id: 2,
          title: "Chicken Burger",
          time: "23-30",
          rating: 4.7,
          name: "burgers",
          image: Images.chickenBurger,
          price: 12.5,
          detail: "Burger with broast chicken, extra cheese",
          cal: 345.2,
          cartStatus: false,
        },
      ],
    };
  }

  renderFoodsCategory = ({ item, index }) => {
    return (
      <View
        style={{
          width: 75,
          height: 110,
          backgroundColor: "green",
          marginHorizontal: 10,
          borderRadius: 50,
          alignItems: "center",
          backgroundColor: item.title == "Burgers" ? "orange" : "#fff",
          elevation: 3,
        }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
              item.title == "Burgers" ? "#fff" : Colors.Secondary,
            marginTop: 8,
          }}
        >
          <Image
            source={item.image}
            style={{ width: 35, height: 35, resizeMode: "contain" }}
          />
        </View>

        <Text
          style={{
            color: item.title == "Burgers" ? "#fff" : "#000",
            fontWeight: "bold",
            paddingTop: 5,
          }}
        >
          {item.title}
        </Text>
      </View>
    );
  };

  AddToCart = (item, index) => {
    this.props.AddToCart([...this.props.FoodItem, item]);
    // AsyncStorage.setItem("item", JSON.stringify(item));
    if (!item.cartStatus) {
      let updateItem = [...this.state.foodItemCategories];
      let cartUpdate = { ...item, cartStatus: true };
      updateItem.splice(index, 1, cartUpdate);
      this.setState({
        foodItemCategories: updateItem,
      });
    }
  };

  removeFromCart = (item, index) => {
    if (item.cartStatus) {
      let updateItem = [...this.state.foodItemCategories];
      let cartUpdate = { ...item, cartStatus: false };
      updateItem.splice(index, 1, cartUpdate);
      this.setState({
        foodItemCategories: updateItem,
      });
    }

    this.props.RemoveToCart([
      this.props.FoodItem.map((cartItem, cartIndex) => {
        if (cartItem.id === item.id) {
          this.props.FoodItem.splice(cartIndex, 1);
        }
      }),
    ]);
  };

  renderfoodItemCategories = ({ item, index }) => {
    return (
      <View style={{ width: width * 0.9, alignSelf: "center" }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("FoodDetail", { item })}
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
            <TouchableOpacity onPress={() => this.AddToCart(item, index)}>
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
            <TouchableOpacity onPress={() => this.removeFromCart(item, index)}>
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
    );
  };

  render() {
    console.warn(this.props.FoodItem);
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Header
          leftIcon={() => <Entypo name="location" size={22} color="#000" />}
          rigthIcon={() => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Cart")}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "red",
                  borderRadius: 50,
                }}
              >
                <Text> {this.props.FoodItem.length}</Text>
              </View>
              <FontAwesome name="shopping-basket" size={20} />
            </TouchableOpacity>
          )}
        />

        <View
          style={{ padding: 20, minWidth: width * 0.4, maxWidth: width * 0.5 }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            Main Categories
          </Text>
        </View>

        <View
          style={{
            height: 120,
          }}
        >
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ alignItems: "center" }}
            data={this.state.foodCategory}
            renderItem={this.renderFoodsCategory}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.foodItemCategories}
            renderItem={this.renderfoodItemCategories}
            extraData={this.state.foodItemCategories}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  FoodItem: state.cartItems,
});

const mapDispatchToProps = (dispatch) => ({
  AddToCart: (item) => dispatch({ type: "ADD_TO_CART", payload: item }),
  RemoveToCart: (item) => dispatch({ type: "REMOVE_FROM_CART", payload: item }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
