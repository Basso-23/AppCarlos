import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Linking,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import axios from 'axios';
import {
  addMultipleGifs,
  deleteAllGifs,
  getSingleGif,
  saveTEXTfile,
  readTEXTfile,
} from '../TextFile';

function Ofertas() {
  const [posts, setPosts] = useState([]);

  

  let prueba = readTEXTfile();

  useEffect(() => {
        prueba.then((value) => {
        language = value;
        axios
          .get('https://bmacademiaonline.com/payaproyecto3/restaurantes.php?lang=' +language)
          .then((res) => {
            setPosts(res.data);
          });
      })
      .catch((err) => {
        setPosts('ERROR');
      });
  }, []);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.tituloText}>Ofertas</Text>
      </View>

      <View style={styles.imagenesContainer}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          snapToAlignment="center"
          decelerationRate="fast">
          {posts.map((section) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Eventos')
              }>
              <Image
                source={{ uri: section.content[0].image }}
                style={styles.imagenes}
              />
              <View style={styles.decripContainer}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'arial',
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}>
                  Envia tus pedidos donde quieras
                </Text>
                <Text
                  style={{ color: 'gray', fontFamily: 'arial', fontSize: 10 }}>
                  19 de noviembre, 2021 - Vie 08:00 AM
                </Text>
                <Text
                  style={{ color: 'gray', fontFamily: 'arial', fontSize: 10 }}>
                  0 Favorito
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

let dimensions = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 15,
    width: dimensions-10,
  },

  imagenes: {
    height: 125,
    width: 204,
    marginLeft: 5,
    marginRight: 5,
    borderRadius:5,
  },

  imagenesContainer: {
    flexDirection: 'row',
    height: 200,
  },

  tituloText: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'arial',
    marginBottom: 15,
    color: '#252a3e',
  },

  textContainer: {
    marginLeft: 12,
    flexDirection: 'row',
  },

  decripContainer: {
    marginTop: 8,
    marginLeft: 15,
  },
});

export default Ofertas;
