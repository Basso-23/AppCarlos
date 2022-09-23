import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground, Linking, Button, Dimensions } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import {firebase} from "../../../../config"

const profile = <Icon name="user" size={20} color="#475272"/>;
const share = <Icon name="share-2" size={20} color="#475272"/>;
const file = <Icon name="file-text" size={20} color="#475272"/>;
const edit = <Icon name="edit" size={25} color="white"/>;

let dimensionsW = Dimensions.get('window').width;
let dimensionsH = Dimensions.get('window').height;

const Profile = () => {
  const [name, setName] = useState("");
  const navigation = useNavigation()

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
        <View style={styles.bgContainer}>
            <ImageBackground style={{ width: "100%", height: "100%", justifyContent:"flex-end"}} source={require("../bgDefault.png")}>
            <TouchableOpacity style={styles.button}
                onPress={()=> navigation.navigate("EditarPerfil")}>
                <Text style={styles.icons2}>{edit}</Text>
              </TouchableOpacity>
                <View style={styles.photoAndText}>
                    <View style={styles.photoUser}>
                        <Image style={{ width: "100%", height: "100%", borderRadius:5, resizeMode:"contain"}}
                            source={require("../userDefault.png")}
                        />
                    </View>
                    <View style={styles.photoText}>
                        <Text style={styles.userText}>{name.name}</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>

        <View style={styles.infoContainer}>

            <View style={styles.infoTitle}>
                <Text style={styles.icons}>{profile}</Text>
                <Text style={styles.iconsText}>PERFIL</Text>
            </View>
            <View style={styles.infoDescpription}>
            
            </View>

            <View style={styles.infoTitle}>
                <Text style={styles.icons}>{share}</Text>
                <Text style={styles.iconsText}>REDES</Text>
            </View>
            <View style={styles.infoDescpription}>
            
            </View>

            <View style={styles.infoTitle}>
                <Text style={styles.icons}>{file}</Text>
                <Text style={styles.iconsText}>INFORMACION BASICA</Text>
            </View>
            <View style={styles.infoDescpription}>
            
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
  bgContainer: {
    width: dimensionsW,
    height: dimensionsH/2.5,
    marginBottom:10
  },
  photoAndText: {
    width: "100%",
    height: "30%",
    marginBottom:5,
    flexDirection:"row",
  },
  photoUser: {
    height:"100%",
    width:"25%",
    padding:10
  },
  photoText: {
    height:"100%",
    width:"25%",
    justifyContent:"center"
  },
  userText: {
    color:"white",
    fontWeight:"bold"
  },
  infoContainer: {
    width: "100%",
    height: "100%",
    alignItems:"center"
  },
  infoTitle: {
    width: "95%",
    height: "5%",
    borderColor:"#E8E7EC",
    borderWidth:1,
    flexDirection:"row",
    alignItems:"center", 
  },
  infoDescpription: {
    width: "95%",
    height: "5%",
    borderColor:"#E8E7EC",
    borderBottomWidth:1,
    borderRightWidth:1,
    borderLeftWidth:1,
    marginBottom:15
  },
  icons: {
    marginLeft:15,
  },
iconsText: {
    marginLeft:10,
    color:"#475272",
    fontWeight:"bold",
    fontSize:10
  },
  button: {
    width:dimensionsW,
    height: 50,
    bottom:"40%"
  },
  icons2: {
    marginLeft:15,
    left:"85%",
  },
});

export default Profile