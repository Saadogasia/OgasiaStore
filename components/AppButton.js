import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/color";

function AppButton({ title, onPress, color = "btncolor" }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    width: "90%", // Adjusted width
    alignSelf: "center", // Center the button
    marginVertical: 10,
  },
  text: {
    color: "white",
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
