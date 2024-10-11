import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Apptext({ children, style }) {
  return (
    <View>
      <Text style={[styles.text, style]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {},
});
