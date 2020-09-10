import React, { Children } from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";

const Screen = ({ children, style }) => {
  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    padding: 10,
  },
});

export default Screen;
