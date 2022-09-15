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
          <TouchableOpacity style={styles.card}>
            <ImageBackground
              source={{ uri: section.content[0].image }}
              style={styles.cardImage}
              resizeMode="cover">
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
                Los Años Locos, San Francisco, Panama, Panama, Panama....
              </Text>
              <Text numberOfLines={1} style={styles.cardDescription}>
                0 personas interesadas
              </Text>
            </View>
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

    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
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

  childView: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default Map;
