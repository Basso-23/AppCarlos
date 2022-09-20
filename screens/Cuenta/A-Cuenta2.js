import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StatusBar,
  Dimensions,
} from 'react-native';

import { firebase } from "../../config"

const Cuenta2 = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    firebase.firestore().collection("users")
    .doc(firebase.auth().currentUser.uid).get()
    .then((snapshot)=> {
      if (snapshot.exists){
        setName(snapshot.data())
      }
      else{
        console.log("El usuario no existe")
      }
    })
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{fontSize:20, fontWeight:"bold"}}>
        Hola, {name.name}
      </Text>

      <TouchableOpacity
      onPress={()=> {firebase.auth().signOut()}}
      style={styles.button}
      >
      <Text style={{fontSize:22, fontWeight:"bold", color:"white", marginTop:20}}>
        Cerrar sesion
      </Text> 
      </TouchableOpacity>

    </View>
  )
}
export default Cuenta2;

const styles = StyleSheet.create({
  container: {
    
    alignItems:"center",
    marginTop:100,
  },

  button: {
    alignItems:"center",
    marginTop:50,
    height:75,
    width:200,
    backgroundColor:"black",
    borderRadius:25,
  },
});
