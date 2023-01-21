import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  Platform,
  Dimensions,
  useColorScheme,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import axios from "axios";
import Config from "react-native-config";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

axios.interceptors.request.use(
  async (config) => {
    let request = config;
    request.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    request.url = configureUrl(config.url);
    return request;
  },
  (error) => error
);

export const { height, width } = Dimensions.get("window");

export const configureUrl = (url) => {
  let authUrl = url;
  if (url && url[url.length - 1] === "/") {
    authUrl = url.substring(0, url.length - 1);
  }
  return authUrl;
};

const options = {
  mediaType: "photo",
  quality: 1,
  width: 256,
  height: 256,
  includeBase64: true,
};

const Predict = () => {
  const cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasGalleryPermission, setHasGalleryPermission] = useState();
  const [photo, setPhoto] = useState(null);
  const [isPreview, setIsPreview] = useState(false);

  const getPredication = async (params) => {
    return new Promise((resolve, reject) => {
      var bodyFormData = new FormData();
      bodyFormData.append("file", params);
      const url = Config.URL;
      return axios
        .post(url, bodyFormData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          setLabel("Failed to predict.");
          reject("err", error);
        });
    });
  };

  const clearOutput = () => {
    setResult("");
    setImage("");
  };

  const getResult = async (path, response) => {
    setImage(path);
    setLabel("Predicting the disease...");
    setResult("");
    const params = {
      uri: path,
      name: response.assets[0].fileName,
      type: response.assets[0].type,
    };
    const res = await getPredication(params);
    if (res?.data?.class) {
      setLabel(res.data.class);
      setResult(res.data.confidence);
    } else {
      setLabel("Failed to predict");
    }
  };
  const pickImg = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imgObj = {
        uri: result.assets[0].uri,
      };
      setIsPreview(true);
      setPhoto(imgObj);
      // todo getResult
      // const uri = imgObj.uri
      // getResult(uri, response)
    }
  };

  const testPic = async () => {
    let newPic = await cameraRef.current.takePictureAsync(options);
    console.log(newPic);
    setIsPreview(true);
    setPhoto(newPic);
  };

  const takePicture = async () => {
    let response = await ImagePicker.launchCameraAsync(options);
    console.log(response);
    if (!response.canceled) {
      console.log("User canceled camera pic");
      return;
    }

    const imgObj = {
      uri: response.assets[0].uri,
    };
    setIsPreview(true);
    setPhoto(imgObj);
    // todo getResult
    // const uri = imgObj.uri
    // getResult(uri, response)
  };

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  });

  if (hasCameraPermission === undefined) {
    return <Text>Requesting for camera permission</Text>;
  } else if (!hasCameraPermission) {
    return <Text>No access to camera, Please change the settings.</Text>;
  }

  console.log(photo);

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={{ height: "60%" }} />
      <Animatable.View style={styles.footer} animation={"fadeInUpBig"}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1, width: "100%", height: "100%" }}>
            <Text>Predict Potato Diseases</Text>
            {isPreview && photo ? (
              <ImageBackground source={photo} style={styles.imgStyle} />
            ) : (
              <Text>No Image Ready</Text>
            )}
          </View>
          <View>
            <View style={styles.button}>
              <TouchableOpacity onPress={takePicture}>
                <LinearGradient
                  colors={["#ffaa00", "#e85d04"]}
                  style={styles.signIn}
                >
                  <MaterialIcons name="camera-alt" color="#fff" size={30} />
                  {/* <Text style={styles.textSign}>Get Started</Text> */}
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <TouchableOpacity onPress={pickImg}>
                <LinearGradient
                  colors={["#ffaa00", "#e85d04"]}
                  style={styles.signIn}
                >
                  <MaterialIcons name="image" color="#fff" size={30} />
                  {/* <Text style={styles.textSign}>Get Started</Text> */}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animatable.View>
    </Camera>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 25,
  },
  btn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },

  signIn: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
  },
  imgStyle: {
    width: 200,
    height: 200,
    borderRadius: 50,
  },
});

export default Predict;
