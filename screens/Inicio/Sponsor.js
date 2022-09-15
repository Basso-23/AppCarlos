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
import axios from 'axios';
import { Dimensions } from 'react-native';
import {
  addMultipleGifs,
  deleteAllGifs,
  getSingleGif,
  saveTEXTfile,
  readTEXTfile,
} from '../TextFile';

function Sponsor() {
  const [posts, setPosts] = useState([]);

  let prueba = readTEXTfile();

  useEffect(() => {
        prueba.then((value) => {
        language = value;
        axios
          .get('https://tamitut.com/PAYA/carros/sponsors.php?lang=' +language)
          .then((res) => {
            setPosts(res.data);
          });
      })
      .catch((err) => {
        setPosts('ERROR');
      });
  }, []);
  const navigation = useNavigation();

  //AutoScroll
  const scrollViewRef = useRef();

  let der = 0;
  let izq = 0;

  setInterval(() => {
    der = der + 500;
    if (der > 1100) {
      izq = der;
      der = 0;
    }
    scrollViewRef.current?.scrollTo({ x: der, y: izq, animated: true });
  }, 4000);

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
              navigation.navigate('Web', { url: section.content[0].url })
            }>
            <Image
              style={styles.imagenes}
              source={{ uri: section.content[0].image }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

let dimensions = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 0,
    marginLeft: 4,
    marginRight: 8,
    width: dimensions - 15,
  },

  imagenes: {
    justifyContent: 'center',
    alignContent: 'center',
    height: 105,
    flex: 1,
    width: dimensions - 25,
    resizeMode: 'stretch',
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 0,
    marginTop: 5,
    marginBottom: 0,
  },
});

export default Sponsor;
