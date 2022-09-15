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
import axios from "axios";
import { Dimensions } from "react-native";
import {
  addMultipleGifs,
  deleteAllGifs,
  getSingleGif,
  saveTEXTfile,
  readTEXTfile,
} from "../TextFile";

function Restaurantes3() {
  const [posts, setPosts] = useState([]);

  let prueba = readTEXTfile();

  useEffect(() => {
    prueba
      .then((value) => {
        language = value;
        axios
          .get(
            "https://bmacademiaonline.com/payaproyecto3/restaurantes.php?lang=" +
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

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.tituloText}>Green Site</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ver+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imagenesContainer}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          snapToAlignment="center"
          decelerationRate="fast"
        >
          {posts.map((section) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Negocios", {
                  screen: "Restaurante",
                  params: {
                    name: section.content[0].name,
                    image: section.content[0].image,
                    mini: section.content[0].mini,
                    description: section.content[0].description,
                    id: section.content[0].id,
                    coordinates: section.content[0].coordinates,
                  },
                })
              }
            >
              <ImageBackground
                imageStyle={{ borderRadius: 6 }}
                source={{ uri: section.content[0].image }}
                style={styles.imagenes}
              >
                <View style={styles.child}>
                  <View style={styles.childView}>
                    <View
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        backgroundColor: "black",
                        borderRadius: 10,
                        alignSelf: "baseline",
                        height: 20,
                      }}
                    >
                      <Text style={styles.imageText}>
                        {" "}
                        {section.content[0].estado}{" "}
                      </Text>
                    </View>

                    <View
                      style={{
                        marginTop: 5,
                        marginRight: 10,
                        borderRadius: 4,
                        alignSelf: "baseline",
                      }}
                    >
                      <Image
                        style={{ width: 26, height: 26 }}
                        source={require("./check1.png")}
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
                          resizeMode: "stretch",
                          paddingLeft: 0,
                        }}
                        source={{ uri: section.content[0].mini }}
                      />
                      <View
                        style={{
                          marginTop: 5,
                          marginLeft: 10,
                          borderRadius: 4,
                          alignSelf: "baseline",
                        }}
                      >
                        <Text style={styles.nameText}>
                          {" "}
                          {section.content[0].name}{" "}
                        </Text>
                      </View>
                    </View>

                    <Image
                      style={{
                        marginTop: 10,
                        marginRight: 10,
                        width: 25,
                        height: 25,
                        resizeMode: "stretch",
                        paddingLeft: 0,
                      }}
                      source={require("./star-rank.png")}
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

let dimensions = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 5,
  },

  imagenes: {
    height: 115,
    flex: 1,
    flexDirection: "column",
    width: 200,
    justifyContent: "center",
    resizeMode: "stretch",
    marginLeft: 5,
    marginRight: 5,
  },

  imageText: {
    fontSize: 12,
    color: "#fedc00",
  },

  nameText: {
    fontSize: 12,
    color: "white",
  },

  child: {
    flex: 1,
    borderRadius: 8,
    width: 200,
    height: 115,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  childView: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  childView2: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 25,

    flexDirection: "row",
  },

  childView3: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 18,
    flexDirection: "column",
  },

  imagenesContainer: {
    marginLeft: 0,
    flexDirection: "row",
    width: dimensions,
  },

  tituloText: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "arial",
    marginBottom: 15,
    color: "#252a3e",
  },

  textContainer: {
    marginLeft: 12,
    flexDirection: "row",
  },

  button: {
    backgroundColor: "black",
    height: 30,
    width: 100,
    borderRadius: 5,
    alignContent: "center",
    justifyContent: "center",
    marginLeft: dimensions - 240,
  },

  buttonText: {
    fontWeight: "bold",
    marginLeft: 35,
    fontSize: 14,
    color: "white",
  },
});

export default Restaurantes3;
