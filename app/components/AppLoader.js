import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
const AppLoader = ({ backgroundCOlor = "dodgerblue", color, text }) => {
  return (
    <View
      style={[styles.loadingContainer, { backgroundColor: backgroundCOlor }]}
    >
      <View style={styles.loading}>
        <ActivityIndicator size={50} color={color ? color : "#fff"} />
        <Text style={styles.infoText}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    width: "70%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    backgroundColor: "#rgb(30, 144, 255)",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignContent: "center",
    justifyContent: "center",
  },
  infoText: {
    fontSize: 18,
    color: "#fff",
    marginTop: 10,
  },
});

export default AppLoader;
