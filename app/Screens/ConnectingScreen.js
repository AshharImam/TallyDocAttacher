import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Keyboard,
} from "react-native";
import axios from "axios";

import Screen from "../components/Screen";
import AppLoader from "../components/AppLoader";
import AppTextInput from "../components/AppTextInput";

const ConnectingScreen = ({ navigation }) => {
  const [serverIP, setServerIP] = useState("");
  const [loading, setLoading] = useState(false); // setting true to debug
  const [showError, setShowError] = useState(false); // setting true to debug

  handleConnection = () => {
    Keyboard.dismiss();
    // console.log(serverIP);
    setLoading(true);
    axios
      .get("http://" + serverIP + ":5500")
      .then((res) => {
        setLoading(false);
        navigation.navigate("Upload Image", { networkIP: serverIP });
      })
      .catch((err) => {
        setLoading(false);
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      });
  };

  return (
    <Screen style={styles.screen}>
      <View>
        <AppTextInput
          clearButtonMode="while-editing"
          keyboardType="default"
          defaultValue={serverIP}
          placeholder="Enter Server IP"
          onChangeText={(text) => setServerIP(text)}
          style={styles.inputBox}
        />
        <View style={styles.buttonContainer}>
          {showError && (
            <Text style={styles.dangerText}>Unsuccessful Connection!</Text>
          )}
          <View style={styles.connectButton}>
            {!loading && (
              <Button
                title="Connect"
                onPress={handleConnection}
                color="dodgerblue"
              />
            )}
          </View>
        </View>
      </View>
      {loading && <AppLoader text="connecting to server..." />}
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  connectButton: {
    marginLeft: 10,
    width: 100,
    height: 30,
  },

  dangerText: {
    fontSize: 15,
    color: "red",
    alignSelf: "center",
  },
});

export default ConnectingScreen;
