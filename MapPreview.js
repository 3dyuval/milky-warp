import MapView, {enableLatestRenderer} from "react-native-maps";
import { StyleSheet, View, Button,  } from "react-native";
enableLatestRenderer();

export function MapPreview() {



  return (
    <View style={styles.map}>
      <MapView style={styles.map} />
      <Button style={styles.input} title="Find Me" />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  input: {
    paddingHorizontal: 8,
  },
});
