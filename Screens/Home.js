import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { setDoc, doc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

function Home() {
  const [name, setName] = useState("");

  const handleNameChange = (text) => {
    setName(text);
  };

  const saveNameToFirestore = async () => {
    try {
      await setDoc(doc(collection(db, "Products")), {
        name: name,
      });

      alert("Name saved successfully!");
      setName("");
    } catch (error) {
      alert("Failed to save name: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={handleNameChange}
        placeholder="Enter Name"
      />
      <Button title="Save Name" onPress={saveNameToFirestore} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default Home;
