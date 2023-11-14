import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Button from "../../components/Button";

export default function App() {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode);
  const cameraRef = useRef(null);

  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  useEffect(() => {
    (async () => {
      await MediaLibrary.requestPermissionsAsync();
      const CameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(CameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data.uri);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === null) {
    return (
      <View>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={{ flex: 1 }}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              padding: 20,
            }}
          >
            <Button
              title={"Flash"}
              color={flash === Camera.Constants.FlashMode.torch ? "#fff" : "#000"}
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode
                    ? Camera.Constants.FlashMode.torch
                    : Camera.Constants.FlashMode
                );
              }}
              icon={"flash"}
              color={"#fff"}
            />
            <Button
              title={"Flip"}
              onPress={() => {
                setType(
                  type === CameraType.back
                    ? CameraType.front
                    : CameraType.back
                );
              }}
              icon={"retweet"}
              color={"#fff"}
            />
          </View>

        </Camera>
      ) : (
        <View style={{ flex: 1 }}>
          <Image source={{ uri: image }} style={{ flex: 1 }} />
        </View>
      )}
      <View>
        {image ? (
          // retake picture
          <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 20,
          }}
          >
            <Button
              title={"Retake Picture"}
              onPress={() => setImage(null)}
              icon={"retweet"}
              color={"#fff"}
            />
            <Button
              title={"Save Picture"}
              onPress={async () => {
                await MediaLibrary.saveToLibraryAsync(image);
              }}
              icon={"save"}
              color={"#fff"}
            />
          </View>
        ) : (
          <Button
            title={"Take Picture"}
            onPress={takePicture}
            icon={"camera"}
            color={"#fff"}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
  },
  // camera: {
  //   flex: 1,
  //   borderRadius: 10,
  // }
});
