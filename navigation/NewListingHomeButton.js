import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function NewListingHomeButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="home" color={"black"} size={35} />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    bottom: 10,
  },
});

export default NewListingHomeButton;
