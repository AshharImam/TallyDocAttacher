import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Axios from "axios";
import FormData from "form-data";

import AppTextInput from "../components/AppTextInput";
import Screen from "../components/Screen";
import AppLoader from "..//components/AppLoader";
import AppTextButton from "../components/AppTextButton";

const ImageCaptureScreen = ({ route }) => {
  const [image, setImage] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // componentRendered
  useEffect(() => {
    getPermissionAsync();
  });

  // asking permission for camera
  getPermissionAsync = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  // uploading image to server
  handleUpload = async () => {
    setLoading(true);
    // console.log(image);
    const formData = new FormData();
    formData.append("invoiceNumber", invoiceNumber);
    //append created photo{} to formdata
    formData.append("file", {
      uri: image,
      type: "image/jpg",
      name: "image.jpg",
    });
    //use axios to POST
    Axios({
      method: "POST",
      url: "http://" + route.params.networkIP + ":5500/upload",
      data: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data;",
      },
    })
      .then(function (response) {
        setLoading(false);
        setShowInfo(true);
        setImage(null);
        setInvoiceNumber(null);
        setTimeout(() => setShowInfo(false), 3000);
        // console.log(response);
      })
      .catch(function (error) {
        setLoading(false);
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
        // console.log(error.response);
      });
    // await Axios.get("http://192.168.0.111:5500")
    //   .then((res) => console.log(res.status))
    //   .catch((E) => console.log(E));
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }

      // console.log(result);
    } catch (E) {
      // console.log(E);
    }
  };

  return (
    <Screen>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 10,
        }}
      >
        <AppTextInput
          clearButtonMode="while-editing"
          keyboardType="default"
          defaultValue={invoiceNumber}
          placeholder="Enter Voucher Id"
          onChangeText={(text) => setInvoiceNumber(text)}
        />
        {!loading && (
          <AppTextButton
            title="Pick an image from camera roll"
            onPress={() => _pickImage()}
          />
        )}
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200, marginTop: 10 }}
          />
        )}
        <View style={styles.notification}>
          {showError && (
            <Text style={styles.dangerText}>Problem Uploading Image</Text>
          )}
          {showInfo && (
            <Text style={styles.infoText}>Image Uploaded Successfully</Text>
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {!loading && (
          <Button
            title="Upload"
            onPress={() => handleUpload()}
            disabled={image && invoiceNumber ? false : true}
          />
        )}
      </View>
      {loading && <AppLoader text="uploading image..." />}
    </Screen>
  );
};

const styles = StyleSheet.create({
  dangerText: {
    fontSize: 15,
    color: "red",
    alignSelf: "center",
  },
  infoText: {
    fontSize: 15,
    color: "dodgerblue",
    alignSelf: "center",
  },
  buttonContainer: {
    marginVertical: 10,
  },
  notification: {
    position: "absolute",
    top: -30,
  },
});

export default ImageCaptureScreen;
