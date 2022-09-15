import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Dimensions } from "react-native";

let dimensionsW = Dimensions.get("window").width;
let dimensionsH = Dimensions.get("window").height;

const SingIn = () => {
  return (
    <View style={styles.container1}>
      <View style={styles.container2}>
        <View style={styles.statusTitle}>
          <Image
            style={{
              width: 16,
              height: 18,
              resizeMode: "stretch",
              marginBottom: 5,
            }}
            source={require("./candado.png")}
          />
          <Text
            style={{
              marginLeft: 6,
              fontSize: 10,
              fontWeight: "bold",
            }}
          >
            INICIAR SESION
          </Text>
        </View>

        <View style={styles.statusIn}>
          <View style={styles.nombre}>
            <Text
              style={{
                color: "#61616d",
                fontSize: 14,
                borderColor: "#dddddf",
                width: "100%",
                padding: 5,
                borderBottomWidth: 1.5,
              }}
            >
              Nombre de usuario
            </Text>
          </View>
          <View style={styles.password}>
            <Text
              style={{
                color: "#61616d",
                fontSize: 14,
                borderColor: "#dddddf",
                width: "100%",
                padding: 5,
                borderBottomWidth: 1.5,
              }}
            >
              Contraseña
            </Text>
          </View>
          <View style={styles.singInButton}>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2.5,
                width: "100%",
                height: dimensionsH / 16,
                backgroundColor: "black",
                marginBottom: 28,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                Iniciar Sesion
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.midBorder}></View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2.5,
              width: "100%",
              height: dimensionsH / 16,

              marginBottom: 22,
            }}
          ></View>

          <View>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 18,
              }}
            >
              <Text
                style={{
                  color: "#61616d",
                  fontSize: 13,
                }}
              >
                Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.facebookButton}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2.5,
                width: "100%",
                height: dimensionsH / 16,
                backgroundColor: "#3c5a9a",
              }}
            >
              <Image
                style={{
                  resizeMode: "contain",
                  height: "50%",
                  width: "50%",
                  margin: -75,
                }}
                source={require("./facebook.png")}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "bold",
                  marginLeft: 25,
                }}
              >
                Ingrese con Facebook
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  container2: {
    alignItems: "center",
    marginTop: 12,
    marginBottom: 0,
    width: "95%",
    borderWidth: 1.1,
    borderColor: "#e6e6e6",
    height: dimensionsW + 60,
  },

  statusTitle: {
    alignItems: "center",
    borderColor: "#e6e6e6",
    width: "100%",
    borderBottomWidth: 1.1,
    flexDirection: "row",
    padding: 15,
  },
  statusIn: {
    width: "95%",

    flexDirection: "column",
    padding: 15,
  },
  midBorder: {
    borderColor: "#e6e6e6",
    width: "100%",
    bottom: dimensionsH / 60,
    borderBottomWidth: 1.5,
    flexDirection: "column",
  },

  nombre: {
    marginTop: 10,
    marginBottom: 25,
  },
  password: {
    marginTop: 10,
    marginBottom: 15,
  },
});

export default SingIn;
