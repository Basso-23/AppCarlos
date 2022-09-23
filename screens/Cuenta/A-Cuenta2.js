import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground, Linking, Button, Dimensions } from "react-native";
import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Logged from "./src/stackScreens/Logged";
import Ajustes from './src/stackScreens/Ajustes'
import EditarPerfil from './src/stackScreens/EditarPerfil'
import NotificacionAjustes from './src/stackScreens/NotificacionAjustes'
import Profile from './src/stackScreens/Profile'
import Favoritos from './src/stackScreens/Favoritos'

import HeaderWhite from "../Inicio/HeaderWhite"

let dimensionsW = Dimensions.get('window').width;
let dimensionsH = Dimensions.get('window').height;

const Stack = createStackNavigator();

function Cuenta() {
  return (

   
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>

      <Stack.Screen name="Logged" component={Logged} 
      options={{
        headerBackground: () => <HeaderWhite  />,
        headerTitle:""
      }}/>

      <Stack.Screen name="Profile" component={Profile} 
      options={{
        headerBackground: () => <Profile  />,
        headerTitle:"",
        headerTintColor: 'white',
      }}
      />

      <Stack.Screen name="Favoritos" component={Favoritos} 
      options={{
        title: 'Favoritos',
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontSize:16,
          fontFamily:"Arial"
        },
      }}/>

      <Stack.Screen name="Ajustes" component={Ajustes} 
      options={{
        title: 'Ajustes',
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontSize:16,
          fontFamily:"Arial"
        },
      }}
      />

      <Stack.Screen name="EditarPerfil" component={EditarPerfil} 
      options={{
        title: 'Editar Perfil',
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontSize:16,
          fontFamily:"Arial"
        },
      }}
      />

      <Stack.Screen name="NotificacionAjustes" component={NotificacionAjustes} 
      options={{
        title: 'Notificacion Ajustes',
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontSize:16,
          fontFamily:"Arial"
        },
      }}
      />

    </Stack.Navigator>
  )
}

export default () => {
 
  return (
      <Cuenta/>
  );
}