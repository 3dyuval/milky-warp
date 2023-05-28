import * as ExpoImagePicker from "expo-image-picker";
import React from "react";
import { View, Button, Image } from "react-native";

export function ImagePicker() {
  const [image, setImage] = React.useState();

  async function onPickImage() {
    const data = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setImage(data);
  }

  return <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Button title="Pick Image"  color="gray" onPress={onPickImage} />
    {image && (
      <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
    )}
  </View>;
}
