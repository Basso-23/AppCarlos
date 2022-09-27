import React, { useState, useEffect, useRef } from "react";
import { ScrollView, Dimensions, TouchableOpacity, Share } from "react-native";
import { View, Text, Image } from "react-native";
import axios from "axios";
import {
  addMultipleGifs,
  deleteAllGifs,
  getSingleGif,
  saveTEXTfile,
  readTEXTfile,
} from "../TextFile";
import { useIsFocused } from "@react-navigation/native";
import AppLoader from "../AppLoader";
import ImageView from "react-native-image-viewing";
import { Icon } from "@rneui/themed";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import call from "react-native-phone-call";

export default function Promo({ route }) {
  const isFocused = useIsFocused();
  const [loader, setLoader] = useState(true);

  let dimensionsH = Dimensions.get("window").height;
  let dimensionsW = Dimensions.get("window").width;

  let prueba = readTEXTfile();

  useEffect(() => {
    setLoader(true);
    if (isFocused) {
      setLoader(false);
    }
  }, [isFocused]);

  if (loader) {
    return <AppLoader />;
  }
  return (
    <ScrollView style={{ backgroundColor: "#ffffff" }}>
      <View>
        <View style={{ alignItems: "center", height: 275 }}>
          <Image
            style={{
              width: 450,
              height: 275,
              resizeMode: "stretch",
            }}
            source={{
              uri: route.params.image,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginLeft: 10,
            marginBottom: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24 }}>{route.params.name}</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity>
              <Icon name="heart" type="evilicon" iconProps={{ size: 40 }} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginLeft: 10, marginBottom: 10 }}>
          <Text>0 people interested</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginLeft: 10,
            marginBottom: 5,
          }}
        >
          <Icon name="calendar" type="feather" iconProps={{ size: 16 }} />
          <Text style={{ marginLeft: 10 }}>
            {" "}
            {route.params.fecha_inicio} {" - "} {route.params.fecha_fin}{" "}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginLeft: 10,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <Icon
            name="map-pin"
            type="feather"
            iconProps={{
              size: 16,
            }}
          />
          <Text style={{ marginLeft: 5 }}>{route.params.ubicacion}</Text>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <MapView
            initialRegion={{
              latitude: route.params.coordinates.latitude,
              longitude: route.params.coordinates.longitude,
              latitudeDelta: 0.04864195044303443,
              longitudeDelta: 0.040142817690068,
            }}
            style={{
              width: Dimensions.get("window").width * 0.75,
              height: 200,
            }}
          >
            <Marker
              key={0}
              title={route.params.name}
              coordinate={route.params.coordinates}
            />
          </MapView>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginLeft: 10,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <Icon
            name="web"
            type="material-community"
            iconProps={{
              size: 16,
            }}
          />
          <Text style={{ flex: 1, flexWrap: "wrap", marginLeft: 5 }}>
            {route.params.url}
          </Text>
        </View>
        <View
          style={{
            borderColor: "rgba(0, 0, 0, .1)",
            borderWidth: 0.5,
            margin: 20,
          }}
        >
          <View style={{ borderColor: "rgba(0, 0, 0, .1)", borderWidth: 0.5 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                height: 30,
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              <Icon
                name="file-document-outline"
                type="material-community"
                iconProps={{ size: 16 }}
              />
              <Text style={{ fontWeight: "bold", marginLeft: 5 }}>
                DESCRIPCIÓN
              </Text>
            </View>
          </View>
          <View style={{ borderColor: "rgba(0, 0, 0, .1)", borderWidth: 0.5 }}>
            <Text style={{ marginLeft: 10, marginTop: 10, marginBottom: 15 }}>
              {route.params.description}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
