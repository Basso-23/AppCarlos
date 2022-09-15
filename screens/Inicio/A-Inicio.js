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
} from 'react-native';
import Circulos from './Circulos';
import Comidas1 from './Comidas1';
import Comidas2 from './Comidas2';
import Sponsor from './Sponsor';
import Promos from './Promos';
import Restaurantes1 from './Restaurantes1';
import Restaurantes2 from './Restaurantes2';
import Restaurantes3 from './Restaurantes3';
import Ofertas from './Ofertas';

const Inicio = () => {
  return (
    <>
      <ScrollView style={styles.container}>
        <Circulos />
        <Comidas1 />
        <Comidas2 />
        <Promos />
        <Restaurantes1 />
        <Restaurantes2 />
        <Restaurantes3 />
        <Sponsor />
        <Ofertas />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default Inicio;
