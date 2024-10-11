import React from "react";
import { StyleSheet, ScrollView, View, Alert } from "react-native";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import FormImagePicker from "../components/forms/FormImagePicker";
import { db, storage } from "../config/firebase";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label("Name"),
  description: Yup.string().nullable().min(1).label("Description"),
  purchaseprice: Yup.number().required().label("Purchase Price"),
  sellprice: Yup.number().required().label("Sell Price"),
  quantity: Yup.number().required().label("Quantity"),
  images: Yup.array().min(1, "Please select at least one image"),
});

const Inputdatabase = ({ navigation }) => {
  const handleSubmit = async (values) => {
    try {
      const imageUrls = await Promise.all(
        values.images.map(async (imageUri, index) => {
          // Create a unique file name for each image
          const response = await fetch(imageUri);
          const blob = await response.blob();
          const storageRef = ref(storage, `images/${Date.now()}_${index}`);
          await uploadBytes(storageRef, blob);
          return await getDownloadURL(storageRef);
        })
      );

      await addDoc(collection(db, "Products"), {
        name: values.name,
        description: values.description,
        purchaseprice: values.purchaseprice,
        sellprice: values.sellprice,
        quantity: values.quantity,
        images: imageUrls,
      });
      console.log("Document successfully written!");
      Alert.alert("Success", "Product added successfully!", [
        {
          text: "OK",
        },
      ]);
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Error", "Failed to add product. Please try again later.");
    }
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <AppForm
          initialValues={{
            name: "",
            description: "",
            purchaseprice: "",
            sellprice: "",
            quantity: "",
            images: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <View style={styles.imagePickerContainer}>
            <FormImagePicker name="images" />
          </View>
          <View style={styles.formContainer}>
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              name="name"
              placeholder="Name"
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              name="description"
              placeholder="Description"
              optional={true}
            />

            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              name="purchaseprice"
              placeholder="Purchase Price"
              keyboardType="numeric"
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              name="sellprice"
              placeholder="Sell Price"
              keyboardType="numeric"
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              name="quantity"
              placeholder="Quantity"
              keyboardType="numeric"
            />
            <SubmitButton title="Add" style={styles.button} />
          </View>
        </AppForm>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  imagePickerContainer: {
    marginBottom: 10,
  },
  formContainer: {
    flex: 1,
  },
  button: {
    marginTop: 10,
  },
});

export default Inputdatabase;
