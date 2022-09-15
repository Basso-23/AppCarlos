import React, { useState, useEffect, useRef } from "react";
import { ScrollView, Dimensions, TouchableOpacity } from "react-native";
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

export default function Ficha({ route }) {
  const isFocused = useIsFocused();
  const [loader, setLoader] = useState(true);
  const [posts, setPosts] = useState();
  const [visible, setIsVisible] = useState(false);
  const [indexImage, setIndexImage] = useState(0);

  let dimensionsH = Dimensions.get("window").height;
  let dimensionsW = Dimensions.get("window").width;

  let prueba = readTEXTfile();

  let imagenesList = [];

  const onPress = (index) => {
    console.log(index);
    setIsVisible(true);
    setIndexImage(index);
  };

  useEffect(() => {
    setLoader(true);
    if (isFocused) {
      prueba
        .then((value) => {
          language = value;
          axios
            .get(
              "https://bmacademiaonline.com/payaproyecto3/inforest.php?id=" +
                route.params.id
            )
            .then((res) => {
              setPosts(res.data);
            });
        })
        .catch((err) => {
          setPosts(err);
        })
        .finally(() => setLoader(false));
    }
  }, [isFocused]);

  if (posts) {
    posts.imagenes.forEach((element) => {
      imagenesList.push({ uri: element.imagen });
    });
  }
  if (loader) {
    return <AppLoader />;
  }
  return (
    <ScrollView>
      <View style={{ alignItems: "center", height: 275 }}>
        <Image
          style={{
            width: 450,
            height: 275,
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
          source={{
            uri: route.params.image,
          }}
        />
        <Image
          style={{
            width: 100,
            height: 100,
            position: "absolute",
            top: 240,
            bottom: 200,
            left: dimensionsW / 2.7,
            right: 0,
            zIndex: 2,
            borderColor: "white",
            borderRadius: 100,
            borderWidth: 4,
          }}
          source={{
            uri: route.params.mini,
          }}
        />
      </View>
      <View style={{ backgroundColor: "white" }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 65,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            {route.params.name}
          </Text>
          <Text style={{ fontSize: 14 }}>{route.params.description}</Text>
        </View>
        <View style={{ marginTop: 10 }}></View>
        <View
          style={{
            borderColor: "'rgba(0, 0, 0, .1)'",
            borderWidth: 0.5,
            flex: 3,
            flexDirection: "row",
            height: 90,
          }}
        >
          <TouchableOpacity
            style={{
              withd: 50,
              height: 70,
              flexGrow: 1,
              alignItems: "center",
              marginBottom: 10,
              marginTop: 10,
            }}
            activeOpacity={0.5}
          >
            <Icon name="heart" type="evilicon" iconProps={{ size: 50 }} />
            <Text>Favorito</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              withd: 50,
              height: 50,
              flexGrow: 1,
              alignItems: "center",
              marginTop: 10,
              marginBottom: 10,
            }}
            activeOpacity={0.5}
          >
            <Icon name="share" type="feather" iconProps={{ size: 40 }} />
            <Text>Compartir</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              with: 100,
              height: 70,
              flexGrow: 1,
              alignItems: "center",
              marginBottom: 10,
              marginTop: 10,
            }}
            activeOpacity={0.5}
          >
            <Icon name="call-outline" type="ionicon" iconProps={{ size: 40 }} />
            <Text>Llamar</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={{
              with: 100,
              height: 50,
              flexGrow: 1,
              alignItems: "center",
              margin: 10,
              backgroundColor: "black",
              borderColor: "black",
              borderWidth: 0.5,
              borderRadius: 5,
            }}
            activeOpacity={0.5}
          >
            <View style={{ flex: 1, flexDirection: "row", marginTop: 14 }}>
              <Icon
                name="truck"
                type="feather"
                iconProps={{ size: 20, color: "#ffffff" }}
              />
              <Text style={{ color: "white" }}> Pide Pa Yá!</Text>
            </View>
          </TouchableOpacity>
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
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 10,
              }}
            >
              <Icon name="star" type="feather" iconProps={{ size: 16 }} />
              <Text style={{ fontWeight: "bold" }}> PUNTUACIÓN MEDIA</Text>
            </View>
          </View>
          <View>
            <View
              style={{ borderColor: "rgba(0, 0, 0, .1)", borderWidth: 0.5 }}
            >
              <Text style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 28, color: "#5ced73" }}>4.9</Text>
                <Text>/5</Text>
                <Text style={{ color: "#5ced73" }}> Muy bueno</Text>
              </Text>
            </View>
            <View
              style={{
                borderColor: "rgba(0, 0, 0, .1)",
                borderWidth: 0.5,
                flex: 1,
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 1, marginTop: 10, marginBottom: 10 }}>
                <Text style={{ marginLeft: 10 }}>Comida</Text>
              </View>
              <View style={{ flex: 1, marginTop: 10, marginBottom: 10 }}>
                <Text
                  style={{
                    textAlign: "right",
                    marginRight: 3,
                    color: "#5ced73",
                  }}
                >
                  5.0
                </Text>
              </View>
            </View>
            <View
              style={{
                borderColor: "rgba(0, 0, 0, .1)",
                borderWidth: 0.5,
                flex: 1,
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 1, marginTop: 10, marginBottom: 10 }}>
                <Text style={{ marginLeft: 10 }}>Servicio</Text>
              </View>
              <View style={{ flex: 1, marginTop: 10, marginBottom: 10 }}>
                <Text
                  style={{
                    textAlign: "right",
                    marginRight: 3,
                    color: "#5ced73",
                  }}
                >
                  4.7
                </Text>
              </View>
            </View>
            <View
              style={{
                borderColor: "rgba(0, 0, 0, .1)",
                borderWidth: 0.5,
                flex: 1,
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 1, marginTop: 10, marginBottom: 10 }}>
                <Text style={{ marginLeft: 10 }}>Ambiente</Text>
              </View>
              <View style={{ flex: 1, marginTop: 10, marginBottom: 10 }}>
                <Text
                  style={{
                    textAlign: "right",
                    marginRight: 3,
                    color: "#5ced73",
                  }}
                >
                  5.0
                </Text>
              </View>
            </View>
          </View>
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
            <Text style={{ marginLeft: 10 }}>{route.params.description}</Text>
          </View>
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
              <Icon name="image" type="feather" iconProps={{ size: 16 }} />
              <Text style={{ fontWeight: "bold" }}> IMAGENES</Text>
            </View>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            snapToAlignment="center"
            decelerationRate="fast"
            style={{ borderColor: "rgba(0, 0, 0, .1)", borderWidth: 0.5 }}
          >
            {posts &&
              posts.imagenes.map((imagen, index) => (
                <View>
                  <TouchableOpacity onPress={() => onPress(index)}>
                    <Image
                      source={{ uri: imagen.imagen }}
                      style={{
                        width: 100,
                        height: 100,
                        margin: 10,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            <ImageView
              images={imagenesList}
              imageIndex={indexImage}
              visible={visible}
              onRequestClose={() => setIsVisible(false)}
            />
          </ScrollView>
        </View>

        <View
          style={{
            borderColor: "rgba(0, 0, 0, .1)",
            borderWidth: 0.5,
            marginLeft: 20,
            marginBottom: 5,
            marginRight: 20,
          }}
        >
          <Text style={{ fontSize: 16, margin: 5 }}>
            1 Review para {route.params.name}
          </Text>
        </View>

        <View
          style={{
            borderColor: "rgba(0, 0, 0, .1)",
            borderWidth: 0.5,
            marginLeft: 20,
            marginBottom: 5,
            marginRight: 20,
          }}
        >
          <View
            style={{
              borderColor: "rgba(0, 0, 0, .1)",
              borderWidth: 0.5,
              flex: 1,
              flexDirection: "row",
              marginRight: 5,
            }}
          >
            <Icon
              name="person-circle"
              type="ionicon"
              iconProps={{ size: 36 }}
            />
            <View style={{ flex: 1, marginLeft: 5 }}>
              <Text>Usuario</Text>
              <Text>8 Septiembre, 2022</Text>
            </View>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <Text>
                <Text style={{ color: "#5ced73", fontSize: 28, flex: 1 }}>
                  5.0
                </Text>
                <Text>/5</Text>
                <Text> Excelente</Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              borderColor: "rgba(0, 0, 0, .1)",
              borderWidth: 0.5,
              alignItems: "flex-start",
            }}
          >
            <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
              Excelente comida de calidad
            </Text>
            <Text style={{ marginLeft: 10 }}>
              Lo mejor que he comido en mucho tiempo
            </Text>
            <Icon
              name="food"
              type="material-community"
              iconProps={{ size: 72 }}
              style={{ marginLeft: 5 }}
            />
            <View style={{ flexDirection: "row" }}>
              <Text style={{ margin: 10, fontSize: 11 }}>2 Me gusta</Text>
              <Text style={{ margin: 10, fontSize: 11 }}>0 Comentario</Text>
              <Text style={{ margin: 10, fontSize: 11 }}>1 Compartir</Text>
            </View>
          </View>
          <View
            style={{
              borderColor: "rgba(0, 0, 0, .1)",
              borderWidth: 0.5,
              flex: 1,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity style={{ margin: 10 }}>
              <Text>
                <Icon name="like2" type="antdesign" iconProps={{ size: 16 }} />
                <Text> Like</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ margin: 10 }}>
              <Text>
                <Icon
                  name="comment-outline"
                  type="material-community"
                  iconProps={{ size: 16 }}
                />
                <Text> Comentario</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ margin: 10 }}>
              <Text>
                <Icon name="share" type="feather" iconProps={{ size: 16 }} />
                <Text> Compartir</Text>
              </Text>
            </TouchableOpacity>
          </View>
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
              <Icon name="menu" type="feather" iconProps={{ size: 16 }} />
              <Text style={{ marginLeft: 5, fontWeight: "bold" }}>
                CARÁCTERISTICAS DEL NEGOCIO
              </Text>
            </View>
          </View>
          <View
            style={{
              borderColor: "rgba(0, 0, 0, .1)",
              borderWidth: 0.5,
              height: 40,
            }}
          >
            <Text style={{ marginLeft: 10, marginTop: 7.5 }}>
              <Icon name="truck" type="feather" iconProps={{ size: 15 }} />
              <Text style={{ marginLeft: 10 }}> Delivery</Text>
            </Text>
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={{
              with: 100,
              height: 40,
              flexGrow: 1,
              alignItems: "center",
              margin: 20,
              backgroundColor: "black",
              borderColor: "black",
              borderWidth: 0.5,
              borderRadius: 5,
            }}
            activeOpacity={0.5}
          >
            <Text
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 7.5,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Añadir un review
              </Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Text>VER MAS RESEÑAS &#10140;</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderColor: "rgba(0, 0, 0, .1)",
            borderWidth: 0.5,
            margin: 20,
            flex: 1,
          }}
        >
          <View
            style={{
              borderColor: "rgba(0, 0, 0, .1)",
              borderWidth: 0.5,
              height: 30,
              alignItems: "flex-start",
            }}
          >
            <Icon name="bookmark" type="feather" iconProps={{ size: 15 }} />
          </View>

          {posts &&
            posts.horarios.map((horario) => (
              <View
                style={{
                  flex: 1,
                  borderColor: "rgba(0, 0, 0, .1)",
                  borderLeftWidth: 0.5,
                  borderRightWidth: 0.5,
                }}
              >
                <View style={{ flex: 1, flexDirection: "row", marginTop: 5 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: "left", marginLeft: 5 }}>
                      {horario.dia}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: "center" }}>{horario.abre}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: "center" }}>
                      {horario.cierra}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
        </View>

        <View
          style={{
            borderColor: "rgba(0, 0, 0, .1)",
            borderWidth: 0.5,
            margin: 20,
          }}
        >
          <View
            style={{
              borderColor: "rgba(0, 0, 0, .1)",
              borderWidth: 0.5,
              height: 30,
              alignItems: "flex-start",
            }}
          >
            <Icon name="bookmark" type="feather" iconProps={{ size: 15 }} />
          </View>
          <View
            style={{
              borderColor: "rgba(0, 0, 0, .1)",
              borderWidth: 0.5,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              <Icon
                name="map-pin"
                type="feather"
                iconProps={{
                  color: "#7fff00",
                  size: 15,
                }}
                style={{
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: "#7fff00",
                  overflow: "hidden",
                  padding: 3,
                }}
              />
              <Text> Prueba, Planta baja de algo, Panamá</Text>
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
                  description={route.params.description}
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
              }}
            >
              <Icon
                name="call"
                type="material"
                iconProps={{
                  color: "#ffbf66",
                  size: 15,
                }}
                style={{
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: "#ffbf66",
                  overflow: "hidden",
                  padding: 3,
                }}
              />
              <Text> 209-9138</Text>
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
                  color: "#f66",
                  size: 15,
                }}
                style={{
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: "#f66",
                  overflow: "hidden",
                  padding: 3,
                }}
              />
              <Text> http://hkb.pidepaya.com</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
