import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import color from "../config/color";

function Card({
  name,
  description,
  images,
  quantity,
  onPress,
  onDelete,
  onUpdate,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedQuantity, setUpdatedQuantity] = useState("");

  const handleUpdate = () => {
    setModalVisible(true);
  };

  const handleSubmitUpdate = () => {
    onUpdate(updatedQuantity);
    setModalVisible(false);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: images[0] }} style={styles.image} />
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={[styles.iconButton, styles.updateButton]}
          onPress={handleUpdate}
        >
          <MaterialCommunityIcons name="pencil" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconButton, styles.deleteButton]}
          onPress={onDelete}
        >
          <MaterialCommunityIcons name="trash-can" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>Descreption: {description}</Text>
        <Text style={styles.quantity}>Quantity: {quantity}</Text>
      </View>

      {/* Modal for Update Input */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Quantity</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Quantity "
              keyboardType="numeric"
              value={updatedQuantity}
              onChangeText={(text) => setUpdatedQuantity(text)}
            />
            <View style={styles.modalButtonContainer}>
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color={color.dark}
              />
              <Button
                title="Update"
                onPress={handleSubmitUpdate}
                color={color.primary}
              />
            </View>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: "#fff",
    marginBottom: 20,
    marginHorizontal: 10,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  updateButton: {
    backgroundColor: color.primary,
  },
  deleteButton: {
    backgroundColor: color.primary,
  },
  detailContainer: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    color: color.black,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: color.medium,
  },
  quantity: {
    fontSize: 16,
    color: color.medium,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: color.black,
  },
  input: {
    borderWidth: 1,
    borderColor: color.medium,
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
});

export default Card;
