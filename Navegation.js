import React, { useState, useEffect, useRef, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
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
} from 'react-native';
import {
  addMultipleGifs,
  deleteAllGifs,
  getSingleGif,
  saveTEXTfile,
  readTEXTfile,
} from './screens/TextFile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Header from './screens/Inicio/HeaderWhite';
import { Dimensions } from 'react-native';
import { firebase } from "./config"
import { useNavigation } from "@react-navigation/native";

//screens
import Inicio from './screens/Inicio/A-Inicio';
import Negocios from './screens/Negocios/A-Negocios';
import Web from './screens/Web/A-Web';
import Cuenta from './screens/Cuenta/A-Cuenta';
import Eventos from './screens/Eventos/A-Eventos';
import Cuenta2 from './screens/Cuenta/A-Cuenta2';

//Stacks
import EventosStacks from "./screens/Eventos/EventosStack";
import NegociosStack from "./screens/Negocios/NegociosStack";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
let dimensionsH = Dimensions.get('window').height;


function Nav() {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

  function onAuthStateChanged(user) {
    setUser(user)
    if (initializing) setInitializing(false)
  }
  useEffect(() => {
    const suscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged)
    return suscriber
  }, []);

  let [state, setState] = useState({
    url: null,
    inicio: 'Inicio',
    negocios: 'Negocios',
    web: 'Web',
  });

  const navigation = useNavigation();
 

  useEffect(() => {
    let prueba = readTEXTfile();
    prueba.then((value) => {
      state.language = value;
      if (value == 'chino') {
        setState({
          ...state,
          inicio: '家',
          negocios: '餐馆',
          web: '网络',
        });
      }
    });
  }, []);

  const goToMap = () => {
    navigation.navigate(state.negocios, { screen: "Negocio" });
  };

  if (initializing) return null

if (!user){
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { height: 75 },
        tabBarActiveTintColor: '#ffcc00',
        tabBarStyle: {
          backgroundColor: 'black',
          height: dimensionsH / 14,
          paddingTop: 0,
          borderTopWidth: 0,
        },
        headerTitle: '',
      }}>
      <Tab.Screen
        name={state.inicio}
        component={Inicio}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={22} />
          ),
          headerBackground: () => <Header />,
        }}
      />

      <Tab.Screen
        name={state.negocios}
        component={NegociosStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={17} color={color} />
          ),
          headerShown: false,
          tabBarButton: (props) => (
            <TouchableOpacity {...props} onPress={goToMap} />
          ),
        }}
      />

      <Tab.Screen
        initialParams={{ url: 'https://pidepaya.com/' }}
        name={state.web}
        component={Web}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="bookmark" size={20} color={color} />
          ),
          headerBackground: () => <Header />,
        }}
      />

      <Tab.Screen
        name="Eventos"
        component={EventosStacks}
        options={{
          tabBarIcon: ({ color, size }) => (
            < FontAwesome name="ticket" size={20} color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Cuenta"
        component={Cuenta}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={20} color={color} />
          ),
          headerBackground: () => <Header />,
        }}
      />
    </Tab.Navigator>
  );
}

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { height: 75 },
        tabBarActiveTintColor: '#ffcc00',
        tabBarStyle: {
          backgroundColor: 'black',
          height: dimensionsH / 14,
          paddingTop: 0,
          borderTopWidth: 0,
        },
        headerTitle: '',
      }}>
      <Tab.Screen
        name={state.inicio}
        component={Inicio}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={22} />
          ),
          headerBackground: () => <Header />,
        }}
      />

      <Tab.Screen
        name={state.negocios}
        component={NegociosStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={17} color={color} />
          ),
          headerShown: false,
          tabBarButton: (props) => (
            <TouchableOpacity {...props} onPress={goToMap} />
          ),
        }}
      />

      <Tab.Screen
        initialParams={{ url: 'https://pidepaya.com/' }}
        name={state.web}
        component={Web}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="bookmark" size={20} color={color} />
          ),
          headerBackground: () => <Header />,
        }}
      />

      <Tab.Screen
        name="Eventos"
        component={EventosStacks}
        options={{
          tabBarIcon: ({ color, size }) => (
            < FontAwesome name="ticket" size={20} color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Cuenta"
        component={Cuenta2}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={20} color={color} />
          ),
          headerShown:false
        }}
      />
    </Tab.Navigator>
  );
}


export default () => {
 
  return (
    <NavigationContainer>
      <Nav />
    </NavigationContainer>
  );
}