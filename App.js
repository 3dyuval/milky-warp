import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Modal,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { CameraPreview } from "./CameraPreview";
import { ImagePicker } from "./ImagePicker";
import React from "react";
import { MapPreview } from "./MapPreview";

export default function App() {
  const [photo, setPhoto] = React.useState();
  const [photoModal, setPhotoModal] = React.useState(false);
  const [mapModal, setMapModal] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput style={styles.input} />
      <Text>Password</Text>
      <TextInput style={styles.input} secureTextEntry />
      <Button
        title="Take Picture"
        style={styles.input}
        color="gray"
        onPress={() => setPhotoModal(true)}
      />
      <Modal visible={photoModal} transparent={false}>
        <CameraPreview
          photo={photo}
          setPhoto={setPhoto}
          setPhotoModal={setPhotoModal}
          photoModal={photoModal}
        />
      </Modal>
      <Button
        title="Find me"
        style={styles.input}
        color="gray"
        onPress={() => setMapModal(true)}
      />
      <Modal visible={mapModal} transparent={false}>
        <MapPreview />
      </Modal>
      <ImagePicker />
      <Button title="Sign up" block style={styles.input} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
  },
  input: {
    height: 40,
    margin: 12,
    width: "100%",
    borderWidth: 1,
    padding: 10,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
