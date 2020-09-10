import React from "react";
import { TextInput, StyleSheet } from "react-native";

const AppTextInput = ({ ...args }) => {
  return <TextInput {...args} style={styles.inputBox} />;
};

const styles = StyleSheet.create({
  inputBox: {
    width: "100%",
    borderColor: "#919191",
    borderBottomWidth: 1,
    height: 30,
    fontSize: 18,
  },
});

export default AppTextInput;
