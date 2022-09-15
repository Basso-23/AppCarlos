import React, { useState, useEffect, useRef } from "react";
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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Dimensions } from "react-native";
import axios from "axios";
import {
  addMultipleGifs,
  deleteAllGifs,
  getSingleGif,
  saveTEXTfile,
  readTEXTfile,
} from "../TextFile";

function Comidas1() {
  const [posts, setPosts] = useState([]);

  let prueba = readTEXTfile();

  useEffect(() => {
    prueba
      .then((value) => {
        language = value;
        axios
          .get(
            "https://bmacademiaonline.com/payaproyecto3/comidas.php?lang=" +
              language
          )
          .then((res) => {
            setPosts(res.data);
          });
      })
      .catch((err) => {
        setPosts("ERROR");
      });
  }, []);

  const navigation = useNavigation();

  //AutoScroll
  const scrollViewRef = useRef();

  let der = 0;
  let izq = 0;

  setInterval(() => {
    der = der + 200;
    if (der > 500) {
      izq = der;
      der = 0;
    }
    scrollViewRef.current?.scrollTo({ x: der, y: izq, animated: true });
  }, 2000);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        snapToAlignment="center"
        decelerationRate="fast"
        ref={scrollViewRef}
      >
        {posts.map((section) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Web", { url: section.content[0].url })
            }
          >
            <ImageBackground
              imageStyle={{ borderRadius: 12 }}
              style={styles.imagenes}
              source={{ uri: section.content[0].image }}
            >
              <View style={styles.textView}>
                <Text style={styles.imageText}>
                  {" "}
                  {section.content[0].name}{" "}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

let dimensions = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
    marginBottom: 0,
    marginTop: 20,
    width: dimensions - 10,
  },

  imagenes: {
    height: 75,
    width: 135,
    marginLeft: 5,
    marginRight: 5,
  },

  imageText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },

  textView: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 12,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Comidas1;
