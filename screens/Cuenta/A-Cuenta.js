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

import SingIn from './SingIn';
import SingUp from './SingUp';

const Cuenta = () => {
  const [rendering, setRendering] = useState(false);
  let dimensionsH = Dimensions.get('window').height;
  let dimensionsW = Dimensions.get('window').width;

  if (rendering != false) {
    return (
      <>
        <View
          style={{
            marginTop: -20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              borderRadius: 2.5,
              width: '82%',
              height: dimensionsH / 16,
              zIndex: 1,
              top: dimensionsW + 150,
              backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              setRendering(false);
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              Iniciar Sesion
            </Text>
          </TouchableOpacity>
          <SingUp />
        </View>
      </>
    );
  } else {
    return (
      <>
        <View
          style={{
            marginTop: -20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              borderRadius: 2.5,
              width: '82%',
              height: dimensionsH / 16,
              zIndex: 1,
              top: dimensionsW - 30,
              backgroundColor: '#fedc00',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              setRendering(true);
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              Registrate
            </Text>
          </TouchableOpacity>
          <SingIn />
        </View>
      </>
    );
  }
};

export default Cuenta;
