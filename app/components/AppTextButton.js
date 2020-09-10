import React from "react";
import { Text, TouchableWithoutFeedback, StyleSheet } from "react-native";

const AppTextButton = ({ title, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Text style={styles.textButton}>{title}</Text>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  textButton: {
    color: "dodgerblue",
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "dodgerblue",
  },
});

export default AppTextButton;
