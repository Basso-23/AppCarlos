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

function Restaurantes1() {
  const [posts, setPosts] = useState([]);

  const [state, setState] = useState({
    banner: 'Abierto',
    url: null,
    area1: 'Barrio Chino',
    area2: 'Kosher Alley',
    area3: 'Green Site',
    ver: 'Ver+',
    inicio: 'Inicio',
    negocios: 'Negocios',
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
            banner: '打开',
            area1: '唐人街',

            area2: '唐人街',
            area3: '唐人街',
            ver: '看 +',
            inicio: '家',
            negocios: '餐馆',
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
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.tituloText}>{state.area1}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{state.ver}</Text>
        </TouchableOpacity>
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
                navigation.navigate(state.web, { url: section.content[0].url })
              }>
              <ImageBackground
                imageStyle={{ borderRadius: 6 }}
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
                      <Text style={styles.imageText}> {state.banner} </Text>
                    </View>

                    <View
                      style={{
                        marginTop: 5,
                        marginRight: 10,
                        borderRadius: 4,
                        alignSelf: 'baseline',
                      }}>
                      <Image
                        style={{ width: 26, height: 26 }}
                        source={require('./check1.png')}
                      />
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
        </ScrollView>
      </View>
    </View>
  );
}

let dimensions = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 5,
  },

  imagenes: {
    height: 115,
    flex: 1,
    flexDirection: 'column',
    width: 200,
    justifyContent: 'center',
    resizeMode: 'stretch',
    marginLeft: 5,
    marginRight: 5,
  },

  imageText: {
    fontSize: 12,
    color: '#fedc00',
  },

  nameText: {
    fontSize: 12,
    color: 'white',
  },

  child: {
    flex: 1,
    borderRadius: 8,
    width: 200,
    height: 115,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  childView: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  childView2: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 25,

    flexDirection: 'row',
  },

  childView3: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 18,
    flexDirection: 'column',
  },

  imagenesContainer: {
    marginLeft: 0,
    flexDirection: 'row',
    width: dimensions,
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

  button: {
    backgroundColor: 'black',
    height: 30,
    width: 100,
    borderRadius: 5,
    alignContent: 'center',
    justifyContent: 'center',
    left: '75%',
  },

  buttonText: {
    fontWeight: 'bold',
    marginLeft: 35,
    fontSize: 14,
    color: 'white',
    width: dimensions,
  },
});

export default Restaurantes1;
