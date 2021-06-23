import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import {
  getStorageObject,
  messageService,
  setStorageObject,
} from "../util/util";

const CameraScreen = () => {
  let camera: Camera | null;
  let [hasPermission, setHasPermissions]: [boolean, any] = useState(true);
  let [cameraType, setCameraType]: [string, any] = useState(
    Camera.Constants.Type.back
  );

  //  DidMount
  useEffect(() => {
    console.log("CameraScreen DidMount");
    getPermissionAsync();
  }, []);

  //  WillUnMount
  useEffect(() => {
    return () => {
      console.log("messageSubscription unscribed");
    };
  }, []);

  const getPermissionAsync = async () => {
    // Camera roll Permission
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasPermissions(status === "granted");
  };

  const handleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  const navigation = useNavigation();

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      let photoString = JSON.stringify(photo.base64);
      photoString = photoString.substr(1, photoString.length - 2);
      setStorageObject("cameraPicture", photoString);
      messageService.sendMessage("CameraCaptureDone");
      navigation.goBack();
    }
  };

  const pickImage = async () => {
    let image: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    let photoString = JSON.stringify(image.uri);
    photoString = photoString.substr(1, photoString.length - 2);
    setStorageObject("cameraPicture", photoString);
    messageService.sendMessage("CameraCaptureDone");
    navigation.goBack();
  };
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={cameraType}
        ref={(ref) => {
          camera = ref;
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 30,
          }}
        >
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
            onPress={() => pickImage()}
          >
            <Ionicons
              name="ios-photos"
              style={{ color: "#fff", fontSize: 40 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
            onPress={() => takePicture()}
          >
            <FontAwesome
              name="camera"
              style={{ color: "#fff", fontSize: 40 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
            onPress={() => handleCameraType()}
          >
            <MaterialCommunityIcons
              name="camera-switch"
              style={{ color: "#fff", fontSize: 40 }}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default CameraScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
