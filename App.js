import React from "react";
import {
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  View,
  ColorPropType,
} from "react-native";
import store from "./src/Store/index";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Categories, Search, FoodDetail, Cart } from "./src/Screens";
import { CustomTabButton } from "./src/Components";
import { Images, Colors } from "./src/Config";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

const BottomTab = createBottomTabNavigator();
const OtherScreenStack = createStackNavigator();

const BottomTabs = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Category"
      tabBarOptions={{
        showLabel: false,
        style: {
          height: 50,
        },
      }}
    >
      <BottomTab.Screen
        name="Category"
        component={Categories}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={Images.spoon}
              style={{
                width: 30,
                height: 30,
                resizeMode: "contain",
                tintColor: focused ? Colors.Primary : Colors.Secondary,
              }}
            />
          ),
          tabBarButton: (props) => <CustomTabButton {...props} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={Images.search}
              style={{
                width: 30,
                height: 30,
                resizeMode: "contain",
                tintColor: focused ? Colors.Primary : Colors.Secondary,
              }}
            />
          ),
          tabBarButton: (props) => <CustomTabButton {...props} />,
        }}
      />
      <BottomTab.Screen
        name="Like"
        component={Categories}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="heart"
              size={26}
              color={focused ? Colors.Primary : Colors.Secondary}
            />
          ),
          tabBarButton: (props) => <CustomTabButton {...props} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Categories}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-sharp"
              size={26}
              color={focused ? Colors.Primary : Colors.Secondary}
            />
          ),
          tabBarButton: (props) => <CustomTabButton {...props} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

const OtherScreens = () => {
  return (
    <OtherScreenStack.Navigator>
      <OtherScreenStack.Screen
        name="Tabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <OtherScreenStack.Screen
        name="FoodDetail"
        component={FoodDetail}
        options={{ headerShown: false }}
      />
      <OtherScreenStack.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      />
    </OtherScreenStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <OtherScreens />
        <StatusBar backgroundColor="#fff" />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
