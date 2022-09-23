import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground, Linking, Button, Dimensions } from "react-native";
import React from 'react'
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const right = <Icon name="chevron-right" size={20} color="#475272" />;
const bell= <Icon name="bell" size={20} color="#475272" />;
const edit= <Icon name="edit" size={20} color="#475272" />;

let dimensionsW = Dimensions.get('window').width;
let dimensionsH = Dimensions.get('window').height;

const Ajustes = () => {

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
    <View style={styles.containerOptions}>
            <View style={{height:"100%", width:"90%", zIndex:1}}>

                <TouchableOpacity style={styles.option}
                onPress={()=> navigation.navigate("NotificacionAjustes")}>
                    <Text style={styles.icons}>{bell}</Text>
                    <Text style={styles.iconsText}>Notificaciones Ajustes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}
                onPress={()=> navigation.navigate("EditarPerfil")}>
                    <Text style={styles.icons}>{edit}</Text>
                    <Text style={styles.iconsText}>EditarPerfil</Text>
                </TouchableOpacity>

                
            </View>

            <View style={{height:"100%", width:"10%", zIndex:1}}>

                <TouchableOpacity style={styles.option}
                onPress={()=> navigation.navigate("NotificacionAjustes")}>
                  <Text style={styles.right}>{right}</Text>
                </TouchableOpacity> 

                <TouchableOpacity style={styles.option}
                onPress={()=> navigation.navigate("EditarPerfil")}>
                < Text style={styles.right}>{right}</Text>
                </TouchableOpacity>

                
            </View>
        </View>  
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: dimensionsW,
    height: dimensionsH,
    backgroundColor:"white",
  },
  containerOptions: {
    width:dimensionsW,
    height: dimensionsH,
    
    flexDirection:"row",
  },
right: {
    marginLeft:"2%"
  },
firstOption: {
    flexDirection:"row",
    alignItems:"center", 
    borderBottomWidth:1,
    borderTopWidth:1,
    borderColor:"#E8E7EC",
    width:dimensionsW,
    height: dimensionsH/13,
    backgroundColor:"white",
  },
option: {
    borderBottomWidth:1,
    borderColor:"#E8E7EC",
    width:dimensionsW,
    height: dimensionsH/13,
    backgroundColor:"white",
    flexDirection:"row",
    alignItems: "center", 
  },
icons: {
    marginLeft:15,
  },
iconsText: {
    marginLeft:25,
    color:"#475272",
  },
});

export default Ajustes