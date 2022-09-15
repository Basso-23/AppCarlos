import React, { useState, useEffect, useRef } from 'react';
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

function Circulos() {
  const [posts, setPosts] = useState([]);

  const [state, setState] = useState({
    web: 'Web',
  });

  useEffect(() => {
    let prueba = readTEXTfile();
    prueba
      .then((value) => {
        //state.language = value;
        if (value == 'chino') {
          setState({
            ...state,
            web: '网络',
          });
        }
        console.log('leido en nini restaurante: ' + state.banner);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log('leido FUERA en mini restauranter: ' + state.banner);
  }, []);

  useEffect(() => {
    prueba
      .then((value) => {
        language = value;
        axios
          .get(
            'https://bmacademiaonline.com/payaproyecto3/shops.php?lang=' +
              language
          )
          .then((res) => {
            setPosts(res.data);
          });
      })
      .catch((err) => {
        setPosts('ERROR');
      });
  }, []);
  let prueba = readTEXTfile();

  const navigation = useNavigation();

  //AutoScroll
  const scrollViewRef = useRef();

  let der = 0;
  let izq = 0;

  setInterval(() => {
    der = der + 200;
    if (der > 500) {
      izq = der;
      der = 0;
    }
    scrollViewRef.current?.scrollTo({ x: der, y: izq, animated: true });
  }, 2000);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        snapToAlignment="center"
        decelerationRate="fast"
        ref={scrollViewRef}>
        {posts.map((section) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(state.web, { url: section.content[0].url })
            }>
            <ImageBackground
              source={require('./yellow1Background.png')}
              style={styles.background}>
              <Image
                style={{ height: 85, width: 85 }}
                source={{ uri: section.content[0].image }}
              />
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

let dimensions = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    width: dimensions - 10,
    height: 84,
    marginTop: 10,
    marginLeft: 5,
  },

  background: {
    marginLeft: -10,
    height: 100,
    width: 105,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Circulos;
