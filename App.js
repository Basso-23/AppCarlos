import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Navigation from './Navegation';

const App = () => {
  return (
    <>
      <Navigation />
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
    </>
  );
};

export default App;
