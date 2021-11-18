import React, { useState, useEffect } from "react";
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
  const [approved, setApproved] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [timeout, setTimeout] = useState(3000);

  // const onSuccess = async (e) => {
  //   try {
  //     setLoading(true);

  //     const response = await fetch(
  //       `http://192.168.1.37:5499/user/try-pass?external_id_hash=${e.data}`
  //     );

  //     console.log(response);
  //   } catch (error) {
  //     console.log("error", error);
  //   } finally {
  //     setLoading(false);
  //     // setTimeout(() => {
  //     //   scanner.reactivate();
  //     // }, 3000);
  //   }
  // };

  const onSuccess = (e) => {
    console.log(e.data);
    postRecord(e.data);
  };

  const postRecord = async (e) => {
    await fetch(`http://192.168.1.37:5499/user/try-pass?external_id_hash=${e}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.record) {
          setApproved(true);
        }
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setApproved(false);
    }, 3000);
  }, [approved]);

  return (
    <QRCodeScanner
      // ref={(node) => {
      //   this.scanner = node;
      // }}
      reactivate={true}
      reactivateTimeout={3000}
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.off}
      topContent={
        <Text style={styles.centerText}>Yemekhane Otomasyon Uygulaması</Text>
      }
      bottomContent={
        // <TouchableOpacity style={styles.buttonTouchable}>
        //   <Text style={styles.buttonText}>{approved}</Text>
        // </TouchableOpacity>
        <View>
          {approved ? (
            <View>
              <Text>Onaylanmıştır !</Text>
            </View>
          ) : (
            <View>
              <Text>QR kodu okutunuz</Text>
            </View>
          )}
        </View>
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
    backgroundColor: "red",
  },
});

AppRegistry.registerComponent("default", () => ScanScreen);
