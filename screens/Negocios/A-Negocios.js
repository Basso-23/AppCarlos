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

import Map from './MapN';
import Cuadro from './CuadroN';

const Negocios = () => {
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
            marginTop: dimensionsH - 80,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setRendering(false);
            }}>
            <Image
              style={{ height: 60, width: 60, borderRadius: 75 }}
              source={require('./botonMapa1.png')}
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
            marginTop: dimensionsH - 80,
            alignItems: 'center',
           
          }}>
          <TouchableOpacity
            onPress={() => {
              setRendering(true);
            }}>
            <Image
              style={{ height: 60, width: 60, borderRadius: 75 }}
              source={require('./botonCuadro1.png')}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  }
};

export default Negocios;
