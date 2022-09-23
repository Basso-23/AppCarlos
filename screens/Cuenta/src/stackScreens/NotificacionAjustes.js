import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground, Linking, Button, Dimensions } from "react-native";
import React from 'react'
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

let dimensionsW = Dimensions.get('window').width;
let dimensionsH = Dimensions.get('window').height;

const NotificacionAjustes = () => {

  const navigation = useNavigation()
  
  return (
    <View style={styles.container}>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: dimensionsW,
    height: dimensionsH,
    backgroundColor:"white",
  },
});

export default NotificacionAjustes