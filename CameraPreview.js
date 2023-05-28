import {
  Alert,
  Modal,
  Button,
  Text,
  View,
  ImageBackground,
  Image,
  SafeAreaView,
  StyleSheet
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import React from "react";
import * as MediaLibrary from "expo-media-library";
import { shareAsync } from "expo-sharing";

export const CameraPreview = ({
  photo,
  setPhoto,
  photoModal,
  setPhotoModal,
}) => {
  let cameraRef = React.useRef(null);

  const [permission, setPermission] = React.useState({
    camera: undefined,
    library: undefined,
  });

  async function getPermissions() {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    const libraryPermission = await MediaLibrary.requestPermissionsAsync();

    setPermission({
      camera: cameraPermission.status === "granted",
      library: libraryPermission.status === "granted",
    });
  }

  async function takePicture() {
    try {
      if (!cameraRef.current) throw new Error("Camera not loaded");

      let pic = await cameraRef.current.takePictureAsync({
        quality: 1,
        autoFocus: "off",
        exif: false,
      });

      setPhoto(pic);
    } catch (err) {
      console.error(err);
    }
  }

  React.useEffect(() => {
    getPermissions();
  }, [photoModal]);

  if (photo) {
    const share = async () => {
      await shareAsync(photo.uri);
      setPhoto(undefined);
    };

    const save = async () => {
      await MediaLibrary.saveToLibraryAsync(photo.uri);
      console.log('success')
      setPhoto(undefined);
    };

    const done = () => {
      setPhoto(undefined);
      setPhotoModal(false);
    };

    return (
      <SafeAreaView style={styles.container}>
        <Button title="Share" onPress={share} />
        <Button title="Save" onPress={save} />
        <Button title="Done" onPress={done} />
        <Image source={{ uri: photo.uri }} style={styles.preview} />
      </SafeAreaView>
    );
  }
  return (
    <Camera type={CameraType.front} ref={cameraRef} style={styles.container}>
      <PermissionStatus permission={permission} />
      <View style={styles}>
        <Button title="Take picture" onPress={takePicture} />
        <Button title="Close" color="black" onPress={() => setPhotoModal(false)} />
      </View>
    </Camera>
  );
};

function PermissionStatus({ permission }) {
  if (permission.camera === undefined || permission.library === undefined) {
    return <Text>Requesting permission...</Text>;
  }

  if (permission.camera === false || permission.library === false) {
    return (
      <Text>
        Permission to use {!permission.camera && "camera"}
        {permission.library && "library"} has not been granted. Please change
        this in the settings.
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
