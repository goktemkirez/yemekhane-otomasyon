import React, { useState } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";

export default function ScanScreen() {
  const [approved, setapproved] = useState("false");
  const onSuccess = (e) => {
    setapproved(e.data);
    // Linking.openURL(e.data).catch((err) =>
    //   console.error("An error occured", err)
    // );
  };

  return (
    <QRCodeScanner
      reactivate={true}
      reactivateTimeout={3000}
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.off}
      topContent={
        <Text style={styles.centerText}>Yemekhane Otomasyon Uygulaması</Text>
      }
      bottomContent={
        <TouchableOpacity style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>{approved}</Text>
        </TouchableOpacity>
      }
    />
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  buttonTouchable: {
    padding: 16,
  },
});

AppRegistry.registerComponent("default", () => ScanScreen);
