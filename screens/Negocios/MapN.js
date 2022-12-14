import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
  Platform,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import {
  addMultipleGifs,
  deleteAllGifs,
  getSingleGif,
  saveTEXTfile,
  readTEXTfile,
} from '../TextFile';

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const Map = () => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  const [state, setState] = useState({
    banner: 'Abierto',
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

  const [stat, setStat] = React.useState({
    elements: [],
    region: {
      latitude: 9.008749289807488,
      longitude: -79.50704440606164,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  });

  //Animacion con el mapa
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    axios
      .get(
        'https://bmacademiaonline.com/payaproyecto3/restaurantes.php?lang=' +
          language
      )
      .then((response) => {
        setStat({
          ...stat,
          elements: response.data,
        });
      });

    const { contenidos } = stat.elements;

    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= stat.elements.length) {
        index = stat.elements.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index && stat.elements.length > 0) {
          mapIndex = index;
          const { coordinates } = stat.elements[index].content[0];
          _map.current.animateToRegion(
            {
              ...coordinates,
              latitudeDelta: 0.04864195044303443,
              longitudeDelta: 0.040142817690068,
            },
            350
          );
        }
      }, 10);
    });
  });
  //Animacion con el mapa

  //Animacion del marker
  const interpolations = stat.elements.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];
    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });
    return { scale };
  });
  //Animacion del marker

  //Animacion del onPress del marker
  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;
    let x = markerID * CARD_WIDTH + markerID * 20;

    _scrollView.current.getNode().scrollTo({ x: x, y: 0, animated: true });
  };
  //Animacion del onPress del marker

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={stat.region}
        style={styles.container}
        provider={PROVIDER_GOOGLE}>
        {stat.elements.map((element, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapView.Marker
              key={index}
              coordinate={element.content[0].coordinates}
              title={element.content[0].name}
              description={'restaurante'}
              image={element.content[0].mini}
            />
          );
        })}
      </MapView>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        pagingEnabled
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        decelerationRate="fast"
        //Centrar el mapa en el scroll
        contentInset={{
          top: 0,
          bottom: 0,
          left: SPACING_FOR_CARD_INSET,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
        }}
        //Centrar el mapa en el scroll
        //Animacion con el mapa
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        //Animacion con el mapa
      >
        {posts.map((section) => (
          <TouchableOpacity 
          style={styles.card}
          onPress={() =>
            navigation.navigate("Restaurante", {
              name: section.content[0].name,
              image: section.content[0].image,
              mini: section.content[0].mini,
              description: section.content[0].description,
              id: section.content[0].id,
              coordinates: section.content[0].coordinates,
              telefono: section.content[0].telefono,
              share_link: section.content[0].share_link,
              ubicacion: section.content[0].ubicacion,
            })
          }
          
          >
            <ImageBackground
              source={{ uri: section.content[0].image }}
              style={styles.cardImage}
              resizeMode="cover">
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
                        flexDirection: 'row',
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
                      top: 25,
                    }}
                    source={require('./star-rank.png')}
                  />
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    width: 35,
    height: 35,
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    elevation: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT / 1.5,
    width: CARD_WIDTH,
    overflow: 'hidden',
    marginBottom: 25,
    borderRadius: 10,
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },

  textContent: {
    flex: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },

  child: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  signIn: {
    width: '90%',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  imageText: {
    fontSize: 12,
    color: '#fedc00',
  },

  nameText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
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

export default Map;
