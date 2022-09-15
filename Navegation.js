import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StatusBar,
  SafeAreaView,
} from "react-native";
import {
  addMultipleGifs,
  deleteAllGifs,
  getSingleGif,
  saveTEXTfile,
  readTEXTfile,
} from "./screens/TextFile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Header from "./screens/Inicio/HeaderWhite";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

//screens
import Inicio from "./screens/Inicio/A-Inicio";
import Web from "./screens/Web/A-Web";
import Cuenta from "./screens/Cuenta/A-Cuenta";
import Eventos from "./screens/Eventos/A-Eventos";
//Stacks
import NegociosStack from "./screens/Negocios/NegociosStack";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

let dimensionsH = Dimensions.get("window").height;

function MyTabs() {
  let [state, setState] = useState({
    url: null,
    inicio: "inicio",
    negocios: "negocios",
    web: "web",
  });
  const navigation = useNavigation();
  const goToMap = () => {
    navigation.navigate("Negocios", { screen: "Negocio" });
  };
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { height: 75 },
        tabBarActiveTintColor: "#fedc00",
        tabBarStyle: {
          backgroundColor: "black",
          height: dimensionsH / 14,
          paddingTop: 0,
          borderTopWidth: 0,
        },
        headerTitle: "",
      }}
      //label de los iconos del BottomTab
      tabBarOptions={{
        labelStyle: { paddingBottom: 0 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Inicio}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={22} />
          ),
          headerBackground: () => <Header />,
        }}
      />

      <Tab.Screen
        name="Negocios"
        component={NegociosStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list" size={17} color={color} />
          ),
          headerShown: false,
          tabBarButton: (props) => (
            <TouchableOpacity {...props} onPress={goToMap} />
          ),
        }}
      />

      <Tab.Screen
        initialParams={{ url: "https://pidepaya.com/" }}
        name="Web"
        component={Web}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bookmark" size={20} color={color} />
          ),
          headerBackground: () => <Header />,
        }}
      />

      <Tab.Screen
        name="Eventos"
        component={Eventos}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="ticket" size={20} color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Cuenta"
        component={Cuenta}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={20} color={color} />
          ),
          headerBackground: () => <Header />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
