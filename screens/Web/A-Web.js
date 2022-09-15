import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Button,
  StatusBar,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Dimensions } from 'react-native';
import AppLoader from '../AppLoader';

function Web({ route }) {
  const [loader, setLoader] = useState(false);
  let dimensions = Dimensions.get('window').height;

  return (
    <View>
      <View
        style={{
          width: '100%',
          height: '100%',
          marginTop: 10,
          marginBottom: dimensions/22,
        }}>
        <WebView
          source={{ uri: route.params.url }}
          onLoadStart={() => setLoader(true)}
          onLoadEnd={() => setLoader(false)}
        />
      </View>
      {loader && <AppLoader />}
    </View>
  );
}

export default Web;
