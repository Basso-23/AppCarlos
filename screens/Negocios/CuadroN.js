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

function CuadroN() {
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

      <View style={styles.container}>
        <View style={styles.leftSize}>
          <View style={styles.leftImages}>
            {posts.map((section) => (
              <TouchableOpacity
                style={{
                  height: '100%',
                  width: '100%',
                  marginBottom: 15,
                  borderRadius: 10,
                }}>
                <ImageBackground
                  source={{ uri: section.content[0].image }}
                  style={styles.imagenes}>
                  <View style={styles.child}>
                    <View style={styles.childView}>
                      <View
                        style={{
                          marginTop: 5,
                          marginLeft: 10,
                          backgroundColor: 'black',
                          borderRadius: 10,
                          alignSelf: 'baseline',
                          height: 20,
                        }}>
                        <Text style={styles.imageText}>
                          {' '}
                          {section.content[0].estado}{' '}
                        </Text>
                      </View>

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
                    </View>

                    <View style={styles.childView2}>
                      <View style={styles.childView3}>
                        <Image
                          style={{
                            marginTop: 5,
                            marginLeft: 10,
                            width: 30,
                            height: 30,
                            resizeMode: 'stretch',
                            paddingLeft: 0,
                          }}
                          source={{ uri: section.content[0].mini }}
                        />
                        <View
                          style={{
                            marginTop: 5,
                            marginLeft: 10,
                            borderRadius: 4,
                            alignSelf: 'baseline',
                          }}>
                          <Text style={styles.nameText}>
                            {' '}
                            {section.content[0].name}{' '}
                          </Text>
                        </View>
                      </View>

                      <Image
                        style={{
                          marginTop: 10,
                          marginRight: 10,
                          width: 25,
                          height: 25,
                          resizeMode: 'stretch',
                          paddingLeft: 0,
                        }}
                        source={require('./star-rank.png')}
                      />
                    </View>
                  </View>
                </ImageBackground>
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
                  marginBottom: 15,
                  borderRadius: 10,
                }}>
                <ImageBackground
                  source={{ uri: section.content[0].image }}
                  style={styles.imagenes}>
                  <View style={styles.child}>
                    <View style={styles.childView}>
                      <View
                        style={{
                          marginTop: 5,
                          marginLeft: 10,
                          backgroundColor: 'black',
                          borderRadius: 10,
                          alignSelf: 'baseline',
                          height: 20,
                        }}>
                        <Text style={styles.imageText}>
                          {' '}
                          {section.content[0].estado}{' '}
                        </Text>
                      </View>

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
                    </View>

                    <View style={styles.childView2}>
                      <View style={styles.childView3}>
                        <Image
                          style={{
                            marginTop: 5,
                            marginLeft: 10,
                            width: 30,
                            height: 30,
                            resizeMode: 'stretch',
                            paddingLeft: 0,
                          }}
                          source={{ uri: section.content[0].mini }}
                        />
                        <View
                          style={{
                            marginTop: 5,
                            marginLeft: 10,
                            borderRadius: 4,
                            alignSelf: 'baseline',
                          }}>
                          <Text style={styles.nameText}>
                            {' '}
                            {section.content[0].name}{' '}
                          </Text>
                        </View>
                      </View>

                      <Image
                        style={{
                          marginTop: 10,
                          marginRight: 10,
                          width: 25,
                          height: 25,
                          resizeMode: 'stretch',
                          paddingLeft: 0,
                        }}
                        source={require('./star-rank.png')}
                      />
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
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
    height: 95,
    width: '90%',
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 25,
  },

  rightImages: {
    height: 95,
    width: '90%',
    marginRight: 10,
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 25,
  },

  child: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    width: '100%',
  },

  imagenes: {
    height: '100%',
    width: '100%',
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },

  imageText: {
    fontSize: 12,
    color: '#fedc00',
  },

  nameText: {
    fontSize: 12,
    color: 'white',
  },

  childView: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  childView2: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 5,

    flexDirection: 'row',
  },

  childView3: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 15,
    flexDirection: 'column',
  },
});

export default CuadroN;
