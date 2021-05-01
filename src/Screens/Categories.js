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
import { FoodCategories } from "../Components/FoodCategoriesFeed";

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

  addToCart = (item, index) => {
    // AsyncStorage.setItem("item", JSON.stringify(item));
    if (!item.cartStatus) {
      let updateItem = [...this.state.foodItemCategories];
      let cartUpdate = { ...item, cartStatus: true };
      updateItem.splice(index, 1, cartUpdate);
      this.setState({
        foodItemCategories: updateItem,
      });
      this.props.AddToCart([...this.props.FoodItem, cartUpdate])
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
      <FoodCategories AddToCart={(item, index) => this.addToCart(item, index)} navigation={this.props.navigation} removeFromCart={(item, index) => this.removeFromCart(item, index)} item={item} index={index} />
    );
  };

  render() {
    // console.warn(this.props.FoodItem[0].cartStatus);
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Header
          leftIcon={() => <Entypo name="location" size={22} color="#000" />}
          rigthIcon={() => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Cart")}
            >
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
