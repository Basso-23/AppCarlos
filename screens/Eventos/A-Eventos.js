import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StatusBar,
  Dimensions,
} from 'react-native';

import Map from './MapE';
import Cuadro from './CuadroE';

const Eventos = () => {
  const [rendering, setRendering] = useState(false);
  let dimensionsH = Dimensions.get('window').height;
  let dimensionsW = Dimensions.get('window').width;

  if (rendering != false) {
    return (
      <>
        <Cuadro />
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            height: 120,
            width: dimensionsW,
            borderRadius: 60,
            marginTop: dimensionsH /1.2,
            marginLeft: dimensionsW / 2.5,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setRendering(false);
            }}>
            <Image
              style={{
                height: 50,
                width: 50,
                borderRadius: 75,
                borderWidth: 0.2,
                borderColor: 'black',
              }}
              source={require('./botonMapa2.png')}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  } else {
    return (
      <>
        <Map />
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            height: 120,
            width: dimensionsW,
            borderRadius: 60,
            marginTop: dimensionsH /1.2,
            marginLeft: dimensionsW / 2.5,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setRendering(true);
            }}>
            <Image
              style={{
                height: 50,
                width: 50,
                borderRadius: 75,
                borderWidth: 0.2,
                borderColor: 'black',
              }}
              source={require('./botonCuadro2.png')}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  }
};

export default Eventos;
