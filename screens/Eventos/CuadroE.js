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
import Header from '../Inicio/HeaderBlack';

function CuadroE() {
  const [posts, setPosts] = useState([]);

  let prueba = readTEXTfile();

  useEffect(() => {
    prueba
      .then((value) => {
        language = value;
        axios
          .get(
            'https://bmacademiaonline.com/payaproyecto3/restaurantes.php?lang=' +
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

  const navigation = useNavigation();

  return (
    <>
      <Header />
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.leftSize}>
            <View style={styles.leftImages}>
              {posts.map((section) => (
                <TouchableOpacity
                  style={{
                    height: '100%',
                    width: '100%',
                    marginBottom: 90,
                    borderRadius: 10,
                  }}>
                  <View style={styles.leftImages}>
                    <ImageBackground
                      source={{ uri: section.content[0].image }}
                      style={styles.imagenes}>
                      <View style={styles.childView}>
                        <View
                          style={{
                            marginTop: 5,
                            marginRight: 10,
                            borderRadius: 4,
                            alignSelf: 'baseline',
                          }}></View>

                        <View
                          style={{
                            marginTop: 5,
                            marginRight: 10,
                            borderRadius: 4,
                            alignSelf: 'baseline',
                            backgroundColor: '#43d07c',
                          }}>
                          <Text
                            style={{
                              padding: 2.5,
                              fontSize: 12,
                              color: 'white',
                            }}>
                            {' '}
                            {section.content[0].distancia}
                            {' km'}
                          </Text>
                        </View>
                      </View>
                    </ImageBackground>

                    <View style={styles.textContent}>
                      <Text numberOfLines={1} style={styles.cardTitle}>
                        {section.content[0].name}
                      </Text>
                      <Text numberOfLines={1} style={styles.cardDescription}>
                        1 diciembre, 2021 - Mie 12:00
                      </Text>
                      <Text numberOfLines={1} style={styles.cardDescription}>
                        Los Años Locos, San Francisco, Panama, Panama,
                        Panama....
                      </Text>
                      <Text numberOfLines={1} style={styles.cardDescription}>
                        0 personas interesadas
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.rightSize}>
            <View style={styles.rightImages}>
              {posts.map((section) => (
                <TouchableOpacity
                  style={{
                    height: '100%',
                    width: '100%',
                    marginBottom: 90,
                    borderRadius: 10,
                  }}>
                  <View style={styles.rightImages}>
                    <ImageBackground
                      source={{ uri: section.content[0].image }}
                      style={styles.imagenes}>
                      <View style={styles.childView}>
                        <View
                          style={{
                            marginTop: 5,
                            marginRight: 10,
                            borderRadius: 4,
                            alignSelf: 'baseline',
                          }}></View>

                        <View
                          style={{
                            marginTop: 5,
                            marginRight: 10,
                            borderRadius: 4,
                            alignSelf: 'baseline',
                            backgroundColor: '#43d07c',
                          }}>
                          <Text
                            style={{
                              padding: 2.5,
                              fontSize: 12,
                              color: 'white',
                            }}>
                            {' '}
                            {section.content[0].distancia}
                            {' km'}
                          </Text>
                        </View>
                      </View>
                    </ImageBackground>
                    <View style={styles.textContent}>
                      <Text numberOfLines={1} style={styles.cardTitle}>
                        {section.content[0].name}
                      </Text>
                      <Text numberOfLines={1} style={styles.cardDescription}>
                        1 diciembre, 2021 - Mie 12:00
                      </Text>
                      <Text numberOfLines={1} style={styles.cardDescription}>
                        Los Años Locos, San Francisco, Panama, Panama,
                        Panama....
                      </Text>
                      <Text numberOfLines={1} style={styles.cardDescription}>
                        0 personas interesadas
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

let dimensionsH = Dimensions.get('window').height;
let dimensionsW = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
    height: dimensionsH,
    width: dimensionsW,
  },

  leftSize: {
    height: dimensionsH,
    width: dimensionsW / 2,
    alignItems: 'center',
  },

  rightSize: {
    height: dimensionsH,
    width: dimensionsW / 2,
    alignItems: 'center',
  },

  leftImages: {
    height: 100,
    width: '95%',
    marginLeft: 2,
    marginTop: 10,
    marginBottom: 80,
  },

  rightImages: {
    height: 100,
    width: '95%',
    marginBottom: 80,
    marginRight: 2,
    marginTop: 10,
  },

  imagenes: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },

  textContent: {
    paddingTop: 5,
    height: 50,
    width: '100%',
    marginLeft: 10,
  },

  cardDescription: {
    fontSize: 12,
    color: '#444',
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  childView: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default CuadroE;
