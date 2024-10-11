import React from "react";
import { TextInput, View, StyleSheet, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import color from "../config/color";

function AppTextInput({ icon, ...otherprop }) {
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={color.primary}
          style={styles.icon}
        />
      )}
      <TextInput style={styles.textInput} {...otherprop} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 25,
    flexDirection: "row",
    width: "90%", // Adjusted width
    alignSelf: "center", // Center the container
    padding: 15,
    marginVertical: 10,
  },
  textInput: {
    fontSize: 18,
    color: color.dark,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  icon: {
    margin: 10,
  },
});
export default AppTextInput;
