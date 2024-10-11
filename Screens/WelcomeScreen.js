import React, { useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import color from "../config/color";

export default function WelcomeScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Main");
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigation]);

  return (
    <View style={styles.back}>
      <View>
        <Image
          source={require("../assets/oslogo.png")}
          style={styles.image}
        ></Image>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.secondary,
  },
  image: {
    width: 300,
    height: 300,
  },
});
