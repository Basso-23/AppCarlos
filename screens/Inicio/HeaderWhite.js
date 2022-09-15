import React, { useState, useEffect } from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import * as Updates from 'expo-updates';
import axios from 'axios';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  addMultipleGifs,
  deleteAllGifs,
  getSingleGif,
  saveTEXTfile,
  readTEXTfile,
} from '../TextFile';

function Header() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('https://tamitut.com/PAYA/carros/shops.php')
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        setPosts('ERROR');
      });
  }, []);

  let dimensionsW = Dimensions.get('window').width;
  let dimensionsH = Dimensions.get('window').height;
  const navigation = useNavigation();

  const chino = 'Header-chino.png';

  const restartPress = () => {
    return Updates.reloadAsync();
  };
  const changeChino = () => {
    return (async () => {
      await saveTEXTfile('chino');
    })();
  };

  const papaMama = () => {
    return changeChino(), restartPress();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            style={{
              width: 70,
              height: 50,
              marginLeft: 15,
              resizeMode: 'contain',
            }}
            source={require('./Header-logo.png')}
          />
        </TouchableOpacity>

        
        <TouchableOpacity
        //Reinicia el app y lo pone en español
          onPress={() => {
            (async () => {
              await saveTEXTfile('latino');
            })();
            Updates.checkForUpdateAsync();//Chekea por el ultimo update del codigo
            Updates.fetchUpdateAsync();//Descarga el ultimo update del codigo
            Updates.reloadAsync();//Reinicia el app y carga el ultimo update guardado
          }}>
        
          <Image
            style={{
              marginLeft: 12,
              width: 40,
              height: 50,
              resizeMode: 'contain',
              borderRadius: 15,
            }}
            source={require('./Header-spain.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
        //Reinicia el app y lo pone en chino
          onPress={() => {
            (async () => {await saveTEXTfile('chino');})();
            Updates.checkForUpdateAsync();//Chekea por el ultimo update del codigo
            Updates.fetchUpdateAsync();//Descarga el ultimo update del codigo
            Updates.reloadAsync();//Reinicia el app y carga el ultimo update guardado
          }}>
          <Image
            style={{
              marginLeft: 12,
              width: 40,
              height: 50,
              resizeMode: 'contain',
              borderRadius: 15,
            }}
            source={require('./Header-chino.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: dimensionsW - 225,
            height: 30,
            backgroundColor: '#e5e5e5',
            borderRadius: 35,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 20,
          }}>
          <Image
            style={{ width: 70, height: 18, resizeMode: 'contain' }}
            source={require('./lupe.png')}
          />
          <Text style={{ fontSize: 13, color: 'white', right: 22 }}>
            Buscar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 85,
    width: 400,
    backgroundColor: 'white',
  },

  header: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Header;
