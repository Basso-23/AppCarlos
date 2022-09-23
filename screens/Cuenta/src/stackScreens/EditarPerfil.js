import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground, Linking, Button, Dimensions, TextInput} from "react-native";
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import {firebase} from "../../../../config"

let dimensionsW = Dimensions.get('window').width;
let dimensionsH = Dimensions.get('window').height;

const profile = <Icon name="user" size={18} color="black"/>;
const map = <Icon name="map" size={18} color="black"/>;
const activity = <Icon name="activity" size={18} color="black"/>;

const EditarPerfil = () => {
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

  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [mostrar, setMostrar] = useState();
  const [email, setEmail] = useState();
  const [pocision, setPocision] = useState();
  const [presentate, setPresentate] = useState();

  const [direccion, setDireccion] = useState();
  const [telefono, setTelefono] = useState();
  const [web, setWeb] = useState();
  const [redes, setRedes] = useState();

  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  return (
    <ScrollView>
    <View style={styles.container1}>

      <View style={styles.sectionContainer}>

        <View style={styles.statusTitle}>
          <Text style={styles.icons}>{profile}</Text>
          <Text style={styles.iconsText}>INFORMACION BASICA</Text>
        </View>

        <View style={styles.descriptionContainer}>

        <Text style={styles.titleInput}>Nombre</Text>
          <View style={styles.inputContainer}>
            <TextInput
              labelValue={nombre}
              onChangeText={(nombre) => setNombre(nombre)}
              placeholder=""
              placeholderTextColor="#61616d"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              numberOfLines={1}
            />
          </View> 

          <Text style={styles.titleInput}>Apellido</Text>
          <View style={styles.inputContainer}>
            <TextInput
              labelValue={apellido}
              onChangeText={(apellido) => setApellido(apellido)}
              placeholder=""
              placeholderTextColor="#61616d"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              numberOfLines={1}
            />
          </View>  

          <Text style={styles.titleInput}>Nombre para mostrar</Text>
          <View style={styles.inputContainer}>
            <TextInput
              labelValue={mostrar}
              onChangeText={(mostrar) => setMostrar(mostrar)}
              placeholder={name.name}
              placeholderTextColor="#61616d"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              numberOfLines={1}
            />
          </View> 

          <Text style={{color:"#61616d", top:10, zIndex:1, fontSize:12, marginBottom:5}}>Avatar</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>Cargar Foto</Text>
          </View>  

          <Text style={{color:"#61616d", top:10, zIndex:1, fontSize:12, marginBottom:5}}>Imagen de Portada</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>Cargar Foto</Text>
          </View> 

          <Text style={styles.titleInput}>Email</Text>
          <View style={styles.inputContainer}>
            <TextInput
              labelValue={email}
              onChangeText={(email) => setEmail(email)}
              placeholder=""
              placeholderTextColor="#61616d"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              numberOfLines={1}
            />
          </View>

          <Text style={styles.titleInput}>Pocision</Text>
          <View style={styles.inputContainer}>
            <TextInput
              labelValue={pocision}
              onChangeText={(pocision) => setPocision(pocision)}
              placeholder=""
              placeholderTextColor="#61616d"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              numberOfLines={1}
            />
          </View>

          <Text style={styles.titleInput}>Presentate</Text>
          <View style={styles.inputContainer}>
            <TextInput
              labelValue={presentate}
              onChangeText={(presentate) => setPresentate(presentate)}
              placeholder=""
              placeholderTextColor="#61616d"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              numberOfLines={1}
            />
          </View>

        </View>
      </View>

      <View style={styles.sectionContainer}>

        <View style={styles.statusTitle}>
          <Text style={styles.icons}>{map}</Text>
          <Text style={styles.iconsText}>SEGUIR Y CONTACTAR</Text>
        </View>

        <View style={styles.descriptionContainer}> 
          <Text style={styles.titleInput}>Direccion</Text>
          <View style={styles.inputContainer}>
            <TextInput
              labelValue={direccion}
              onChangeText={(direccion) => setDireccion(direccion)}
              placeholder=""
              placeholderTextColor="#61616d"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              numberOfLines={1}
            />
          </View> 

          <Text style={styles.titleInput}>Telefono</Text>
          <View style={styles.inputContainer}>
            <TextInput
              labelValue={telefono}
              onChangeText={(telefono) => setTelefono(telefono)}
              placeholder=""
              placeholderTextColor="#61616d"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              numberOfLines={1}
            />
          </View>

          <Text style={styles.titleInput}>Sitio Web</Text>
          <View style={styles.inputContainer}>
            <TextInput
              labelValue={web}
              onChangeText={(web) => setWeb(web)}
              placeholder=""
              placeholderTextColor="#61616d"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              numberOfLines={1}
            />
          </View>

          <Text style={styles.titleInput}>Redes</Text>
          <View style={styles.inputContainer}>
            <TextInput
              labelValue={redes}
              onChangeText={(redes) => setRedes(redes)}
              placeholder=""
              placeholderTextColor="#61616d"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              numberOfLines={1}
            />
          </View>

        </View>
      </View>

      <View style={styles.sectionContainer}>

        <View style={styles.statusTitle}>
          <Text style={styles.icons}>{activity}</Text>
          <Text style={styles.iconsText}>CAMBIO DE CONTRASEÑA</Text>
        </View>

        <View style={styles.descriptionContainer}> 
          <View style={styles.inputContainer}>
            <TextInput
              labelValue={currentPassword}
              onChangeText={(currentPassword) => setCurrentPassword(currentPassword)}
              placeholder="Contraseña actual"
              placeholderTextColor="#61616d"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              numberOfLines={1}
            />
          </View> 

          <View style={styles.inputContainer}>
            <TextInput
              labelValue={newPassword}
              onChangeText={(newPassword) => setNewPassword(newPassword)}
              placeholder="Nueva Contraseña"
              placeholderTextColor="#61616d"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              numberOfLines={1}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              labelValue={confirmPassword}
              onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
              placeholder="Confirmar Contraseña"
              placeholderTextColor="#61616d"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              numberOfLines={1}
            />
          </View>

        </View>
      </View>

      <View style={styles.saveButton}>
            <TouchableOpacity
            onPress={()=> loginUser(user, password)}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2.5,
                width: '100%',
                height: dimensionsH / 16,
                backgroundColor: 'black',
                marginBottom: 28,
                marginTop: 20,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                Guardar Cambios
              </Text>
            </TouchableOpacity>
          </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container1: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  sectionContainer: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 0,
    width: '95%',
    borderWidth: 1.1,
    borderColor: '#e6e6e6',
  },

  statusTitle: {
    alignItems: 'center',
    borderColor: '#e6e6e6',
    width: '100%',
    borderBottomWidth: 1.1,
    flexDirection: 'row',
    padding: 15,
  },
  descriptionContainer: {
    width: '95%',
    flexDirection: 'column',
    padding: 15,
  },
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: dimensionsH / 20,
    borderColor: '#dddddf',
    borderBottomWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titleInput: {
    color:"#61616d", 
    top:10, 
    zIndex:1
  },
  input: {
    paddingBottom: 5,
    paddingTop: 5,
    flex: 1,
    fontSize: 14,
    color:"#475272",
  },
  saveButton: {
    width:"95%",
    marginBottom:25
  },
  iconsText: {
    marginLeft:5,
    color:"#252C3F",
    fontWeight:"bold",
    fontSize:9.5
  },
});

export default EditarPerfil